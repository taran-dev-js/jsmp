type Task = {[key: string]: number};

type ItemQueue = {
    data: Task;
    priority: number;
    callback: Function
}

export class Queue {
    public drain: Function = null;
    private readonly worker: Function;
    private workers: number = 0;
    private tasks: Array<ItemQueue> = [];
    private started: boolean = false;

    constructor(worker: (data: Task, callback: Function) => void) {
        this.worker = worker;
    }

    public push(data: Array<Task>, priority: number, callback: Function) {
        if (!this.started) {
            this.started = true;
        }
        if (data.length == 0) {
            // call drain immediately if there are no tasks
            return setImmediate(() => {
                if (this.drain) this.drain();
            });
        }
        this.each(data,(task: Task) => {
            let item: ItemQueue = {
                data: task,
                priority: priority,
                callback: callback
            };
            this.tasks.splice(this.binarySearch(this.tasks, item) + 1, 0, item);

            setImmediate(() => {
                this.process()
            });
        });
    };

    private compareTasks(a: ItemQueue, b: ItemQueue) {
        return a.priority - b.priority
    };

    private each(arr: Array<Task>, iterator: Function) {
        for (let i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    private binarySearch(sequence: Array<ItemQueue>, item: ItemQueue) {
        let beg = -1;
        let end = sequence.length - 1;
        while (beg < end) {
            let mid = beg + ((end - beg + 1) >>> 1);
            if (this.compareTasks(item, sequence[mid]) >= 0) {
                beg = mid;
            } else {
                end = mid - 1;
            }
        }
        return beg;
    }

    private process() {
        if (this.workers < this.tasks.length) {
            const task = this.tasks.shift();
            this.workers += 1;

            const only_once = () => {
                let called = false;
                return (...arg: any) => {
                    if (called) throw new Error("Callback was already called.");
                    called = true;
                    this.workers -= 1;
                    if (task.callback) {
                        task.callback.apply(task, arg);
                    }
                    if (this.drain && this.tasks.length + this.workers === 0) {
                        this.drain();
                    }
                    this.process();
                }
            };
            const cb = only_once();

            this.worker(task.data, cb);
        }
    }
}
