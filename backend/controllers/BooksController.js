const db = require("../models/index");
const XLSX = require("xlsx");
const {
  validateEmailFormat,
} = require("../utils/validation");

const demoApi = async (req, res) => {
  try {
    let info = {
      message: "Hello World!",
    };
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
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const requiredColumns = [
      "Book Name",
      "ISBN Code",
      "Author Name",
      "Author Email",
      "Date of Birth",
    ];

    const headers = data[0];
    const missingColumns = requiredColumns.filter(
      (column) => !headers.includes(column)
    );
    if (missingColumns.length > 0) {
      return res
        .status(400)
        .send(`Missing required columns: ${missingColumns.join(", ")}`);
    }

    data.shift();
    const rows = XLSX.utils.sheet_to_json(worksheet);

    for (let row of rows) {
      let validationResponse = validateEmailFormat(row["Author Email"]);
      if (!validationResponse.valid) {
        return res.status(400).send({ message: validationResponse.message });
      }

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
    const booksData = req.body;

    for (const data of booksData) {
      const {
        "Book Name": bookName,
        "ISBN Code": isbnCode,
        "Author Name": authorName,
        "Author Email": authorEmail,
        "Date of Birth": dateOfBirth,
      } = data;

      let author = await db.Author.findOne({
        where: { authorEmail: authorEmail },
      });

      if (!author) {
        author = await db.Author.create({
          authorName,
          authorEmail,
          dateOfBirth,
        });
      }

      let book = await db.Book.findOne({
        where: { isbnCode: isbnCode },
      });

      if (book) {
        await book.update({
          bookName,
          authorId: author.id
        });
      } else {
        await db.Book.create({
          bookName,
          isbnCode,
          authorId: author.id,
        });
      }
    }

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
