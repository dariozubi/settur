'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/Chart'
import { Pie, PieChart } from 'recharts'
import Card, { CardContent, CardHeader } from '../Card'
import React from 'react'

export type OrderEarningsData = {
  money: 'cash' | 'online'
  total: number
  fill: string
}[]

type Props = {
  data: OrderEarningsData
}

function OrderEarningsChart({ data }: Props) {
  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.total, 0)
  }, [data])
  return (
    <div className="w-1/2 p-4">
      <Card>
        <CardHeader className="pb-0 text-xl font-bold">{`Ganancias totales: $${total}`}</CardHeader>
        <CardContent>
          <ChartContainer
            config={config}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="total" hideLabel />}
              />
              <Pie data={data} dataKey="total" />
              <ChartLegend
                content={<ChartLegendContent nameKey="money" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderEarningsChart

const config = {
  total: { label: 'USD' },
  cash: { label: 'Efectivo', color: 'hsl(var(--chart-3))' },
  online: { label: 'Online', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig
