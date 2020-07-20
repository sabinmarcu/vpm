"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var react_1 = __importStar(require("react"));
var routes_1 = require("../config/routes");
var useNavigation_1 = require("../hooks/useNavigation");
var Route_1 = require("./Route");
exports.Router = function (_a) {
    var _b = _a.start, start = _b === void 0 ? 'root' : _b, children = _a.children;
    var contextData = useNavigation_1.useRouterProvider(start);
    return (react_1.default.createElement(useNavigation_1.RouterContext.Provider, { value: contextData },
        children,
        Object.keys(routes_1.routes)
            .filter(function (r) { return routes_1.routes[r].root; })
            .map(function (r) { return (react_1.default.createElement(Route_1.Route, { key: r, route: r }, react_1.createElement(routes_1.routes[r].component))); })));
};
exports.default = exports.Router;
//# sourceMappingURL=Router.js.map