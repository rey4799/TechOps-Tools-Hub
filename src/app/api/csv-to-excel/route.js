import * as XLSX from 'xlsx';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response('No file provided', { status: 400 });
    }

    // Membaca CSV dan mengonversinya ke Excel menggunakan SheetJS
    const csvData = await file.text();
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(csvData.split('\n').map(row => row.split('|')));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Menyimpan file Excel dalam bentuk buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Mengirimkan file Excel sebagai response
    return new Response(excelBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${file.name.replace('.csv', '.xlsx')}"`,
      },
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return new Response(JSON.stringify({ message: 'Error processing file' }), { status: 500 });
  }
}
