import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://7c1c73ea02c30549f79d9afcbff61bb1@o4507058787713024.ingest.us.sentry.io/4507817019179008',
  tracesSampleRate: 1.0,
  enabled: process.env.DEPLOY_CONTEXT === 'production',
})