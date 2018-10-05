Is It Getting Hotter or Is It Just Me?
========================================
A visualization of historical temperature data and trends

# WORK IN PROGRESS

## TODO
- [ ] see if `usaf` values are unique
- [ ] For each year in /data/gsod
	- [ ] list tar contents
		- [ ] check if file names match listings in database
		- [ ] If a significant number of file names don't match, be wary.
	- [ ] get tar contents
		- [ ] put tar contents into database

Export corrected isd-station and fips-to-country for sharing!

## Notes & Caveats
### Download GSOD Data
I tried using `/scripts/get-gsod.js` at first, however LFTP refused to connect when run on my VPS through node. Thus, I ran LFTP manually. 
```
$ cd data/gsod
$ lftp
:~> open ftp://ftp.ncdc.noaa.gov/pub/data/gsod/
:~> mirror -I */*.tar
:~> bye
```

**This downloads 3.7GB of archived Global Summary of the Day data.**
*(according to `du -sh data/gsod`)*

Be careful if you have a slow internet connection. 

### Mapping Country Ids (in isd station) to country names
fips-to-country has discrepancies. It doesn't map perfectly to the country ids in [isd-station]. I cross-referenced with [fips-to-iso], and google to resolve the discrepancies as best as possible. 

Originals can be found in `/data/original`. My updated versions will be in `/data/updated`.

### isd-problems
There are problems with the data, listed in isd-problems.pdf. Here's a link to the [original NOAA file](ftp://ftp.ncdc.noaa.gov/pub/data/noaa/isd-problems.pdf)

## References
[NOAA FTP Server]: ftp://ftp.ncdc.noaa.gov/pub/data/noaa/
[isd-problems]: ftp://ftp.ncdc.noaa.gov/pub/data/noaa/isd-problems.pdf
[country-list]: ftp://ftp.ncdc.noaa.gov/pub/data/noaa/country-list.txt
[fips-to-iso]: https://www.geodatasource.com/resources/tutorials/international-country-code-fips-versus-iso-3166/
[isd-station]: ftp://ftp.ncdc.noaa.gov/pub/data/noaa/isd-history.txt
also available in csv

[GSOD]: ftp://ftp.ncdc.noaa.gov/pub/data/gsod/
[GSOD Readme]: ftp://ftp.ncdc.noaa.gov/pub/data/gsod/readme.txt
