import psycopg2
import pandas as pd
import os

def load_csv_to_postgres(csv_file, conn):
    # Load CSV data into a DataFrame
    df = pd.read_csv(csv_file)

    # Create a cursor object
    cur = conn.cursor()

    # Insert data into the table
    for row in df.itertuples(index=False):
        insert_query = '''
        INSERT INTO final_output (trouble_code, date_of_test, num_of_keyword, unformatted_sentence, formatted_sentence)
        VALUES (%s, %s, %s, %s, %s);
        '''
        cur.execute(insert_query, row)

    # Commit the transaction
    conn.commit()

    # Close the cursor
    cur.close()

def main():
    # PostgreSQL database connection parameters
    db_params = {
        'host': 'localhost',
        'port': '5432',
        'dbname': 'troubleticketer',
        'user': 'postgres',
        'password': 'Penny5108!'
    }

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_params)

    # Directory containing the CSV files
    csv_dir = '/Users/adam/Desktop/UNT Course Materials/Spring 2025/CSCE 5430/TermProject/load-data/data-files'  # Update this with the actual path to your CSV files

    # Load each CSV file into the corresponding table
    for csv_file in os.listdir(csv_dir):
        if csv_file.endswith('.csv'):
            csv_file_path = os.path.join(csv_dir, csv_file)
            load_csv_to_postgres(csv_file_path, conn)

    # Close the database connection
    conn.close()

if __name__ == "__main__":
    main()

