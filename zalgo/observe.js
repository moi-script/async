import EventEmitter from 'events';

const event = new EventEmitter();

function delay() {
    return new Promise((res) => {
        setTimeout(() => res('Hello world') , 3000)
    })
}

event.on('async', delay => {
    delay().then(val => console.log(val))
})

event.emit('async', delay);



