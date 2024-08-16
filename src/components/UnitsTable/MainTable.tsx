'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Table, {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import { useMemo, useState } from 'react'
import { UpsertUnit } from './UpsertUnit'
import { Unit } from '@prisma/client'

interface MainTableProps {
  initialData: Unit[]
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
        id: 'label',
        header: 'Nombre',
        cell: ({ row }) => row.original.label,
      },
      {
        id: 'vehicle',
        header: 'Auto',
        cell: ({ row }) => row.original.vehicle,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const unit = row.original
          return <UpsertUnit unit={unit} setData={setData} />
        },
        header: () => <UpsertUnit setData={setData} />,
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No hay resultados
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <TableCaption>Unidades disponibles</TableCaption>
    </Table>
  )
}
