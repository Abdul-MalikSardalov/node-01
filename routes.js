import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const _filename = fileURLToPath(import.meta.url);
const PATH = dirname(_filename);
const fileFile = path.join(PATH, 'message.txt');

const sendResponse = (res, headerType, headerValue, text, statusCode = 200) => {
    res.setHeader(headerType, headerValue);
    res.statusCode = statusCode;
    if (text) {
        res.write(text);
    }
    return res.end();
};

const requestHandler = (req, res) => {
    const { url, method } = req;
    if (url === '/') {
        sendResponse(
            res,
            'Content-Type',
            'text/html',
            `
        <body>
             <form action="/message" method="POST">
        <input name="name" placeholder="Write something">
        <button type="submit">Submit</button>
            </form>
        </body>`
        );
    }
    // if request sended
    else if (url === '/message' && method === 'POST') {
        const body = []; //[43 54 23 46 42 12]

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('error', (error) => {
            console.error(error);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1] + '\n';

            fs.appendFile(fileFile, message, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
                sendResponse(res, 'Location', '/', '', 302);
            });
        });
    } else {
        sendResponse(res, 'Content-Type', 'text/plain', 'NOT FOUND', 400);
    }
};

export default requestHandler;
