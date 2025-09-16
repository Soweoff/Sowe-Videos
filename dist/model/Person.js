"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    email;
    telefone;
    constructor(email) {
        this.email = email;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getTelefone() {
        return this.telefone;
    }
    setTelefone(telefone) {
        this.telefone = telefone;
    }
}
exports.default = Person;
