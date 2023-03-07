const fs = require('fs');
const path = require('path');
const fileSortDes = require('../commands/sortBySize');

describe('fileSortDes function', () => {
  const folderPath = './test';
  
  beforeAll(() => {
    // Create some files in the test directory
    fs.writeFileSync(path.resolve(folderPath, 'file1.txt'), 'This is a small file');
    fs.writeFileSync(path.resolve(folderPath, 'file2.txt'), 'This is a large file. This is a large file.');
    fs.mkdirSync(path.resolve(folderPath, 'subdir'));
    fs.writeFileSync(path.resolve(folderPath, 'subdir/file3.txt'), 'This is a medium file. This is a medium file.');
  });
  
  afterAll(() => {
    // Remove the files and directories created for the test
    fs.unlinkSync(path.resolve(folderPath, 'small/file1.txt'));
    fs.unlinkSync(path.resolve(folderPath, 'medium/subdir/file3.txt'));
    fs.unlinkSync(path.resolve(folderPath, 'large/file2.txt'));
    fs.rmdirSync(path.resolve(folderPath, 'small'));
    fs.rmdirSync(path.resolve(folderPath, 'medium/subdir'));
    fs.rmdirSync(path.resolve(folderPath, 'medium'));
    fs.rmdirSync(path.resolve(folderPath, 'large'));
    fs.unlinkSync(path.resolve(folderPath, 'subdir/file3.txt'));
    fs.rmdirSync(path.resolve(folderPath, 'subdir'));
    fs.unlinkSync(path.resolve(folderPath, 'file1.txt'));
    fs.unlinkSync(path.resolve(folderPath, 'file2.txt'));
  });
  
  test('should sort files into small, medium, and large directories', () => {
    fileSortDes(folderPath);
    
    expect(fs.existsSync(path.resolve(folderPath, 'small/file1.txt'))).toBe(true);
    expect(fs.existsSync(path.resolve(folderPath, 'medium/subdir/file3.txt'))).toBe(true);
    expect(fs.existsSync(path.resolve(folderPath, 'large/file2.txt'))).toBe(true);
  });
});
