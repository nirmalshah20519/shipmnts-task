import React from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

export default function Navbar({ upload, loading }) {
  return (
    <div className="flex justify-between items-center p-4 shadow-md">
      <div className="text-lg font-bold">Excel Parser</div>
      <Button className="w-32" variant="contained" color="primary" component="label">
        {loading ? <CircularProgress size={'25px'} sx={{ color: 'white' }} /> : 'Upload File'}
        <input
          type="file"
          accept=".xlsx,.xls"
          hidden
          onChange={upload}
        />
      </Button>
    </div>
  );
}
