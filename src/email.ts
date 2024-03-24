import { Resend } from 'resend'
const resendSingleton = () => {
  return new Resend(process.env.EMAIL_SERVER_PASSWORD)
}

declare global {
  // eslint-disable-next-line no-unused-vars
  var resendGlobal: undefined | ReturnType<typeof resendSingleton>
}

const resend = globalThis.resendGlobal ?? resendSingleton()

export default resend

if (process.env.NODE_ENV !== 'production') globalThis.resendGlobal = resend
