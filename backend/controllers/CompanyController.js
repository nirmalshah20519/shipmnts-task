const db = require("../models/index");
const XLSX = require("xlsx");
const {
  parseExcelDate,
  validateRequiredFields,
  validateEmailFormat,
  validateIndustryType,
  validateContactType,
} = require("../utils/validation");

const demoApi = async (req, res) => {
  try {
    let info = {
      message: "Hello World!",
    };
    // console.log(info);
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send("Error adding product type");
  }
};

const parseExcel = async (req, res) => {
  try {
    if (!req.files || !req.files.excelFile) {
      return res.status(400).send("No file was uploaded.");
    }

    const file = req.files.excelFile;
    const workbook = XLSX.read(file.data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get data as array of arrays

    // Define required columns specific to your book data
    const requiredColumns = [
      "Book Name",
      "ISBN Code",
      "Author Name",
      "Author Email",
      "Date of Birth",
    ];

    // Validate headers
    const headers = data[0]; // First row must be headers
    const missingColumns = requiredColumns.filter(
      (column) => !headers.includes(column)
    );
    if (missingColumns.length > 0) {
      return res
        .status(400)
        .send(`Missing required columns: ${missingColumns.join(", ")}`);
    }

    // Remove header row and validate each row
    data.shift();
    const rows = XLSX.utils.sheet_to_json(worksheet); // Convert back to JSON without header

    for (let row of rows) {
      // Email validation for Author Email
      let validationResponse = validateEmailFormat(row["Author Email"]);
      if (!validationResponse.valid) {
        return res.status(400).send({ message: validationResponse.message });
      }

      // Date validation for Author's Date of Birth
      if (row["Date of Birth"]) {
        if (!isNaN(Date.parse(row["Date of Birth"]))) {
          row["Date of Birth"] = new Date(row["Date of Birth"])
            .toISOString()
            .split("T")[0];
        } else {
          return res.status(400).send({
            message: `Validation error: Invalid date format in 'Date of Birth' for author '${row["Author Name"]}'.`,
          });
        }
      }
    }

    return res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
};

const saveToDB = async (req, res) => {
  try {
    // Retrieve the data array from the request body
    const booksData = req.body;

    // Loop through each book data entry
    for (const data of booksData) {
      const {
        "Book Name": bookName,
        "ISBN Code": isbnCode,
        "Author Name": authorName,
        "Author Email": authorEmail,
        "Date of Birth": dateOfBirth,
      } = data;

      // Check if the author already exists
      let author = await db.Author.findOne({
        where: { authorEmail: authorEmail },
      });

      // If the author does not exist, create a new author
      if (!author) {
        author = await db.Author.create({
          authorName,
          authorEmail,
          dateOfBirth,
        });
      }

      // Check if the book with the given ISBN code exists
      let book = await db.Book.findOne({
        where: { isbnCode: isbnCode },
      });

      if (book) {
        // If book exists, update it
        await book.update({
          bookName,
          authorId: author.id // assuming you might need to update the author as well
        });
      } else {
        // If the book does not exist, create a new book
        await db.Book.create({
          bookName,
          isbnCode,
          authorId: author.id,
        });
      }
    }

    // If everything goes well, send a success response
    res.status(201).send({ message: "Books and authors have been successfully processed." });
  } catch (error) {
    console.error("Failed to process data:", error);
    res.status(500).send({ message: "Error processing books and authors." });
  }
};


module.exports = {
  demoApi,
  parseExcel,
  saveToDB
};
