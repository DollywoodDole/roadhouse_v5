import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancelled(subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log('Payment failed for customer:', invoice.customer)
        // TODO: Send dunning email
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error('Error handling webhook event:', err)
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const { metadata } = session
  console.log('Checkout complete:', {
    sessionId: session.id,
    customer: session.customer,
    type: metadata?.type,
    item: metadata?.item,
    event: metadata?.event,
    amount: session.amount_total,
  })

  if (metadata?.type === 'merch') {
    // TODO: Trigger fulfillment webhook / notify shipping system
    console.log(`Merch order: ${metadata.item}, size: ${metadata.size}`)
  }

  if (metadata?.type === 'event-ticket') {
    // TODO: Send ticket confirmation email with QR code
    console.log(`Event ticket purchased: ${metadata.event}`)
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('Subscription changed:', {
    id: subscription.id,
    customer: subscription.customer,
    status: subscription.status,
    priceId: subscription.items.data[0]?.price.id,
  })
  // TODO: Grant Discord role, update membership tier in database
  // TODO: Credit $LUX tokens for the month
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  console.log('Subscription cancelled:', {
    id: subscription.id,
    customer: subscription.customer,
  })
  // TODO: Revoke Discord role, downgrade membership tier
}
