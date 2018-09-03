Design & Development
=====================

## Client
### Iter1
Select Station from Dropdown!

Get Temperature data from those stations
Render!

### Iter2
Select Location from Dropdown
Get Closest Stations to Location
Get Temp data from those locations
Render!


### Iter3
User enters location
	City, State
	Zip Code
Get closest stations
Get Temp Data from Locations
Render!


## Building the Database
Load `fips-to-country.txt` for reference
Load `isd-station.txt`
For each year in [daily-summary] OR [isd-lite]
	Load File for station `${USAF}-${WBAN}-year.gz`
		FORMAT: `isd-format.txt`
		Keep Fields: 1-5, 7-9


NOTE: -9999 === NULL

## Reference
[daily-summary] ftp://ftp.ncdc.noaa.gov/pub/data/gsod/2017/
[isd-lite] ftp://ftp.ncdc.noaa.gov/pub/data/noaa/isd-lite/

## PROBLEMS
ftp://ftp.ncdc.noaa.gov/pub/data/noaa/isd-problems.pdf
- U.S. station (USAF ID) 722053 (Orlando, FL) has around 10 incorrect temperature values surrounded by missing temperature data in each case between March and May 1990.
- U.S. station (USAF ID) 722051 (Orlando FL) has thousands of incorrect temperature values between 1976 and 1988.
- U.S. station (USAF ID) 726885 (Meacham OR) has scattered invalid temperatures during January 1973, June - August 1973, and January 1974.
- U.S. station (USAF ID) 725765 Riverton WY is assigned a missing code for WBAN ID (99999) from 2000 – 2005 but should be WBAN ID = 24061.  After 2005 this station is listed as (USAF ID) 726720 with a missing code for WBAN ID (99999).  The data for this period should be under USAF ID 725765 and WBAN ID 24061.
- U.S. station (USAF ID) 722010 (Key West, FL) has incorrect temperature values between 0053 and 0353 on July 12, 2009 (in the negative 20 Celsius range).
