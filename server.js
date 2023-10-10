import { log } from 'console';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// write, read , append and delete this text to `message.txt`
const filePath = path.join(PATH, 'message.txt');
const messageToSave = `Hello there,\nwelcome to Node.js `;

// // write
// fs.writeFile(filePath, messageToSave, 'utf8', (err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('File written');
//     }
// });
// // read
// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });
// append
// const someTextToAppend = '\nIt will be fun';

// fs.appendFile(filePath, someTextToAppend, 'utf8', (err) => {
//     if (err) {
//         console.error(`Some problem with appending ${err}`);
//     } else {
//         console.log(`Text appended to the file`);
//     }
// });
// open, read , close

// unlink
// fs.unlink(filePath, (err) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(`All good`);
//     }
// });
