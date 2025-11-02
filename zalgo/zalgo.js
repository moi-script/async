

import fs, { readFile } from 'fs'

const cache = new Map();

// Zalgo rules is to use one style, asynchronous or synchronous, to prevent being dependent cut in the process 


// create cache
// check if cache is already existed or not
// otherwise read a file then set it to cache then passed the value to cb
// create a file read, for simulating listeners, it use a factory method for arrays config
// using the listeners (callback) stored in array 
// use it to recieve the value from cb from before



function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        cb(cache.get(filename)); // callback is not working, since in 2nd will have to passed the listener,
                                // the current array for listener is empty  
        process.nextTick(() => cb(cache.get(filename))) // get tp last queue in event loop
    } else {
        // asynchronous function
        console.log('Second call');
        const data = fs.readFileSync(filename);
        // readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data)
            cb(data)
        // })
    }
}


function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, (value) => {
        listeners.forEach(listener => listener(value))
    })
    return {
        onDataReady: listener => listeners.push(listener)
    }   
}

const reader1 = createFileReader('data.txt')
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`)
    // ...sometime later we try to read again from // the same file

    // However, we are registering the listener after the creation of reader2, so it will never be invoked.
    const reader2 = createFileReader('data.txt');
    reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`)
    })
})



