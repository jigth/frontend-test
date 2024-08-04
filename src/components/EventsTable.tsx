import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent, useEffect, useState } from "react";
import { Event } from "../models/event";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { replaceEvents } from "../store/events/slice";

interface Column {
  id: "id" | "name" | "description" | "location" | "date" | "availableTickets";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "id", label: "id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "location",
    label: "Location",
    minWidth: 170,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
  },
  {
    id: "availableTickets",
    label: "Available Tickets",
    minWidth: 10,
  },
];

export default function EventsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events);

  useEffect(() => {
    fetch("http://localhost:3000/events?limit=100")
      .then((res) => {
        if (!res.ok) throw new Error(`Error, res not OK. ${res.status} status code. ${res.statusText}`);
        return res.json();
      })
      .then((events) => dispatch(replaceEvents(events)))
      .catch((e) => console.log(`Error while fetching events ${e.message}`));
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCellValue = (column: Column, event: Event) => {
    let value = event[column.id];

    switch (column.id) {
      case "description":
        return value.toString().split(" ").slice(0, 8).join(" ") + "...";
      case "availableTickets":
        return (value as string[]).length;
      default:
        return value;
    }
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event: Event) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={event.id}>
                  {columns.map((column) => {
                    return <TableCell key={column.id}>{getCellValue(column, event)}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
