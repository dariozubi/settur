import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { renderAsync } from '@react-email/render'
import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { createTransport } from 'nodemailer'
import MagicLink from './emails/MagicLink'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    verifyRequest: '/verify',
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider } = params
        const transport = createTransport(provider.server)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Ingresa a SETTUR`,
          text: `Ingresa a SETTUR\n${url}\n\n`,
          html: await renderAsync(<MagicLink url={url} />),
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        const admin = await prisma.admin.findUnique({
          where: { email: user.email },
        })
        if (!!admin) {
          await prisma.user.update({
            where: { email: user.email },
            data: { image: admin.role, name: admin.name }, // Hacky way to set the role without changing types
          })
          return true
        }
      }

      return '/unauthorized'
    },
  },
}
