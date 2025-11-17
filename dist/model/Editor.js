"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class Editor extends Person_1.default {
    expertise;
    constructor(name, email, expertise, telefone = 0) {
        super(name, email, telefone);
        this.expertise = expertise;
    }
    getExpertise() {
        return this.expertise;
    }
    setExpertise(expertise) {
        this.expertise = expertise;
    }
    showInfo() {
        console.log(`Editor: ${this.name}, Especialidade: ${this.expertise}, Email: ${this.email}`);
    }
}
exports.default = Editor;
