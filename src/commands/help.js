const help = () =>{
	const helpMessage = `
	Usage: my-cli [options]

	Options:
	-h, --help     Display this help message
	-v, --version  Display the current version
	-f, --file     Specify a file to process
	`;
	console.log(helpMessage);

}
help();

module.exports = help;