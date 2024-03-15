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
    <section className="flex bg-neutral-50 pb-24 pt-16">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10">
        <Text from="Home" variant="xl" className="font-bold">
          our-rates
        </Text>

        <Table>
          <TableCaption className="text-end">
            {t('first-disclaimer')}
          </TableCaption>
          <TableHeader className="[&_tr]:border-slate-800">
            <TableRow className="hover:bg-neutral-50">
              <TableHead />
              <TableHead className="text-center text-slate-800">
                San José del Cabo
              </TableHead>
              <TableHead className="text-center text-slate-800">
                {t('tourist-corridor')}
              </TableHead>
              <TableHead className="text-center text-slate-800">
                Cabo San Lucas
              </TableHead>
              <TableHead className="text-center text-slate-800">
                Puerto Los Cabos
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="border-b-slate-800">
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200 text-center font-bold">
                {t('one-way')}
              </TableCell>
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-right font-bold">
                {t('shared')}
              </TableCell>
              <TableCell className="text-center">{`${rates.shared.oneWay.zone1} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.shared.oneWay.zone2} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.shared.oneWay.zone3} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.shared.oneWay.zone4} USD`}</TableCell>
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-right font-bold">{`${t('private')}*`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone1} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone2} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone3} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone4} USD`}</TableCell>
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200 text-center font-bold">
                {t('round-trip')}
              </TableCell>
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-right font-bold">
                {t('shared')}
              </TableCell>
              <TableCell className="text-center">{`${rates.shared.roundTrip.zone1} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.shared.roundTrip.zone2} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.shared.roundTrip.zone3} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.shared.roundTrip.zone4} USD`}</TableCell>
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-right font-bold">{`${t('private')}*`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone1} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone2} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone3} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone4} USD`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableCaption className="text-end">
            {t('second-disclaimer')}
          </TableCaption>
          <TableHeader className="[&_tr]:border-slate-800">
            <TableRow className="hover:bg-neutral-50">
              <TableHead className="text-center text-slate-800">{`${t('east-cape')}**`}</TableHead>
              <TableHead className="text-center text-slate-800">
                Diamante**
              </TableHead>
              <TableHead className="text-center text-slate-800">
                {t('tourist-corridor')}
              </TableHead>
              <TableHead className="text-center text-slate-800">
                Todos Santos**
              </TableHead>
              <TableHead className="text-center text-slate-800">
                La Paz**
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200 text-center font-bold">
                {t('one-way')}
              </TableCell>
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-center">{`${rates.private.oneWay.zone5} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone6} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone7} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone8} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.oneWay.zone9} USD`}</TableCell>
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200 text-center font-bold">
                {t('round-trip')}
              </TableCell>
              <TableCell className="bg-neutral-200" />
              <TableCell className="bg-neutral-200" />
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-center">{`${rates.private.roundTrip.zone5} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone6} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone7} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone8} USD`}</TableCell>
              <TableCell className="text-center">{`${rates.private.roundTrip.zone9} USD`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default HomeRatesSection
