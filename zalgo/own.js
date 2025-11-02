import fs from 'fs';


// const cache = new Map();

// function getData(filename, cb){
//     // console.log('Get data ::');
//     // console.log(filename)
//     if(cache.has(filename)) {
//         cb(cache.get(filename))
//     } else {

//         // console.log('async read file')
//         const data = fs.readFileSync(filename);
//         // console.log('Data :: ', data);
//         cache.set(filename, data);
//         cb(data);
//     }
// }


// function handleListeners(filename) {
//     const listeners = [];
//     // console.log('Handle listener');

//     getData(filename, (data) => {
//         console.log('Invoke the cb on get data', listeners)
//         listeners.forEach((listener) => listener(data));
//     })

//     return {
//         addListener : (cb) => listeners.push(cb)
//     }
// } 

// const data1 = handleListeners('data.txt');

// data1.addListener((data) => {
//     // console.log('Call back passfrom add listeners' , data)
//     console.log('This is the data :: ', data); 
// })




 // Direct style and CPS, it mostly use return in spefic function 
function initListeners(cb) {
    const listener = [];
    listener.push(cb);
    // console.log(listener[0]());
    return listener;
}

const listenerList = initListeners((data) => {
    console.log('Hello :: ', data);

    return 1000
})

const process = processListeners(listenerList, "Friend");

process();
// const res = process();


function processListeners(containers, data) {
    let listenerFunc = containers[0](data);

    return function () {
        console.log(listenerFunc);
    }
}



// 1 : handle listener
// 2 

