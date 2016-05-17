// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var iconsPath = './public/icons';
var iconFiles = fs.readdirSync(iconsPath);
var recursive = require('recursive-readdir');

//Defining middleware to serve static files
app.use('/static', express.static('public'));
app.use(express.static('.'));

app.get('', function(req,res) {
	res.send(iconFiles);
});

app.listen(3000, function() {
	console.log("iconFiles = " + iconFiles);

	fs.readdir(iconsPath, function(err, files) {
		if(err) {
			console.error("could not list directory.", err);
			process.exit(1);
		}

		files.forEach(function(file, index) {
			var iconPath = path.join(iconsPath, file);
			fs.stat(iconPath, function(error, stat) {
				if(stat.isFile())
					console.log("'%s' is a file.", iconPath);
				else if (stat.isDirectory()){
					var section = fs.readdirSync(iconPath);
					console.log("'%s' is a directory.", iconPath);
					console.log("here are the icons in " + file + ":");
					console.log(section);
				}
			});
		});
	});
	recursive(iconsPath, function(err, files) {
		files.forEach(function(file) {
				/*
				console.log(file + " in " + file.split('/').slice(-2, -1).join('/'));*/
		});
	})
});




/*
read root directory of icons
walk through each file
(if it's an image, add to array iconFiles)
if it's a directory, 
	note the name, 
	display it as a header, 
	dive in and add to a new icon array
	display array of icons
repeat
ignore ds_store with glob module or junk

*/