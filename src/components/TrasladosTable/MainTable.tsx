'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

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
import { EnhancedTransfer, getColumns } from './utils'
import { Operator, Transfer, Unit } from '@prisma/client'
import { MoveLeft, MoveRight } from 'lucide-react'
import { TransferDialog } from './TransferDialog'

type DataTableProps = {
  units: Unit[]
  operators: Operator[]
  data: Transfer[]
}

function MainTable({ data, units, operators }: DataTableProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTransfer, setCurrentTransfer] =
    useState<EnhancedTransfer | null>(null)
  const columns = useMemo(
    () => getColumns({ units, operators, setOpenDialog, setCurrentTransfer }),
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
                  No hay traslados programados.
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

      <TransferDialog
        open={openDialog}
        setOpen={setOpenDialog}
        transfer={currentTransfer}
      />
    </div>
  )
}

export default MainTable
