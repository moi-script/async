import fs, { mkdir } from 'fs'
import path from 'path'
import http from 'http';
import { urlToFileName } from '../utils/url.js';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'url';

const outputName = process.argv[2];

// console.log(import.meta.url); // file:///C:/GrindBuffer/async/spiderV2/main.js

// const localObjectPath = path.parse(import.meta.url);

// const links = new URL('http://localhost:4000/spiderV2/hello/new');
// console.log("Links ::", links.pathname);

// const localPath = path.join(links.pathname, outputName);
// console.log('Object form ', localObjectPath);

// // console.log('Local path :: ', localPath);
// console.log('Normalize path :: ', localPath.split('\\').join('/'));
// console.log('base :: ', path.basename('http://localhost:4000/spiderV2/hello'));


const url = 'http://localhost:4000/spiderV2/hello/' + outputName;

const pathNameFromUrl = new URL(url);

// console.log('URL object ::', new URL(url));

// console.log('Path name from url :: ', pathNameFromUrl);

// console.log('Basename ::', path.basename(pathNameFromUrl));

// const localPath = path.join(pathNameFromUrl)



// console.log('path dir :', localPath);


// const newUrl = new URL(pathToFileURL(pathDir));
// console.log('urls valid :', pathToFileURL(pathDir));
// const pathToNormalize = path.normalize(_urlEndpoint);
// console.log('Normal path :: ', pathToNormalize);
// console.log(import.meta.url); // file:///C:/GrindBuffer/async/spiderV2/main.js
// .\http:\localhost:4000\spiderV2\hello.txt


//callback based
// create spider
// access a file from url 
// download a file
// create a folder 
// write to a file



function requestServer(url, cb) {
    const urls = new URL(url);

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
    sendReq.then(val => {
        console.log('Processing request', val);
        cb(null, val)
    })
        .catch(err => cb(err));
}
function saveFile(_filename, data, cb) {
    // console.log('Filename ::', _filename);
    // console.log('url to file name ::', urlToFileName(_filename));

    mkdir(urlToFileName(_filename), (err) => {
        if (err) return cb(err)

        fs.writeFile(path.join(urlToFileName(_filename), _filename), data, (err) => {
            if (err) return cb(err);
            return cb(null, _filename, true);
        })
    })

}

function download(url, _filename, cb) {
    console.log(chalk.blue('URl href :' + url.href));
    requestServer(url.href, (err, data) => {
        if (err) return cb(err);
        saveFile(_filename, data, (err, isDone) => {
            if (err) return cb(err)
            console.log(isDone);
        })
    })
}

function spider(url, cb) {
    const _filename = path.basename(url.pathname);

    console.log(chalk.green("Filename " + _filename));

    fs.access(_filename, (err) => {
        if (err && (err.code === 'ENOENT')) {
            download(url, _filename, (err, isDone) => {
                if (err) return cb(err);
                return cb(null, _filename, isDone);
            })
        } else {
            cb(null, _filename, false);
        }
    })
}

// pathdir -> .\http:\localhost:4000\spiderV2\hello.txt 

// pathNameFromUrl -> /spiderV2/hello/new.txt'



spider(pathNameFromUrl, (err, data, downloaded) => {
    if (err) console.log(chalk.red('There was an erorr :', err))

    console.log('Result downloaded :: ', data, downloaded);
})

