"use client"

import { Button, TextField } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import { useRouter, useSearchParams } from "next/navigation";


export default function BaseIndex({
    columns,
    entities,
    page,
    page_size,
    resource,
    title,
}) {
    const searchParams = useSearchParams()
    const urlSearchParams = new URLSearchParams(searchParams)
    const router = useRouter()

    const pageParamKey = "page"
    const sizeParamKey = "page_size"

    function handleRowClick(id) {
        return router.push(`${resource}/${id}`)

    }

    function handlePageChange(e, v) {
        urlSearchParams.set(pageParamKey, v)
        router.push("?" + urlSearchParams.toString())
    }

    function handleRowPerPageChange(e) {
        const _page_size = e.target.value
        urlSearchParams.set(sizeParamKey, _page_size)
        router.push("?" + urlSearchParams.toString())
    }



    return <section>

        <div className="px-4 py-2 bg-white flex items-center">
            <h1 className="text-xl">{title}</h1>
            <div className="ml-auto flex gap-4">
                <form id="search">
                    <TextField
                        size="small"
                        placeholder="Search..."
                        id="key_word"
                        name="key_word"
                        type="text"
                        form="search"
                        InputProps={{
                            endAdornment: (
                                <button type="submit" form="search">submit</button>
                            )
                        }}
                    ></TextField>
                </form>
                <Button size="sm" href={`${resource}/store`} variant="contained">Add</Button>
            </div>
        </div>
        <div className="p-4">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell key={column.id}>{column.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entities.map((row) => (
                            <TableRow
                                key={row.id}
                                hover={true}
                                onClick={() => handleRowClick(row.id)}
                                className="cursor-pointer"
                            >
                                {columns.map(column => (
                                    <TableCell key={column.id} component="th" scope="row">
                                        {row[column.name]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[20]}
                                count={100}
                                rowsPerPage={page_size}
                                page={page}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowPerPageChange}
                            ></TablePagination>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    </section>
}