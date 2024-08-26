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

export type OrdersChartData = {
  trip: 'round' | 'oneway'
  total: number
  fill: string
}[]

type Props = {
  data: OrdersChartData
  created: number
}

function OrdersChart({ data, created }: Props) {
  const totalOrders = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.total, 0)
  }, [data])
  return (
    <div className="w-full p-4 md:w-1/2">
      <Card>
        <CardHeader className="pb-0 text-xl font-bold">{`Órdenes generadas: ${totalOrders}`}</CardHeader>
        {created > 0 && (
          <CardHeader className="pt-2 text-lg">{`Órdenes sin acabar: ${created}`}</CardHeader>
        )}
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
                content={<ChartLegendContent nameKey="trip" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrdersChart

const config = {
  total: { label: 'Órdenes' },
  round: { label: 'Round', color: 'hsl(var(--chart-3))' },
  oneway: { label: 'Oneway', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig
