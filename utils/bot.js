import Chance from "chance";


function asyncTask() {
    const setTime = Math.floor(Math.random() * 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello asynchronous')
        }, setTime * 1000);
    })
}

asyncTask.then(val => console.log(val));
function syncTask() {
    let a = 10;
    let b = 20;
    console.log('Hello synchronous', (a+b));
}


// this generate random async/sync task for testing 

function generateTask(max, min) {
    const chance = new Chance();
    return Array.from({length : max}, () => {
        const rands = chance.integer({max, min});
        return (rands > 0) ? asyncTask : syncTask;
    })
}

// const res = generateTask(20, -10);
// console.log(res);