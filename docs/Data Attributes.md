# Relevant Data Attributes

## Datasets
Daily Summaries
    id: GHCND
    start: 1763-01-01

Global Summary of the Month
    id: GSOM
    start: 1763-01-01

Global Summary of the Year
    id: GSOY
    start: 1763-01-01

## Data Categories
    "id": "TEMP",
    "name": "Air Temperature"
    ---
    "id": "ANNTEMP",
    "name": "Annual Temperature"

## Data Types
        {
      "datacoverage": 1,
      "id": "MMNT",
      "maxdate": "2016-03-01",
      "mindate": "1763-01-01",
      "name": "Monthly Mean minimum temperature"
    },
    {
      "datacoverage": 1,
      "id": "MMXT",
      "maxdate": "2016-03-01",
      "mindate": "1763-01-01",
      "name": "Monthly Mean maximum temperature"
    },
    {
      "datacoverage": 1,
      "id": "MNTM",
      "maxdate": "2016-03-01",
      "mindate": "1763-01-01",
      "name": "Monthly mean temperature"
    },
        {
      "datacoverage": 1,
      "id": "TAVG",
      "maxdate": "2018-08-05",
      "mindate": "1763-01-01",
      "name": "Average Temperature."
    },
    {
      "datacoverage": 1,
      "id": "TMAX",
      "maxdate": "2018-08-05",
      "mindate": "1763-01-01",
      "name": "Maximum temperature"
    },
    {
      "datacoverage": 1,
      "id": "TMIN",
      "maxdate": "2018-08-05",
      "mindate": "1763-01-01",
      "name": "Minimum temperature"
    },

## Location

### Categories
"id": "CITY",
"name": "City"
1987 Cities (GLOBAL)

"id": "CNTRY",
"name": "Country"
202 (GLOBAL)
    18786 Stations in USA

"id": "ST",
"name": "State"
51 (USA)

"id": "ZIP",
"name": "Zip Code"
30414 (USA)

### Station Examples
 "datacoverage": 1,
      "elevation": 22.9,
      "elevationUnit": "METERS",
      "id": "GHCND:USC00086414",
      "latitude": 29.1638,
      "longitude": -82.0777,
      "maxdate": "2018-08-04",
      "mindate": "1892-01-01",
      "name": "OCALA, FL US"

34456 Stations Around the Globe with "TEMP" data
34653 Stations with "TAVG" data

18786 Stations in USA
117 Monthly TAVG points per 10 years
2197962 TAVG Points across all stations per 10 years
~ 2200 Requests to collect all this data