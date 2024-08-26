'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/Chart'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import Card, { CardContent, CardHeader } from '../Card'
import { Zone } from '@prisma/client'

export type ZoneChartData = { zone: Zone; total: number; cash: number }[]

type Props = {
  data: ZoneChartData
}

function OrderZonesChart({ data }: Props) {
  return (
    <div className="w-full p-4 md:w-1/2">
      <Card>
        <CardHeader className="text-xl font-bold">
          Ganancias por zona
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <CartesianGrid vertical={false} />
              <Bar
                dataKey="total"
                fill="hsl(var(--chart-1))"
                stackId="a"
                radius={[0, 0, 4, 4]}
              >
                <LabelList
                  position="top"
                  offset={4}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
              <Bar
                dataKey="cash"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
                stackId="a"
              >
                <LabelList
                  position="top"
                  offset={4}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
              <XAxis
                dataKey="zone"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => `Zona ${value.slice(4)}`}
              />

              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderZonesChart

const config = {
  total: { label: 'En línea', color: 'hsl(var(--chart-1))' },
  cash: { label: 'Efectivo', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig
