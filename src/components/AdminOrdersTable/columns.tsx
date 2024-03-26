'use client'

import { Order, Transfer } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Button from '../Button'
import { ArrowUpDown } from 'lucide-react'

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'created',
    header: 'Created',
    cell: ({ row }) => {
      const formattedDate = format(row.getValue('created'), 'P - p', {
        locale: es,
      })
      return formattedDate
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('name')} ${row.original.surname}`,
  },
  {
    accessorKey: 'transfers',
    header: 'Vehicle',
    cell: ({ row }) => {
      const transfers = row.getValue('transfers') as Transfer[]
      return transfers[0].vehicle
    },
  },
]
