import pandas as pd
import glob
from datetime import datetime
import warnings
from openpyxl import Workbook
import os
import tkinter as tk
from tkinter import filedialog
from datetime import datetime

# Suppress warnings from openpyxl
warnings.filterwarnings("ignore", category=UserWarning, module="openpyxl")

# Define the function to find error analysis
def find_error_and_analysis(key, code, message):
    # Filter the DataFrame to find the matching rows
    result = bank_code[(bank_code['key'] == key) & (bank_code['code'] == code)]
    
    # Check if any results were found
    if not result.empty:
        analysis = result['analysis'].values[0]  # Get the first matching analysis
        error_type = result['error type'].values[0]  # Get the first matching error type
        return analysis, error_type, False
    else:
        print('Analysis not found')
        new_analysis = input(f"Input analysis for '{error_code}' - '{message}' : ")
        new_error_type = "Technical Error"
        new_error_typ_answer = input(f"Is technical error ?(Y/N/Other): ")
        if new_error_typ_answer.lower() == "N".lower():
            new_error_type = "Bussines Error"
        elif new_error_typ_answer.lower() == "Y".lower():
            new_error_type = "Technical Error"
        else:
            new_error_type = input(f"Input new error type : ")
                   
        return new_analysis, new_error_type, True
    
def percentage_to_double(percentage_string):

    # Remove the '%' sign and convert to a float
    percentage_value = float(percentage_string.replace('%', ''))

    # Divide the percentage by 100 to get the double value
    double_value = percentage_value / 100

    return double_value

def add_pivotTable(pivot_data_table: pd.DataFrame) -> pd.DataFrame:
    # Create a pivot table with multi-level index for the rows
    pivot_table = pd.pivot_table(pivot_data_table, 
                                values=[pivot_data_table.columns.values[2], pivot_data_table.columns.values[3]], 
                                index=[pivot_data_table.columns.values[4], pivot_data_table.columns.values[0], pivot_data_table.columns.values[5]], 
                                aggfunc={pivot_data_table.columns.values[2]: 'sum', pivot_data_table.columns.values[3]: 'sum'},  # Use 'first' for Percent to keep original string
                                margins=True,  # Adds the 'Grand Total'
                                margins_name='Grand Total',  # Name for grand totals
                                fill_value=0)

    # Convert the pivot table to a regular DataFrame for further manipulation
    pivot_df = pivot_table.reset_index()

    pivot_df[pivot_data_table.columns.values[3]] = (pivot_df[pivot_data_table.columns.values[3]] * 100).astype(str) + '%'  # Convert to string and add '%'

    # Rename 'Percent' column to 'Percent (%)'
    pivot_df.rename(columns={pivot_data_table.columns.values[3]: 'Percent (%)'}, inplace=True)

    # Create a new DataFrame to hold the final result with empty rows
    final_df = pd.DataFrame(columns=pivot_df.columns)

    # Loop through each unique 'Error Type' and append an empty row after each section
    for error_type in pivot_df[pivot_data_table.columns.values[4]].unique():
        # Filter rows for the current 'Error Type'
        section = pivot_df[pivot_df[pivot_data_table.columns.values[4]] == error_type]
        
        # Append the section to the final DataFrame
        final_df = pd.concat([final_df, section], ignore_index=True)

    empty_row = pd.DataFrame([['', '', '', '', '']], columns=pivot_df.columns)
    for index in range(5):
        # Insert an empty row after each section (Error Type)
        final_df = pd.concat([final_df, empty_row])
    
    return final_df

def format_width(writer : pd.ExcelWriter):

    for worksheet in writer.sheets:
        # Auto-adjust column widths
        for column in writer.sheets[worksheet].columns:
            max_length = 0
            column = [cell for cell in column]  # Convert the column generator to a list
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = (max_length + 2)  # Adding extra space
            worksheet.column_dimensions[column[0].column_letter].width = adjusted_width

# Function to open file dialog and select a file
def select_file():
    root = tk.Tk()
    root.withdraw()  # Hide the main window
    file_path = filedialog.askopenfilename(title="Select Bank Code File", filetypes=[("Excel files", "*.xlsx")])
    return file_path


csv_files = glob.glob('*.csv')
excel_file = f'daily-recap-{(datetime.now()).strftime("%m%d%Y")}.xlsx'

