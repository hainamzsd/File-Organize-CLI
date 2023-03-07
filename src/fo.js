#!/usr/bin/env node
const fs = require('fs');
const process = require('process');

const option = process.argv[2];
const path = process.argv[3];
try{
	if(option.includes('-h') || option.includes('--help')){
		require('./commands/help');
	}
	else if(option.includes('-v') || option.includes('--version')){
		require('./commands/version');
	}

	else if(option.includes('-fo') || option.includes('--file-organize')){
			const sort = require('./commands/sortBySize');
			sort(path);
	}	
	else{
		console.error(
			`
			Error: Commands not found.

			Use the -h or --help option to display list of commands

			`);
	}
}catch(err){
	const errorMessage = `
	Error: No arguments provided.

	Usage: my-cli [options]

	Use the -h or --help option to display help.
	`;
  // Print the error message
	console.error(errorMessage);
	process.exit(1);
}

