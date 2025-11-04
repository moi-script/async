import http from 'http';
import fs from 'fs';
import { fileGeneration } from '../../stream/test/tasks/task4_FileGenerator/exp.js';
import path from 'path';
import { fileURLToPath } from 'url';


const subFilelist = fs.readdirSync('\generated');


const server = http.createServer((req, res) => {

    if (req.method === 'GET') {
        console.log('Triggered');
        
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })

        res.end(responseText.toString());
    }
})

server.listen(4000, () => console.log('running at port 4000'))