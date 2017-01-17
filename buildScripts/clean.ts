import * as del from 'del';

const folders = ['./source', './buildScripts'];
const jsFiles = '/**/*.js';
const mapFiles = '/**/*.js.map';
const typingFiles = '/**/*.d.ts';

let filesToDelete = [];

folders.forEach(folder => filesToDelete.push(...[folder + jsFiles, folder + mapFiles, folder + typingFiles]));

console.log('Cleaning...');
console.log(filesToDelete);
del(filesToDelete);
