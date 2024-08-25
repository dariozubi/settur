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
import { Vehicle } from '@prisma/client'

export type VehicleChartData = {
  vehicle: Vehicle
  total: number
  cash: number
}[]

type Props = {
  data: VehicleChartData
}

function OrderVehiclesChart({ data }: Props) {
  return (
    <div className="w-1/2 p-4">
      <Card>
        <CardHeader className="text-xl font-bold">
          Ganancias por vehículo
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
                dataKey="vehicle"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderVehiclesChart

const config = {
  total: { label: 'En línea', color: 'hsl(var(--chart-1))' },
  cash: { label: 'Efectivo', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig
