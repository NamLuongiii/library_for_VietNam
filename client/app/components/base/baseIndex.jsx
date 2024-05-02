"use client"

import { Avatar, Button, IconButton, TextField } from "@mui/material"
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
import EditIcon from "../icons/edit";
import DestroyIcon from "../icons/destroy";
import ShowIcon from "../icons/show";

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

    function handleEditClick(e, id) {
        e.preventDefault()
        return router.push(`${resource}/${id}/update`)
    }

    function handleDestroyClick(e, id) {
        e.preventDefault()
        return router.push(`${resource}/${id}/update`)
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
                <Table size="small" aria-label="simple table">
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
                            >
                                {columns.map(column => {
                                    if (column.render) {
                                        return (
                                            <TableCell key={column.id} component="th" scope="row">
                                                {column.render(row)}
                                            </TableCell>
                                        )
                                    }

                                    if (column.type == 'actions')
                                        return (
                                            <TableCell key={column.id} component="th" scope="row">
                                                <IconButton size="small" onClick={e => handleEditClick(e, row.id)}>
                                                    <EditIcon></EditIcon>
                                                </IconButton>
                                                <IconButton size="small" onClick={e => handleDestroyClick(e, row.id)}>
                                                    <DestroyIcon></DestroyIcon>
                                                </IconButton>
                                                <IconButton size="small" onClick={e => handleRowClick(e, row.id)}>
                                                    <ShowIcon></ShowIcon>
                                                </IconButton>
                                            </TableCell>
                                        )

                                    if (column.type == 'image')
                                        return (
                                            <TableCell key={column.id} component="th" scope="row">
                                                <Avatar alt="Remy Sharp" src={row[column.id]} />
                                            </TableCell>
                                        )

                                    return (
                                        <TableCell key={column.id} component="th" scope="row">
                                            {!!row[column.name] ? row[column.name] : <span className="text-sm text-red-600">n/a</span>}
                                        </TableCell>
                                    )
                                })}
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