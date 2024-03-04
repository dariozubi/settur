import { rates } from '@/utils/consts'
import Text from '../Text'

function HomeRatesSection() {
  return (
    <section className="flex bg-secondary">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center">
        <Text from="Home" variant="lg" className="my-10 font-bold">
          our-rates
        </Text>
        <table className="w-full">
          <tr className="flex gap-12 py-4">
            <th className="w-2/12" />

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">San José del Cabo</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  1
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text from="Home" variant="md">
                tourist-corridor
              </Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  2
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">Cabo San Lucas</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  3
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">Puerto Los Cabos</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  4
                </Text>
              </div>
            </th>
          </tr>

          <tr className="bg-secondary-dark flex justify-center py-4">
            <td>
              <Text from="Home" variant="md">
                one-way
              </Text>
            </td>
          </tr>

          <tr className="flex gap-12 py-8">
            <td className="flex w-2/12 justify-center">
              <Text from="Home" className="font-bold">
                shared
              </Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.oneWay.zone1} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.oneWay.zone2} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.oneWay.zone3} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.oneWay.zone4} USD`}</Text>
            </td>
          </tr>

          <tr className="flex gap-12 py-8">
            <td className="flex w-2/12 justify-center">
              <Text from="Home" className="font-bold">
                private
              </Text>
              *
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone1} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone2} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone3} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone4} USD`}</Text>
            </td>
          </tr>

          <tr className="bg-secondary-dark flex justify-center py-4">
            <td>
              <Text from="Home" variant="md">
                round-trip
              </Text>
            </td>
          </tr>

          <tr className="flex gap-12 py-8">
            <td className="flex w-2/12 justify-center">
              <Text from="Home" className="font-bold">
                shared
              </Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.roundTrip.zone1} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.roundTrip.zone2} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.roundTrip.zone3} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.shared.roundTrip.zone4} USD`}</Text>
            </td>
          </tr>

          <tr className="flex gap-12 py-8">
            <td className="flex w-2/12 justify-center">
              <Text from="Home" className="font-bold">
                private
              </Text>
              *
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone1} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone2} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone3} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone4} USD`}</Text>
            </td>
          </tr>
        </table>

        <table className="mt-24 w-full">
          <tr className="flex gap-12 py-4">
            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">East Cape**</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  5
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">Diamante**</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  6
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">Todos Santos**</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  7
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">La Paz**</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  8
                </Text>
              </div>
            </th>

            <th className="flex w-2/12 flex-col items-center">
              <Text variant="md">Los Barriles**</Text>
              <div className="flex">
                <Text from="Home" as="span">
                  zone
                </Text>

                <Text as="span" className="ml-1">
                  9
                </Text>
              </div>
            </th>
          </tr>

          <tr className="bg-secondary-dark flex justify-center py-4">
            <td>
              <Text from="Home" variant="md">
                one-way
              </Text>
            </td>
          </tr>

          <tr className="flex gap-12 py-8">
            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone5} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone6} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone7} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone8} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.oneWay.zone9} USD`}</Text>
            </td>
          </tr>

          <tr className="bg-secondary-dark flex justify-center py-4">
            <td>
              <Text from="Home" variant="md">
                round-trip
              </Text>
            </td>
          </tr>

          <tr className="flex gap-12 py-8">
            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone5} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone6} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone7} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone8} USD`}</Text>
            </td>

            <td className="flex w-2/12 justify-center">
              <Text>{`${rates.private.roundTrip.zone9} USD`}</Text>
            </td>
          </tr>
        </table>

        <div className="my-10 flex w-full flex-col items-end">
          <Text from="Home" variant="sm">
            first-disclaimer
          </Text>
          <Text from="Home" variant="sm">
            second-disclaimer
          </Text>
        </div>
      </div>
    </section>
  )
}

export default HomeRatesSection
