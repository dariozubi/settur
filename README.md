# SETTUR

Aplicación web hecha en **Next** usando **TypeScript**. Utiliza componentes de servidor de React, acciones, y el app router para comunicarse con la base de datos. La base de datos está montada en **Supabase** y se utiliza **Prisma** como ORM.

Tiene una sección de administración que cuenta con autenticación por medio de una whitelist de correos electrónicos usando **next-auth**. El proveedor de correos es **Resend** y los componentes para generar los correos son de **react-email**.

La sección abierta al público cuenta con i18n manejada por **next-intl**. Los pagos de esta sección son realizados a través de **Stripe**. Las formas son manejadas con **react-hook-form** junto con **zod** para las validaciones.

Los componentes son de **shadcn**, que usan **radix**, **react-day-picker** y **recharts**. También se usa **Tailwind** para el manejo de CSS y **lucide-react** para los iconos.

## Aplicación

El principal uso de la aplicación es el de generar `Orders` en la base de datos. Existen dos páginas para crear las órdenes: `/private` y `/shared`. La manera de distinguir estas órdenes es por el tipo de vehículo, las compartidas siempre serán `SHARED`.
En las dos dos páginas hay una forma que cuenta con validaciones para cada caso que muestra los precios según el hotel y el tipo de vehículo. Una vez que se llena adecuadamente la forma sucede lo siguiente:

1. Se agrega una orden con el status `CREATED` (`/api/order`) a la base de datos.
2. Se redirige al cliente a la página de pago (`/checkout`). Aquí se muestra una página embedida de Stripe que tiene la información de los productos que el cliente debe de pagar.
3. Una vez que el cliente paga se redirige al cliente a la página de recibo (`/return`). Si el pago fue efectuado de manera adecuada se muestra un recibo con el número de orden.
4. Hay un webhook (`/api/webhook`) que recibe la confirmación de pago de Stripe. Este es el encargado de actualizar la orden a `PAID` o `RESERVED` según sea el caso. También se encarga de enviar el correo de confirmación al cliente que cuenta con todas las instrucciones y detalles.

En la base de datos, cada orden está asociada a:

- Una o dos transferencias (dependiendo de si es `ROUND` o `ONEWAY` en la propiedad `trip`)
- Uno o más productos de Stripe. Cada producto y su cantidad están definidos en la propiedad `products`.
- Un pago o reserva que define la propiedad `status` (con el proceso mencionado anteriormente).

Los precios finales que pagará el consumidor están definidos en Stripe. Los precios en la base de datos de esta aplicación son sólo para mostrarse en la página. Esto fue diseñado así porque los precios finales están en MXN y los que se muestran en la página están en USD.

Las fechas de los vuelos están guardadas en UTC para evitar confusión con fechas locales. El `DatePicker` da los valores en las fechas locales por lo que se cambian a UTC antes de ser enviadas. Al mostrar el recibo (`/return`) la fecha es cambiada para mostrar el valor requerido con el formato adecuado.

## Administración

El acceso está limitado por los correos en la tabla `ADMIN`. Los roles definen qué páginas se pueden ver en esta sección (ver `/admin/ordenes` para un ejemplo). Estos roles son asignados a la propiedad `image` de la sesión en `src/auth.tsx`.

Si se quieren agregar páginas a esta sección hay que agregarlas también a la whitelist en `src/middleware.ts`.

## Cache

Casi todas las llamadas para obtener datos de la base de datos usan `unstable_cache` para reducir el número de éstas al máximo.

## Prisma

### Migraciones

Al realizar un cambio en `schema.prisma`, hay que correr:

```
npx prisma migrate dev --name some_name --skip-seed
```

Para aplicar el cambio en producción, cambiar la `DATABASE_URL` en `.env` y correr:

```
npx prisma migrate deploy
```

### Seeding

Para crear nuevas órdenes (por default son 10) se puede usar:

```
npx prisma db seed
```

## Stripe

Para probar el webhook de stripe localmente hay que bajar el CLI y usar:

```
stripe listen --forward-to localhost:3000/api/webhook
```

Hay que hacer login antes de que funcione con `stripe login` si es que no hay sesión.

Este comando regresa un token que debe ser el mismo que el de `.env`. Esto habilita las acciones del endpoint `api/webhook` una vez que se realiza una compra via stripe.
