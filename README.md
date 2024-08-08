# SETTUR

Página web de SETTUR. Usa Next 14, Tailwind, Prisma, Next-auth, Supabase.

## Migraciones

Al realizar un cambio en el `schema` de Prisma, hay que correr:

```
npx prisma migrate dev --name some_name --skip-seed
```

## Seeding

Para crear nuevas órdenes (por default son 10) se puede usar:

```
npx prisma db seed
```

## Stripe

Para probar stripe localmente hay que bajar el CLI y usar:

```
stripe listen --forward-to localhost:3000/api/webhook
```

Este comando regresa un token que debe ser el mismo que el de `.env`. Esto habilita las acciones del endpoint `api/webhook` una vez que se realiza una compra via stripe.
