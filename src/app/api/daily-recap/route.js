import formidable from 'formidable';
import fs from 'fs';
import * as XLSX from 'xlsx';

// Set up formidable configuration for Next.js API
export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle file uploads
  },
};

// Handle POST requests to process uploaded files
export async function POST(req) {
  // Create an instance of IncomingForm to handle form data
  const form = formidable(); // Use the function directly (not as a constructor)
  form.keepExtensions = true;

  // Return a promise that resolves when form parsing is complete
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        reject(new Error('Error parsing form data'));
        return;
      }

      const csvFile = files.csvFile[0];  // The uploaded CSV file
      const bankCodeFile = files.bankCodeFile[0];  // The uploaded bank code Excel file

      if (!csvFile || !bankCodeFile) {
        reject(new Error('Both CSV and bank code files are required.'));
        return;
      }

      // Process the uploaded CSV file
      const csvData = fs.readFileSync(csvFile.filepath, 'utf-8');

      // Read and parse the bank code Excel file
      const bankCodeData = XLSX.readFile(bankCodeFile.filepath);
      const bankCodeSheet = bankCodeData.Sheets['Bank Code'];
      const bankCodeJson = XLSX.utils.sheet_to_json(bankCodeSheet);

      // Analyze the CSV data with bank code data
      const analyzedData = analyzeData(csvData, bankCodeJson);

      // Create a new workbook with analyzed data
      const newWorkbook = XLSX.utils.book_new();
      analyzedData.forEach(sheetData => {
        const sheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(newWorkbook, sheet, sheetData.name);
      });

      // Write the new Excel file to a buffer
      const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'buffer' });

      // Return the generated Excel file as the response
      resolve(new Response(excelBuffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=daily-recap.xlsx',
        },
      }));
    });
  });
}

// Example of a function that analyzes CSV data
function analyzeData(csvContent, bankCodeJson) {
  const rows = csvContent.split('\n').map(row => row.split(','));

  const analyzedRows = rows.map(row => {
    const errorCode = row[1];  // Assuming the error code is in the second column
    const bankCode = bankCodeJson.find(code => code.code === errorCode);

    if (bankCode) {
      row.push(bankCode.analysis, bankCode.errorType);
    } else {
      row.push('No analysis available', 'Unknown error type');
    }

    return row;
  });

  return [{ name: 'Analyzed Data', data: analyzedRows }];
}
