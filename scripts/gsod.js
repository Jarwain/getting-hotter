const fs = require('fs');
const tar = require('tar');
const util = require('util');
const readline = require('readline');
const { Client } = require('pg');
const { Gunzip } = require('zlib');

const readdir - util.promisify(fs.readdir);

const dir = __dirname + '/../data/gsod';

function load(year){
	const cwd = `${dir}/`;
	extract(year, cwd)
		.then(() => {
			console.log("Tarball has been dumped");
			console.log("Now Inserting into Postgres");
			return renameFiles(cwd);
		})
		.then(() => {

		})
		.catch((err) => {console.log(err)})
}

async function extract(year, cwd){
	return tar.extract({
		file: `${cwd}gsod_${year}.tar`,
		cwd,
		onwarn(message, data) {
			console.log(message);
			console.log(data);
		},
		transform(entry) {
			return entry.pipe(new Gunzip());
		},
	});
}

/*async function save(cwd) {
	const files = await readdir(cwd);
	files.forEach(file => {
		const lr = readline.createInterface({
			input: fs.createReadStream(cwd+file)
		})
	})
}*/

async function renameFiles(cwd){
	return fs.readdir(cwd, (err, files) => {
		files.forEach(file => {
			if(file.indexOf('.op.gz') !== -1){
				const nfile = file.slice(0,-3);
				fs.rename(cwd+file, cwd+nfile, (err) => {
					if(err) throw err;
				});
			}
		})
	})
}

load(1990);
