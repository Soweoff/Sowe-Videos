"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items.slice();
    }
    clear() {
        this.items = [];
    }
}
exports.default = Repository;
