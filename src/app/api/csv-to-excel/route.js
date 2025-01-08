import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ message: 'File is required' }, { status: 400 });
    }

    // Mengambil data file CSV dalam bentuk Buffer
    const buffer = await file.arrayBuffer();
    const csvData = buffer.toString('utf-8'); // Mengonversi ArrayBuffer ke string

    // Memecah CSV berdasarkan baris dan delimiter "|"
    const rows = csvData.split('\n');
    const records = rows.map(row => row.split('|'));

    // Menggunakan SheetJS untuk mengonversi data CSV ke Excel
    const XLSX = require('xlsx');
    const ws = XLSX.utils.aoa_to_sheet(records);  // Membuat worksheet dari data CSV
    const wb = XLSX.utils.book_new();  // Membuat workbook baru
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  // Menambahkan worksheet ke workbook

    // Membuat buffer untuk file Excel
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Mengirim file Excel langsung sebagai response download
    const response = new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${file.name.replace('.csv', '.xlsx')}`,
      },
    });

    return response;
    
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
