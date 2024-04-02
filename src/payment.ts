const stripeSingleton = () => {
  const stripe = require('stripe')(process.env.STRIPE_API_KEY)
  return stripe
}

declare global {
  // eslint-disable-next-line no-unused-vars
  var stripeGlobal: undefined | ReturnType<typeof stripeSingleton>
}

const stripe = globalThis.stripeGlobal ?? stripeSingleton()

export default stripe

if (process.env.NODE_ENV !== 'production') globalThis.stripeGlobal = stripe
