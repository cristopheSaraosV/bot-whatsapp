"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var health_routes_1 = __importDefault(require("./health.routes"));
var whatsapp_routes_1 = __importDefault(require("./whatsapp.routes"));
var appRoutes = (0, express_1.default)();
var base = '/api/v1';
appRoutes.use(base, health_routes_1.default);
appRoutes.use(base, whatsapp_routes_1.default);
exports.default = appRoutes;
