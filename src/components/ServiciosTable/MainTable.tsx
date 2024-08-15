'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import Button from '../Button'
import { Filters } from './Filters'
import { getColumns } from './utils'
import { Operator, Unit } from '@prisma/client'
import { MoveLeft, MoveRight } from 'lucide-react'

interface DataTableProps<TData> {
  units: Unit[]
  operators: Operator[]
  data: TData[]
}

function MainTable<TData>({ data, units, operators }: DataTableProps<TData>) {
  const columns = useMemo(
    () => getColumns({ units, operators }),
    [units, operators]
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
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
                  No hay servicios programados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {(table.getCanPreviousPage() || table.getCanNextPage()) && (
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />

                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <MoveLeft size={16} />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <MoveRight size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {data.length > 0 && <Filters table={table} units={units} />}
    </div>
  )
}

export default MainTable
