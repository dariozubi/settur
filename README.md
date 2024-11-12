# SETTUR

Web app made with **TypeScript** and **Next 14**.

DB is hosted in **Supabase** and **Primsa** is used as the ORM.

There's an authenticated section for admins that uses **next-auth** and Next's middleware.

Mails sent for authentication and order confirmation use **Resend** as the provider and are made with **react-email**.

The non-admin pages use i18n handled by **next-intl**.

Payments are done using **Stripe**.

All forms are handled with **react-hook-form** and **zod** for validations.

UI components are from **shadcn**. CSS is handled with **Tailwind** and icons are from **lucide-react**.
