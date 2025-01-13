import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const basePath = './data/';

function safeParseJson(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return {};
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file'); // Get all uploaded files

    if (files.length === 0) {
      return new NextResponse('No files provided', { status: 400 });
    }

    // Read and process CSV files (like the ones in your Python code)
    const allData = [];
    for (const file of files) {
      const fileContent = await file.text();
      const parsedData = Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;
      allData.push(parsedData);
    }

    // Example of merging the data (adjust as needed)
    const mergedData = allData.flat(); // Merge data from all CSVs

    // Example processing on nested JSON (like `response.body` columns)
    mergedData.forEach((row) => {
      if (row['response.body']) {
        const parsedJson = safeParseJson(row['response.body']);
        row['processed_field'] = parsedJson['field_name']; // Extract and process data
      }
    });

    // Convert merged and processed data into a CSV string
    const csvOutput = Papa.unparse(mergedData);

    // Convert CSV to Excel format
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(mergedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Processed Data');

    // Save as Excel file
    const filePath = path.join(basePath, 'processed_data.xlsx');
    XLSX.writeFile(workbook, filePath);

    // Return the file as a download response
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=processed_data.xlsx',
      },
    });
  } catch (error) {
    console.error('Error processing files:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
