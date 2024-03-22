# SETTUR

Página web de SETTUR. Usa Next 14, Tailwind, Prisma, Next-auth, Supabase.

## Migraciones

Al realizar un cambio en el `schema` de Prisma, hay que correr:

```
npx prisma migrate dev --name some_name
npx prisma generate
```
