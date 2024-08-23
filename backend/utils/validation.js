// validation.js
const industryTypes = ["Technology", "Finance", "Healthcare", "Retail", "Other"];
const contactTypes = ["Primary", "Secondary", "Other"];

const parseExcelDate = (excelDate) => {
  const date = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
  return date.toISOString().split("T")[0]; // return as YYYY-MM-DD
};

const validateRequiredFields = (row) => {
  if (!row["Company Name"] || !row["Contact Name"] || !row["Contact Email"]) {
    return {
      valid: false,
      message: "Validation error: Missing required field(s) (Company Name, Contact Name, and/or Contact Email)."
    };
  }
  return { valid: true };
};

const validateEmailFormat = (email) => {
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      valid: false,
      message: `Validation error: Invalid Email format '${email}'.`
    };
  }
  return { valid: true };
};

const validateIndustryType = (industryType, companyName) => {
  if (!industryTypes.includes(industryType)) {
    return {
      valid: false,
      message: `Validation error: Invalid Industry Type '${industryType}' for company '${companyName}'.`
    };
  }
  return { valid: true };
};

const validateContactType = (contactType, companyName) => {
  if (!contactTypes.includes(contactType)) {
    return {
      valid: false,
      message: `Validation error: Invalid Contact Type '${contactType}' for company '${companyName}'.`
    };
  }
  return { valid: true };
};

module.exports = {
  parseExcelDate,
  validateRequiredFields,
  validateEmailFormat,
  validateIndustryType,
  validateContactType,
};
