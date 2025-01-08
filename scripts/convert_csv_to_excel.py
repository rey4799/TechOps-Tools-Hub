import pandas as pd
import sys

def convert_csv_to_excel(csv_file_path):
    excel_file_path = csv_file_path.replace('.csv', '.xlsx')
    try:
        df = pd.read_csv(csv_file_path, delimiter='|')
        df.to_excel(excel_file_path, index=False)
        print(f"File saved as {excel_file_path}")
    except Exception as e:
        print(f"Error converting CSV to Excel: {str(e)}")

if __name__ == "__main__":
    csv_file_path = sys.argv[1]
    convert_csv_to_excel(csv_file_path)
