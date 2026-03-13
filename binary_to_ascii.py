import numpy as np
import pandas as pd
import os

# Create a dtype with the binary data format and the desired column names
dt = np.dtype([
    ('time', 'f4'), ('la', 'i4'), ('counts', 'i4'), 
    ('biomass', 'f4'), ('depth', 'f4'), ('flow', 'f4'), 
    ('fluor', 'f4'), ('gps', 'S10'), ('f', 'i4', (24,))
])

directory = os.path.dirname(__file__)
file_path = os.path.join(directory, "Feb12.d00")

data = np.fromfile(file_path, dtype=dt)
simple_cols = ['a', 'b', 'c', 'd', 'e']

df_simple = pd.DataFrame(data[['time', 'la', 'counts', 'biomass', 'depth', 'flow', 'fluor', 'gps']])
df_buckets = pd.DataFrame(data['f'].tolist())
df_final = pd.concat([df_simple, df_buckets], axis=1)



header_lines = [
    '"TITLE:","",""',
    '"DATE:","","Wed Jan 03 03:36:53 1990"', #to do automate
    '"COMMENT:","",""',
    '"FROM FILE:","","FEB12.D00"',
    '"TIME FROM START:","","0 (s)"',
    '"EXTRACTION:","","PART-AVERAGE"',
    "", 
    '"TIME (s)","LA","COUNTS","BIOMASS","DEPTH (m)","FLOW","FLUOR","GPS","BINS"'
]


output_path = os.path.join(directory, "Feb12_output.csv")


df_final.to_csv(output_path, index=False)

with open(output_path, 'w') as f:
    # add header lines
    for line in header_lines:
        f.write(line + '\n')
    
    # write the data
    df_final.to_csv(f, index=False, header=False)

print(f"Successfully created {output_path}")


print("Conversion complete! Check Feb12_output.csv")

# # Or if you want to explicitly set the column names
# df = pd.DataFrame(data, columns=data.dtype.names)