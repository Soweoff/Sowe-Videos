"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class Editor extends Person_1.default {
    expertise;
    constructor(expertise, email) {
        super(email);
        this.expertise = expertise;
    }
    getExpertise() {
        return this.expertise;
    }
    setExpertie(expertise) {
        this.expertise = expertise;
    }
}
exports.default = Editor;
