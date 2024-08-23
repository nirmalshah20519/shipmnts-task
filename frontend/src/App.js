import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { saveToDB, uploadExcel } from "./services/upload";
import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import TableData from "./components/TableData";
import NoFileUploaded from "./components/NoFileUploaded";
import { Button, Box, CircularProgress } from "@mui/material"; // Importing Button and Box from Material-UI

function App() {
  const [loading, setLoading] = useState(false);
  const [dbLoader, setDbLoading] = useState(false);
  const [isRed, setIsRed] = useState(true);
  const [rows, setRows] = useState([]);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileUpload = (e) => {
    setLoading(true);
    const file = e.target.files[0]; // Get the first file (since multiple files could technically be selected if "multiple" attribute were set)
    if (file) {
      uploadExcel(file)
        .then((data) => {
          setRows(data);
          toast.success("File uploaded successfully");
          setIsRed(false);
          setLoading(false);
        })
        .catch((error) => {
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
          }
          setIsRed(true)
          toast.error(error.response.data.message);
          setLoading(false);
        });
    }
  };

  const handleSaveToDB = () => {
    // Functionality for saving data to the database goes here
    // console.log(rows);
    setDbLoading(true)
    saveToDB(rows).then(resp=>{
      setIsRed(false);
      toast.success(resp.message);
      setDbLoading(false)
      setRows([])

    }).catch(err=>{
      setIsRed(true)
      toast.error(err.response.data.message);
      setDbLoading(false)
    })
  };

  const handleCancel = () => {
    // Reset the rows and clear the file input
    setRows([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    toast.info("Operation canceled");
  };

  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />
      <Navbar
        upload={(e) => {
          fileInputRef.current = e.target; // Set the ref to the current file input
          handleFileUpload(e);
        }}
        loading={loading}
      />
      {rows.length > 0 ? (
        <>
          <TableData data={rows} />
          <Box display="flex" justifyContent="end" marginTop={0} gap={2} mx={8}>
            <Button variant="contained" color="primary" onClick={handleSaveToDB}>
              {dbLoader ? <CircularProgress size={'25px'} sx={{ color: 'white' }} /> : 'Save to DB'} 
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <NoFileUploaded />
      )}
    </div>
  );
}

export default App;
