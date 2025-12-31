import pandas as pd
import numpy as np
from datetime import datetime
from typing import Union, Tuple
from pandas import read_csv
from geopy.geocoders import Nominatim
import re

data = pd.read_csv("../../../assets/Data/merged.csv")

onehot_columns = ['Progress', 'Priority', 'Race', 'Sex'] # Define categorical columns for one-hot encoding
for col in onehot_columns: # Convert to categorical dtype
    data[col] = data[col].astype('category')

def height_to_inches(h):
    if pd.isna(h):
        return 0 
    if not isinstance(h, str):
        return 0  
    
    # Example: "5 ft. 3 in."
    match = re.match(r'(\d+)\s*ft\.\s*(\d+)\s*in\.', h)
    if match:
        feet = int(match.group(1))
        inches = int(match.group(2))
        return feet * 12 + inches

    return 0

# Convert Height to inches
data['Height_in_inches'] = data['Height'].apply(height_to_inches)


# One-hot encoding for categorical variables
data = pd.get_dummies(data, columns=onehot_columns, drop_first=True)


data[['Call_Code', 'Call_Desc']] = data['Call_Type'].str.split(' - ', n=1, expand=True)
data.drop(columns=['Call_Type'], inplace=True)

#convert blcok address to latitude and longitude
geolocator = Nominatim(user_agent="location_converter")
data["ZIP_Code"] = (data["ZIP_Code"].astype(str).str.replace(r"\.0$", "", regex=True).str.strip())
data["Full_Address"] = data["Block_Address"].astype(str) + ", " + data["City"].astype(str) + " CA " + ", " + data["ZIP_Code"].astype(str)
data.head(4)
def get_lat_long(address):   
    location = geolocator.geocode(address, timeout = 10)
    if location:  #if there is a location they could find, it will be "True"
        return (location.latitude, location.longitude)
    else:
        return (None, None)

coordinates = data["Full_Address"].apply(get_lat_long) #returns a Series 
data["Latitude"], data["Longitude"] = zip(*coordinates)  

print(data.head())

# save cleaned data as a new CSV file
# data.to_csv("../../../assets/Data/merged_table_cleaned.csv", index=False)

#save cleaned data for map marker
map_marker_data = data[["Incident_Number", "CreateDatetime","Source", "Dispositions", "Block_Address","City","ZIP_Code", "Latitude", "Longitude", "Call_Desc"]]
#map_marker_csv
map_marker_data.to_csv("../../../assets/Data/map_marker_data.csv", index=False)

#map_marker_json
map_marker_data.to_json("../../../assets/Data/map_marker_data.json", orient="records")


# pr practice