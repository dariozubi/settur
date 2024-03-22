'use client'

import Text from '@/components/Text'
import Table, {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Rate } from '@prisma/client'

function HomeRatesSection() {
  const t = useTranslations('Home')
  const { isLoading, error, data } = useQuery<{ rates: Rate[] }>({
    queryKey: ['rates'],
    queryFn: async () => axios.get('/api/rates').then(r => r.data),
    staleTime: Infinity,
  })

  if (error) throw Error('Rates endpoint is not working')
  if (isLoading) return null

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
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE1' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE2' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE3' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE4' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-right font-bold">{`${t('private')}*`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE1' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE2' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE3' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE4' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
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
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE1' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE2' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE3' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE4' && r.vehicle === 'SHARED')?.value} USD`}</TableCell>
            </TableRow>

            <TableRow className="border-b-slate-800 hover:bg-neutral-50">
              <TableCell className="text-right font-bold">{`${t('private')}*`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE1' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE2' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE3' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE4' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
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
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE5' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE6' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE7' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE8' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ONEWAY' && r.zone === 'ZONE9' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
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
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE5' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE6' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE7' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE8' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
              <TableCell className="text-center">{`${data?.rates.find(r => r.trip === 'ROUND' && r.zone === 'ZONE9' && r.vehicle === 'HIACE')?.value} USD`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default HomeRatesSection
