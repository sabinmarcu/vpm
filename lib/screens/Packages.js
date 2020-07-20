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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packages = void 0;
var react_1 = __importStar(require("react"));
var ink_select_input_1 = __importDefault(require("ink-select-input"));
var ink_1 = require("ink");
var useOptions_1 = require("../hooks/useOptions");
var Route_1 = require("../components/Route");
var useNavigation_1 = require("../hooks/useNavigation");
var options = {
    'packages:a': 'View Packages',
    'packages:b': 'Add Package',
};
exports.Packages = function () {
    var opts = useOptions_1.useOptions(options);
    var go = useNavigation_1.useSetRoute();
    react_1.useEffect(function () {
        if (opts.isDirty && opts.selection in options) {
            go(opts.selection);
        }
    }, [opts.selection, opts.isDirty, go]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_select_input_1.default, { items: opts.options, onSelect: opts.select }),
        react_1.default.createElement(Route_1.Route, { route: "packages:a" },
            react_1.default.createElement(ink_1.Text, null, "A")),
        react_1.default.createElement(Route_1.Route, { route: "packages:b" },
            react_1.default.createElement(ink_1.Text, null, "B"))));
};
exports.default = exports.Packages;
//# sourceMappingURL=Packages.js.map