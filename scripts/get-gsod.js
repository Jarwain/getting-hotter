const fs = require('fs');
const FTPS = require('ftps');

const dataDir = __dirname + '/../data/gsod';

let ftps = new FTPS({
	host: 'ftp.ncdc.noaa.gov',
	cwd: dataDir,
}).cd('pub/data/gsod');

const firstYear = 1901;
const currentYear = 1905;

let files = [];

for(let year = firstYear; year < currentYear; year++){
	const gsod = `gsod_${year}.tar`;
	const path = `${dataDir}/${gsod}`;
	if(!pathExists(path)){
		ftps.get(`${year}/${gsod}`);
	}
}

ftps.exec(logResult);


function pathExists(path){
	try {
		fs.accessSync(path, fs.constants.F_OK);
		return true;
	} catch (err) {
		return false;
	}
}

function logResult(err, res){
	if(err || res.error){
		throw new Error(err || res.error);
	}
	console.log(res.data);
}
