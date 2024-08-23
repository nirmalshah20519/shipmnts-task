import axios from "axios";
import { baseUrl } from "../beConfig";

export const uploadExcel = async (file) => {
  const formData = new FormData();
  formData.append('excelFile', file);

  return axios
    .post(baseUrl + "/api/parse-excel", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred during file upload:", error);
      throw error;
    });
};

export const saveToDB = async (data) => {  
    return axios
      .post(baseUrl + "/api/save", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error occurred during file upload:", error);
        throw error;
      });
  };
