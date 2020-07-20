"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var react_1 = __importDefault(require("react"));
var ink_gradient_1 = __importDefault(require("ink-gradient"));
var ink_big_text_1 = __importDefault(require("ink-big-text"));
var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../package.json'), 'utf-8'));
exports.Banner = function () { return (react_1.default.createElement(ink_gradient_1.default, { name: "mind" },
    react_1.default.createElement(ink_big_text_1.default, { text: pkg.name.split('-').join('\n') }))); };
exports.default = exports.Banner;
//# sourceMappingURL=Banner.js.map