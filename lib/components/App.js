"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var Banner_1 = require("./Banner");
var Router_1 = require("./Router");
var RouterDebug_1 = require("./RouterDebug");
exports.App = function () {
    ink_1.useInput(function (_, key) {
        if (key.escape) {
            process.exit(0);
        }
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Router_1.Router, { start: "packages:a" },
            react_1.default.createElement(Banner_1.Banner, null),
            process.env.DEV && process.env.DEV === 'true'
                && react_1.default.createElement(RouterDebug_1.RouterDebug, null))));
};
exports.default = exports.App;
//# sourceMappingURL=App.js.map