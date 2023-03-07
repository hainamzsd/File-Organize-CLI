const fs = require('fs');
const path = require('path');

const fileSortDes = (folderPath) => {
	try{
		const smallDir = path.resolve(folderPath, 'small');
		const mediumDir = path.resolve(folderPath, 'medium');
		const largeDir = path.resolve(folderPath, 'large');

		 if (!fs.existsSync(smallDir)) fs.mkdirSync(smallDir);
    if (!fs.existsSync(mediumDir)) fs.mkdirSync(mediumDir);
    if (!fs.existsSync(largeDir)) fs.mkdirSync(largeDir);

		// Get the list of files in the folder
		const files = fs.readdirSync(folderPath);

		// Sort the files based on their size, in ascending order
		const sortedFiles = files.sort((file1, file2) => {
			const stats1 = fs.statSync(`${folderPath}/${file1}`);
			const stats2 = fs.statSync(`${folderPath}/${file2}`);
			return stats1.size - stats2.size;
		});
		// Move the files to the appropriate directory based on their size
		for (const file of sortedFiles) {
		console.log(file);

			const fileSizeInBytes = fs.statSync(`${folderPath}/${file}`).size;
			let destDir;
			if (fileSizeInBytes < 1024 * 1024) {
				destDir = smallDir;
			} else if (fileSizeInBytes < 10 * 1024 * 1024) {
				destDir = mediumDir;
			} else {
				destDir = largeDir;
			}
			console.log(`Moving ${file} to ${destDir}`);
			const isDirectory = fs.statSync(`${folderPath}/${file}`).isDirectory();
			console.log(isDirectory);
			if (!isDirectory) {
				fs.renameSync(`${folderPath}/${file}`, `${destDir}/${file}`);
			}
			
		}
		console.log("file sorted");
	}
	catch(err){
		console.log("Error:", err);
	}
}
module.exports = fileSortDes;
