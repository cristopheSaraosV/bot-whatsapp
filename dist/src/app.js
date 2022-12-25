"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var server_1 = __importDefault(require("./server/server"));
function main() {
    try {
        server_1.default.listen(environment_1.APPLICATION.PORT);
        console.log("Server listening on port http://localhost:".concat(environment_1.APPLICATION.PORT));
    }
    catch (error) {
        console.log(error);
    }
}
main();
