import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { uploadExcel } from "./services/upload";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import TableData from "./components/TableData";
import NoFileUploaded from "./components/NoFileUploaded";
import { Button, Box } from "@mui/material"; // Importing Button and Box from Material-UI

function App() {
  

  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;
