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
import { Rate } from '@prisma/client'
import { Filters } from './Filters'
import { RateDialog } from './RateDialog'
import Button from '../Button'
import { Pencil } from 'lucide-react'

interface MainTableProps {
  data: Rate[]
}

export function MainTable({ data }: MainTableProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentRate, setCurrentRate] = useState<Rate | null>(null)
  const columns: ColumnDef<any, any>[] = useMemo(
    () => [
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
        id: 'productId',
        header: 'Stripe Product',
        cell: ({ row }) => (
          <span className="block w-[90px] truncate">
            {row.original.productId}
          </span>
        ),
      },
      {
        id: 'testProductId',
        header: 'Stripe Test Product',
        cell: ({ row }) => (
          <span className="block w-[90px] truncate">
            {row.original.testProductId}
          </span>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const rate = row.original
          return (
            <Button
              variant="secondary"
              className="h-8"
              onClick={() => {
                setCurrentRate(rate)
                setOpenDialog(true)
              }}
            >
              <Pencil size={18} />
            </Button>
          )
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
      <RateDialog
        open={openDialog}
        setOpen={setOpenDialog}
        rate={currentRate}
      />
    </div>
  )
}
