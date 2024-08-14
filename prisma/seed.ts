import {
  Additional,
  Direction,
  OrderStatus,
  PrismaClient,
  Trip,
  Vehicle,
} from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.transfer.deleteMany({})
  await prisma.order.deleteMany({})
  const numberOfOrders = 10

  for (let i = 0; i < numberOfOrders; i++) {
    const trip = faker.helpers.arrayElement(['ROUND', 'ONEWAY']) as Trip
    const status = faker.helpers.arrayElement([
      'RESERVED',
      'PAID',
    ]) as OrderStatus
    let transfers
    const transfer = {
      flight: `${faker.airline.airline().iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
      date: faker.date.soon({ days: 10 }),
      direction:
        trip === 'ROUND'
          ? ('HOTEL' as Direction)
          : (faker.helpers.arrayElement(['AIRPORT', 'HOTEL']) as Direction),
    }
    if (trip === 'ONEWAY') {
      transfers = transfer
    } else {
      transfers = [
        transfer,
        {
          flight: `${faker.airline.airline().iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
          date: faker.date.soon({ days: 5, refDate: transfer.date }),
          direction: 'AIRPORT' as Direction,
        },
      ]
    }
    const data = {
      adults: faker.number.int({ max: 20, min: 1 }),
      children: faker.number.int({ max: 4, min: 0 }),
      infants: faker.number.int({ max: 4, min: 0 }),
      items: [
        ...faker.helpers.arrayElements([
          'WHEELCHAIR',
          'CARSEAT',
          'BOOSTERSEAT',
          'SHOPPING',
        ]),
        faker.helpers.arrayElement(['PETBOX', 'KAYAK', 'BICYCLE', 'SURFTABLE']),
      ] as Additional[],
      email: faker.internet.email(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      phone: faker.string.numeric(10),
      transfers: {
        create: transfers,
      },
      prices: ['price_1OzS7nFMaNpUdK6VMSUj5I5f,2'],
      vehicle: faker.helpers.arrayElement([
        'SPRINTER',
        'HIACE',
        'SUBURBAN',
        'ESCALADE',
        'SHARED',
      ]) as Vehicle,
      isEnglish: faker.datatype.boolean(),
      trip,
      hotelId: faker.number.int({ max: 177, min: 0 }),
      owed: status === 'RESERVED' ? faker.number.int({ min: 50, max: 200 }) : 0,
      status,
    }
    await prisma.order.create({ data })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