without_bank_code_answer = input(f"Do You Have Bank Code ?(Y/N): ")
is_with_bank_code = False
bank_code_file = ''
if without_bank_code_answer.lower() == "Y".lower():
    is_with_bank_code = True
    print('Select your Bank Code Name')
    # Load the Bank Code Excel file
    bank_code_file = select_file()  # Replace this with the actual file path

#Generate new bankcode if new bank code exists
new_bank_code_file = f'New Bank Code-{(datetime.now()).strftime("%m%d%Y")}.xlsx'


isBankCodeFound = False

# Check if the file exists
if is_with_bank_code and os.path.exists(bank_code_file):
    # If the file exists, load the sheets
    bank_code = pd.read_excel(bank_code_file, sheet_name='Bank Code', converters={1: str})
    key_data = pd.read_excel(bank_code_file, sheet_name='Key')
    # Normalize column names
    bank_code.columns = bank_code.columns.str.strip().str.lower()  # Convert to lowercase and strip whitespace
    isBankCodeFound = True
else:
    print(f"Uh, Without bank code?")
    print(f"Good fucking luck, you're on your own")

new_bc_df = pd.DataFrame(columns=['key', 'code', 'analysis', 'error type'])


with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:
    # with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:
        for csv_file in csv_files:

            df = pd.read_csv(csv_file, delimiter='|', converters={1: str})
            df['Error Type'] = ""
            df['Analysis'] = ""

            sheet_name = csv_file.split('.')[0]
            key = 0
            summary_df = pd.DataFrame()
            if isBankCodeFound:
                print(key_data)
                key_index = input(f"Input key index for '{sheet_name}' : ")
                key = key_data.at[int(key_index), 'key']
            
            for index, row in df.iterrows():
                df.at[index, df.columns.values[3]] = percentage_to_double(row[df.columns.values[3]])
                count_value = row[df.columns.values[2]]
        
                # Check if it's an integer
                if isinstance(count_value, int):
                    # If it's already an int, you can use it directly
                    df.at[index, df.columns.values[2]] = count_value
                elif isinstance(count_value, str):
                    # If it's a string, replace commas and convert to int
                    df.at[index, df.columns.values[2]] = int(count_value.replace(",", ""))
                else:
                    # Handle unexpected types, if necessary
                    print(f"Unexpected type for row {index}: {type(count_value)}")
                
                if isBankCodeFound:
                    error_type = ""
                    analysis = ""
                    error_code = row.iloc[1]
                    surrounding_message = row[df.columns.values[0]]
                    analysis, error_type, isNew = find_error_and_analysis(key, error_code, surrounding_message)
                    df.at[index, df.columns.values[1]] = error_code

                    #Add to new Bank Code if has new analys
                    if isNew:
                        data_analysis = {'key': key, 'code': error_code, 'analysis': analysis,'error type': error_type}
                        # Convert dictionary to DataFrame
                        data_analysis_df = pd.DataFrame([data_analysis])
                        new_bc_df.loc[len(new_bc_df)] = data_analysis
                    
                    df.at[index, 'Error Type'] = error_type
                    df.at[index, 'Analysis'] = analysis  
            if isBankCodeFound: 
                # default_column = pd.DataFrame(columns=[df.columns.values[4], df.columns.values[0], df.columns.values[5], df.columns.values[2], df.columns.values[3]])
                # summary_df = pd.concat([summary_df, default_column])
                summary_df = pd.concat([summary_df, add_pivotTable(df)])

            #Write dataFrame to Excel
            df.to_excel(writer, sheet_name=sheet_name, index=False)

            #Write Sumarry Pivot
            # if isBankCodeFound: summary_df.to_excel(writer, sheet_name=f"Summary '{sheet_name}'", index=False)
        # format_width(writer)
    
#Write New Bank Code
if isBankCodeFound and new_bc_df.size >0 :
    with pd.ExcelWriter(new_bank_code_file, engine='openpyxl') as new_bc_writer:
        #Write to new bank code
        print(new_bc_df)
        if isBankCodeFound: new_bc_df.to_excel(new_bc_writer, sheet_name='New Bank Code', index=False)


print(f"CSV files {csv_files} have been combined into Excel file '{excel_file}', with each CSV as a separate sheet.")