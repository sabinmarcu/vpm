"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterDebug = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var useNavigation_1 = require("../hooks/useNavigation");
exports.RouterDebug = function () {
    var _a = useNavigation_1.useRouter(), route = _a.route, history = _a.history;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Box, null,
            react_1.default.createElement(ink_1.Text, null, "Route: "),
            react_1.default.createElement(ink_1.Text, null, route)),
        react_1.default.createElement(ink_1.Box, null,
            react_1.default.createElement(ink_1.Text, null, "Route History:"),
            react_1.default.createElement(ink_1.Text, null, history.join(' > ')))));
};
exports.default = exports.RouterDebug;
//# sourceMappingURL=RouterDebug.js.map