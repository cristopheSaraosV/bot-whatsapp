"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
var environment_1 = require("../../../environment");
var controller_1 = require("./controller");
var axios_1 = __importDefault(require("axios"));
var WhatsAppController = /** @class */ (function (_super) {
    __extends(WhatsAppController, _super);
    function WhatsAppController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.token = environment_1.APPLICATION.TOKEN;
        return _this;
    }
    WhatsAppController.prototype.health = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.response.status(200).json({
                        rest: 'Health'
                    })];
            });
        });
    };
    WhatsAppController.prototype.sendMensaje = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, phone_number_id, from, msg_body;
            return __generator(this, function (_a) {
                body = this.request.body;
                // Check the Incoming webhook message
                console.log(JSON.stringify(this.request.body, null, 2));
                // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
                if (this.request.body.object) {
                    if (body.entry &&
                        body.entry[0].changes &&
                        body.entry[0].changes[0] &&
                        body.entry[0].changes[0].value.messages &&
                        body.entry[0].changes[0].value.messages[0]) {
                        phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
                        from = body.entry[0].changes[0].value.messages[0].from;
                        msg_body = body.entry[0].changes[0].value.messages[0].text.body;
                        (0, axios_1.default)({
                            method: "POST",
                            url: "https://graph.facebook.com/v12.0/" +
                                phone_number_id +
                                "/messages?access_token=" +
                                this.token,
                            data: {
                                messaging_product: "whatsapp",
                                to: from,
                                text: { body: "Ack: " + msg_body },
                            },
                            headers: { "Content-Type": "application/json" },
                        });
                    }
                    this.response.sendStatus(200);
                }
                else {
                    // Return a '404 Not Found' if event is not from a WhatsApp API
                    this.response.sendStatus(404);
                }
                return [2 /*return*/];
            });
        });
    };
    WhatsAppController.prototype.verifyToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var verify_token, mode, token, challenge;
            return __generator(this, function (_a) {
                verify_token = process.env.VERIFY_TOKEN;
                mode = this.request.query["hub.mode"];
                token = this.request.query["hub.verify_token"];
                challenge = this.request.query["hub.challenge"];
                // Check if a token and mode were sent
                if (mode && token) {
                    // Check the mode and token sent are correct
                    if (mode === "subscribe" && token === verify_token) {
                        // Respond with 200 OK and challenge token from the request
                        console.log("WEBHOOK_VERIFIED");
                        this.response.status(200).send(challenge);
                    }
                    else {
                        // Responds with '403 Forbidden' if verify tokens do not match
                        this.response.sendStatus(403);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    return WhatsAppController;
}(controller_1.Controller));
exports.WhatsAppController = WhatsAppController;
