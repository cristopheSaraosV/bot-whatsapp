"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var health_controller_1 = require("../app/controllers/health.controller");
var healthRoutes = (0, express_1.Router)();
healthRoutes.get('/health', function (req, res) { return new health_controller_1.HealthController(req, res).sendMensaje(); });
exports.default = healthRoutes;
