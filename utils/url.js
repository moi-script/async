import path from 'path';
import { fileURLToPath } from 'url';
export function urlToDirName(url) {
    const pathname = path.dirname(new URL(url).pathname) + '//';



    console.log(pathname);
    return fileURLToPath()
}

// // urlToPathname
export function urlToBaseName(url) {
    return path.basename(url);
}


export function urlToFileName(url) {
    const basename = path.basename(url);
    
    return path.parse(basename).name;
}



const _urlEndpoint = 'http://localhost:4000/spiderV1/hello/new.txt';


console.log(urlToFileName(_urlEndpoint));
// await mkdir('C:\\test\\folder'); // double backslashes
// // OR
// await mkdir('C:/test/folder'); // simpler and portable




// package.json 

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log('FIlename :: ', __filename);
// console.log('Dirname :: ', __dirname);

// const pathDir = path.join(__dirname, 'output', 'logs');

// // FIlename ::  C:\GrindBuffer\async\utils\url.js
// // Dirname ::  C:\GrindBuffer\async\utils
// // Path dir :: C:\GrindBuffer\async\utils\output\logs


// console.log('Path dir ::', pathDir);

// // const dirPath = path.join(__dirname, 'output', 'logs');
// // await mkdir(dirPath, { recursive: true });
