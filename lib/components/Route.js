"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var react_1 = __importDefault(require("react"));
var useNavigation_1 = require("../hooks/useNavigation");
exports.Route = function (_a) {
    var children = _a.children, route = _a.route;
    var shouldRender = useNavigation_1.useRoute(route);
    if (shouldRender) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return null;
};
exports.default = exports.Route;
//# sourceMappingURL=Route.js.map