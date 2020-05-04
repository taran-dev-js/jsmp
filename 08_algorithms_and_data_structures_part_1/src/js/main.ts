import {Queue} from './Queue'

const count = 10;
let time = performance.now();
const q = new Queue((task, callback) => {
    console.log('Run ' + task.priority);
    callback();
});

for (let i = 0; i <= count; i++) {
    const priority = Math.floor(Math.random() * count);
    q.push([{priority: priority}], priority, () => {
        console.log('Finished processing task', priority);
    });
}

// assign a callback
q.drain = () => {
    console.log('All items have been processed');
    time = performance.now() - time;
    console.log('Spent time =', Math.floor(time), 'ms');
};
