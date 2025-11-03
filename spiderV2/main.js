import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

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

            return cb(null, data);
            // console.log(isDone);
        })
    })
}



function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) {
        return process.nextTick(() => cb);// sync
    }

    //  /spiderV2/hello/new.txt'
    // [1, 1, 2, ,3] [2, 2,], [3, 3,]   

    const links = getPageLinks(currentUrl, body); // returns array // needs to demonstrate this scrapper

    if (links.length === 0) {
        return process.nextTick(() => cb)
    }

    function iterate(index) {
        if (index === links.length) {
            return cb();
        }

        spider(links[index], nesting - 1, function (err) {
            if (err) return cb(err)

            iterate(index + 1);
        })
    }

    iterate(0);
}

function spider(url, nesting, cb) {
    const _filename = path.basename(url.pathname);

    console.log(chalk.green("Filename " + _filename));


    fs.access(_filename, (err) => {
        if (err && (err.code === 'ENOENT')) {
            return download(url, _filename, (err, requestContent) => {
                if (err) return cb(err);

                spiderLinks(url, requestContent, nesting, cb);
            })
        } else {
            spiderLinks(url, requestContent, nesting, cb);
        }
    })
}



// pathdir -> .\http:\localhost:4000\spiderV2\hello.txt 

// pathNameFromUrl -> /spiderV2/hello/new.txt'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1

spider(url, nesting, err => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log('Download complete')
})