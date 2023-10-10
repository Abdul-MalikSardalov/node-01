import { log } from 'console';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// get the current module's directory path
const _filename = fileURLToPath(import.meta.url);
const PATH = dirname(_filename);

const fileFile = path.join(PATH, 'message.txt');

const requestHandler = (req, res) => {
    const { url, method } = req;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
    <body>
         <form action="/message" method="POST">
    <input name="name" placeholder="Write something">
    <button type="submit">Submit</button>
        </form>
    </body>`);
        return res.end();
    }
    // if request sended
    if (url === '/message' && method === 'POST') {
        const body = []; //[43 54 23 46 42 12]

        req.on('data', (chunk) => {
            body.push(chunk);
            // console.log(chunk);
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
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
};

export default requestHandler;
