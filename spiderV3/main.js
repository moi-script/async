
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const url = new URL(import.meta.url); // return url object with a pathname in posix format

// const winPath = url.pathname.split('/'); // convert posix to array 
// winPath.shift(); // remove the first element

// const validWinPath = winPath.join('\\'); // join, this convert ('/')the posix to window ('\) 
// const winUrl = new URL(validWinPath);
// console.log('Config path ::', validWinPath)
// console.log('Dir: ', fileURLToPath(url));


// const pathNameConfig = pathToFileURL(validWinPath);
// console.log('Pathname config :',pathNameConfig )





// spider web 3 -> Parallel Execution 

let completed = 0;
let hasErrors = false;


function done(err) {
    if (err) {
        hasErrors = true 
        return cb(err)
    }
    if (++completed === links.length && !hasErrors) {
        return cb() // spiderLinks()
    }
}

function increment() {
    if(++completed  === false) 

        console.log('increment');
    console.log(completed);
}
increment()

// simple iterate through links then passing the function done along with that, 
// done function is determinants when it will stop so it will return a cb() from spider links
// links.forEach(link => spider(link, nesting - 1, done))