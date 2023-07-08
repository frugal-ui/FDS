#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_js_1 = __importDefault(require("./init.js"));
const argv = process.argv;
const command = argv[2];
const args = argv.splice(3);
switch (command) {
    case 'init': {
        (0, init_js_1.default)();
        break;
    }
    default: console.error(`"${command}" not found`);
}
