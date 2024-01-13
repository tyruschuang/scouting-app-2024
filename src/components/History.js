export default class MatchScoutData {
    constructor() {
        this.data = [];
    }
    push(path) {
        this.data.push(path);
    }
    pop() {
        this.data.pop();
    }
    get() {
        return this.data;
    }
    getPrevious() {
        return this.data[this.data.length - 2];
    }
    clear() {
        this.data = [];
    }
}