const {format} = require('@fast-csv/format');

function createBackup(fileName, rows) {
	const fs = require('fs');
	const stream = format({headers:false});
	console.log('Trying to create a backup');
	const csvFile = fs.createWriteStream(fileName);
	let cpy= [];
	stream.pipe(csvFile);
	for(var i = 0; i < rows.length; ++i)
		stream.write(rows[i]);
	stream.end();
	console.log('Successfully created a backup');
}

module.exports = {
	createBackup
}
