const fs = require('fs');
const tar = require('tar');
const zlib = require('zlib');
const { Client } = require('pg');
const readline = require('readline');
const MiniPass = require('minipass');

function dayFactory(line) {
	let result = new Map(Object.entries({
			station: line.slice(0,6).trim(),
			wban: line.slice(7,12).trim(),
			date: line.slice(14,22).trim(),
			temp: line.slice(24,30).trim(),
			temp_observations: line.slice(31,33).trim(),
			dew: line.slice(35,41).trim(),
			dew_observations: line.slice(42,44).trim(),
			sea_pressure: line.slice(46,52).trim(),
			sea_pressure_observations: line.slice(53,55).trim(),
			station_pressure: line.slice(57,63).trim(),
			station_pressure_observations: line.slice(64,66).trim(),
			visible: line.slice(68,73).trim(),
			visible_observations: line.slice(74,76).trim(),
			wind_speed: line.slice(78,83).trim(),
			wind_speed_observations: line.slice(84,86).trim(),
			max_wind_speeed: line.slice(88,93).trim(),
			wind_gust: line.slice(95,100).trim(),
			max_temp: line.slice(102,108).trim(),
			max_temp_flag: line.slice(108,109).trim(),
			min_temp: line.slice(110,116).trim(),
			min_temp_flag: line.slice(116,117).trim(),
			precipitation: line.slice(118,123).trim(),
			precipitation_flag: line.slice(123,124).trim(),
			snow: line.slice(125,130).trim(),
			frshtt: line.slice(132,138).trim(),
		}));
	for(let [key, value] of result){
		if(value == 9999.9 || value == 999.9){
			if(key == 'snow'){
				result.set(key, 0);
			}
			else{
				result = result.set(key, null);
			}
		}
	}
	return result;
}

function gunzip(entry){
	return entry.pipe(new zlib.Gunzip())
}

function readLines(stream) {
	return readline.createInterface({
			input: stream,
		});
}


const client = new Client({
	host: 'localhost',
	database: 'hotter',
	user: 'hotter',
});

async function saveDay(day){
	try {
		const fields = [...day.keys()];
		const numbers = fields.map((e, i) => `$${i+1}`).toString();
		const query = {
			name: 'insert-day',
			text: `INSERT INTO gsod (${fields.toString()}) VALUES (${numbers})`,
			values: Array.from(day.values()),
		}

		const res = await client.query(query);
		/*console.log(
			'Saved Station:',
			day.get('station'), 
			'WBAN:',
			day.get('wban'), 
			'Date:',
			day.get('date')
		);*/
		return res;
	} catch (err) {
		console.log(err, day);
	}
}

const opt = {
	filter(path, entry){
		return path.indexOf('.gz') !== -1;
	}
}
function loadTar(tarball) {
	const untar = new tar.Parse(opt).on('entry', entry => {
		const data = gunzip(entry).on('finish',  () => {
				untar.emit('data', data);
			});
	});
	return tarball.pipe(untar);
}

function saveStation(data) {
	return new Promise((resolve, reject) => {
		const promises = [];
		let day;
		readLines(data)
			.on('line', line => {
				if(line.indexOf('STN') == -1){
					day = dayFactory(line);
					promises.push(saveDay(day));
				}
			})
			.on('close', () => {
				Promise.all(promises).then(val => {
					console.log(
						'Saved Station:',
						day.get('station'), 
						'WBAN:',
						day.get('wban')
					);
					resolve(val)
				});
			})
	})
}

function loadTarToDb(tarball){
	return new Promise((resolve, reject) => {
		const promises = [];
		
		loadTar(tarball).on('data', data => {
			promises.push(saveStation(data));
		}).on('finish', () => {
			Promise.all(promises).then(resolve);
		});
	})
}

async function loadAllGsod(){
	try {
		console.log("Connecting to Postgresql");
		await client.connect();
		console.log("Connected!");
		const dir = __dirname + '/../data/gsod/';
		const files = fs.readdirSync(dir);
		for(let i = 0; i < files.length; i++){
			const file = files[i];
			if(file.indexOf('.tar') !== -1){
				console.log("Loading:", file);
				await loadTarToDb(fs.createReadStream(dir+file));
			}
		}
		await client.end();
	} catch (err) {
		console.log(err);
	}
}

loadAllGsod();

/*loadTarToDb(1935).then((val) => {
	console.log("FINALL DONE");
}).catch(console.log);
*/
