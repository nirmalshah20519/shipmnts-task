import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 600, // Adjust based on your layout
  },
  head: {
    backgroundColor: "#3f51b5", // Background color for the header
  },
  headCell: {
    color: "#560032", // Text color for the header cells
    fontWeight: "bold", // Optional: Make the header text bold
  },
});

export default function TableData({ data }) {
  const classes = useStyles();
  console.log(data);

  return (
    <div className="p-16">
      <TableContainer
        component={Paper}
        className="max-h-[600px] min-w-[600px] bg-white no-scrollbar"
      >
        <Table stickyHeader aria-label="simple table" className={classes.table}>
          <TableHead sx={{ bgcolor: "green" }}>
            <TableRow>
              {Object.keys(data[0]).map((key, i) => (
                <TableCell
                  key={i + 1}
                  align="center"
                  sx={{ bgcolor: "black", color: "white" }}
                >
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} hover>
                {Object.keys(data[0]).map((key, idx) => {
                  return (
                    <TableCell key={idx + 1} align="center">
                      {row[key] !== null && row[key] !== undefined
                        ? row[key]
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
