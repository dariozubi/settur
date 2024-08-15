'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import { useMemo, useState } from 'react'
import { UpdateRate } from './UpdateRate'
import { Rate } from '@prisma/client'
import { Filters } from './Filters'

interface MainTableProps {
  initialData: Rate[]
}

export function MainTable({ initialData }: MainTableProps) {
  const [data, setData] = useState(initialData)
  const columns: ColumnDef<any, any>[] = useMemo(
    () => [
      {
        id: 'id',
        header: 'ID',
        cell: ({ row }) => row.original.id,
      },
      {
        accessorKey: 'trip',
        header: 'Ruta',
        cell: ({ row }) => row.original.trip,
      },
      {
        accessorKey: 'vehicle',
        header: 'Auto',
        cell: ({ row }) => row.original.vehicle,
      },
      {
        accessorKey: 'zone',
        header: 'Zona',
        cell: ({ row }) => row.original.zone,
      },
      {
        accessorKey: 'additionalId',
        header: 'Extra',
        cell: ({ row }) => row.original.additionalId,
      },
      {
        id: 'value',
        header: 'Precio',
        cell: ({ row }) => '$' + row.original.value,
      },
      {
        id: 'priceId',
        header: 'Stripe ID',
        cell: ({ row }) => row.original.priceId,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const rate = row.original
          return <UpdateRate rate={rate} setData={setData} />
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="flex flex-col justify-between md:flex-row">
      <div className="order-last max-w-[calc(100vw-20px)] overflow-auto rounded-md border md:order-1">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Filters table={table} />
    </div>
  )
}
