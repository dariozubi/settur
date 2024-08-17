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
import { Operator } from '@prisma/client'
import { OperatorDialog } from './OperatorDialog'
import Button from '../Button'
import { Pencil, Plus } from 'lucide-react'

interface MainTableProps {
  data: Operator[]
}

export function MainTable({ data }: MainTableProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null)
  const columns: ColumnDef<any, any>[] = useMemo(
    () => [
      {
        id: 'id',
        header: 'ID',
        cell: ({ row }) => row.original.id,
      },
      {
        id: 'nombre',
        header: 'Nombre',
        cell: ({ row }) => row.original.name,
      },
      {
        id: 'phone',
        header: 'Telefono',
        cell: ({ row }) => row.original.phone,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const operator = row.original
          return (
            <Button
              variant="secondary"
              onClick={() => {
                setCurrentOperator(operator)
                setOpenDialog(true)
              }}
            >
              <Pencil size={18} />
            </Button>
          )
        },
        header: () => (
          <Button
            variant="secondary"
            onClick={() => {
              setCurrentOperator(null)
              setOpenDialog(true)
            }}
          >
            <Plus size={18} />
          </Button>
        ),
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
    <div className="w-fit rounded border">
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

        <TableCaption>Operadores</TableCaption>
      </Table>

      <OperatorDialog
        open={openDialog}
        setOpen={setOpenDialog}
        operator={currentOperator}
      />
    </div>
  )
}
