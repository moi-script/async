import fs, {mkdir} from 'fs'
import path from 'path'
import http from 'http';
import { urlToFileName } from '../utils/url.js';
import chalk from 'chalk';


const _urlEndpoint = 'http://localhost:4000/spiderV1/new.txt';


function createFolder(filename, cb) {
    try {
        const makeDir = mkdirp.sync(path.dirname(filename))
        cb(null);
    } catch (err) {
        cb(err);
    }
}

function genUrl(validPath) {
    const localHost = 'http://localhost:4000/'
    const dirs = path.dirname(validPath).split('\\');
    return localHost + dirs.pop()
}

function getDir(url) {
    return path.dirname(url);
}
//callback based

// create spider
// access a file from url 
// download a file
// create a folder 
// write to a file



function requestServer(url, cb) {
    const base = path.basename(url);

    const urls = new URL(url);

    console.log('Url ::', urls);
    console.log('base :: ', base);
    const options = {
        port: urls.port,
        host: urls.hostname,
        method: 'GET',
        path: urls.pathname,
    };

    const sendReq = new Promise((resolve, reject) => {
        let data = '';
        try {
            const req = http.request(options);
            req.end();

            req.on('response', res => {
                res.on('data', chunks => {
                    data += chunks.toString();
                })

                res.on('end', () => resolve(data));
                res.on('error', err => reject(err))
            })
        } catch (err) {
            return reject(err);
        }

    })
    sendReq.then(val =>{
        console.log('Processing request', val);
         cb(null, val)
    })
        .catch(err => cb(err));
}


// requestServer(_urlEndpoint, (err, data) => {
//     if (err) console.log('Error ::', err);

//     console.log('Response :: ', data);
// })

//  const folderDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), 'output');

function spider(url, cb) {

    const _filename = path.basename(url);
    
    fs.access(_filename, (err) => {

        if (err && (err.code === 'ENOENT')) {
            console.log('Request server');
            requestServer(url, (err, data) => {
                if (err) return cb(err);

                mkdir(urlToFileName(_filename), (err) => {

                    if (err) return cb(err)

                    fs.writeFile(path.join(urlToFileName(_filename), _filename), data, err => {
                        if (err) return cb(err);

                        cb(null, _filename, true);
                    })


                })
            })
        } else {
            cb(null, _filename, false);
        }
    })
}

spider(_urlEndpoint, (err, data, downloaded) => {
    if(err) console.log(chalk.red('There was an erorr :', err))

        console.log('Result downloaded :: ', data, downloaded);
})

