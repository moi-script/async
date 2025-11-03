import http from 'http';
import fs from 'fs';




// 'Content-Length': Buffer.byteLength(body),
//     'Content-Type': 'text/plain',


const responseText = fs.readFileSync('resp.txt');

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