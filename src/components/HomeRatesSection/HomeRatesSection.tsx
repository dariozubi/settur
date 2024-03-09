import { rates } from '@/lib/consts'
import Text from '../Text'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { useTranslations } from 'next-intl'

function HomeRatesSection() {
  const t = useTranslations('Home')
  return (
    <section className="flex bg-secondary pb-24">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10">
        <Text from="Home" variant="xl" className="font-bold">
          our-rates
        </Text>

        <Table>
          <TableCaption>{t('first-disclaimer')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>San José del Cabo</TableHead>
              <TableHead>{t('tourist-corridor')}</TableHead>
              <TableHead>Cabo San Lucas</TableHead>
              <TableHead>Puerto Los Cabos</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="text-center font-bold">
                {t('one-way')}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell className="font-bold">{t('shared')}</TableCell>
              <TableCell>{`${rates.shared.oneWay.zone1} USD`}</TableCell>
              <TableCell>{`${rates.shared.oneWay.zone2} USD`}</TableCell>
              <TableCell>{`${rates.shared.oneWay.zone3} USD`}</TableCell>
              <TableCell>{`${rates.shared.oneWay.zone4} USD`}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-bold">{`${t('private')}*`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone1} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone2} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone3} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone4} USD`}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="text-center font-bold">
                {t('round-trip')}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell className="font-bold">{t('shared')}</TableCell>
              <TableCell>{`${rates.shared.roundTrip.zone1} USD`}</TableCell>
              <TableCell>{`${rates.shared.roundTrip.zone2} USD`}</TableCell>
              <TableCell>{`${rates.shared.roundTrip.zone3} USD`}</TableCell>
              <TableCell>{`${rates.shared.roundTrip.zone4} USD`}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-bold">{`${t('private')}*`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone1} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone2} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone3} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone4} USD`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableCaption>{t('second-disclaimer')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>East Cape**</TableHead>
              <TableHead>Diamante**</TableHead>
              <TableHead>{t('tourist-corridor')}</TableHead>
              <TableHead>Todos Santos**</TableHead>
              <TableHead>La Paz**</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="text-center font-bold">
                {t('one-way')}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>{`${rates.private.oneWay.zone5} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone6} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone7} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone8} USD`}</TableCell>
              <TableCell>{`${rates.private.oneWay.zone9} USD`}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="text-center font-bold">
                {t('round-trip')}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>

            <TableRow>
              <TableCell>{`${rates.private.roundTrip.zone5} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone6} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone7} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone8} USD`}</TableCell>
              <TableCell>{`${rates.private.roundTrip.zone9} USD`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default HomeRatesSection
