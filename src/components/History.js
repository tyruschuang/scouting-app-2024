export default class History {
    constructor() {
        this.history = [];
    }
    push(path) {
        this.history.push(path);
    }
    pop() {
        this.history.pop();
    }
    get() {
        return this.history;
    }
    getPrevious() {
        return this.history[this.history.length - 2];
    }
    clear() {
        this.history = [];
    }
}