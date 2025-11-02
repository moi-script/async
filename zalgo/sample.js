// Direct style
import fs from 'fs';


// still be considered direct since the returns is synchronous 

function getValue(filename) {
    return fs.readFileSync(filename);
}

// CPS -> continuation passing style 

// function f1() {
//     console.log('function 1 : ');
// }


// function f2() {
//     console.log('function 2 : ');
//     f1()
// }

// function f3() {
//     console.log('Function 3 :: ');
//     f2()
// }

// function f4() {
//     console.log('Function 4 ');
//     f3()
// }
// f4();


// Most usefull cases of CPS is a use of callbacks from nodejs core, API
// As well as pushing it as queue to act as listeners
function getVal1(param, cb) {
    return cb(param);
}

function pushProcessValue(params, cb) {
    let processList = [];

    processList.push(cb);
    // console.log(processList)

    return function () {
        const [task] = processList;
        // console.log('Task :: ',task, typeof task)
        task(params, val => console.log(val))
    }
}

// let proceses = pushProcessValue('Hello world', getVal1)
// proceses()


// How does listeners work? 

function addLister(cb) {
    const listener = [];

    listener.push(cb);
    const showFn = (data) => {
        console.log('Listeners :: ', listener);
        let [fn] = listener;
        return fn(data);
    }
    return {
        listenerList: showFn
    }
}
const addListeners = addLister((data) => console.log('Hello', data));
// addListeners.listenerList('John')






