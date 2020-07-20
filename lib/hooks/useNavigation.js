"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouterProvider = exports.useBackRoute = exports.useSetRoute = exports.useRoute = exports.useRouter = exports.RouterContext = void 0;
var react_1 = require("react");
exports.RouterContext = react_1.createContext({
    route: 'root',
    // eslint-disable-next-line no-console
    go: function (route) { console.error('Not Routing: ', route); },
    // eslint-disable-next-line no-console
    back: function () { console.error('No Routing: <<back>>'); },
    history: ['root'],
});
exports.useRouter = function () { return react_1.useContext(exports.RouterContext); };
exports.useRoute = function (route) {
    var router = exports.useRouter();
    return !!router.route.match(route);
};
exports.useSetRoute = function () { return exports.useRouter().go; };
exports.useBackRoute = function () { return exports.useRouter().back; };
exports.useRouterProvider = function (start) {
    var _a = react_1.useState([start]), history = _a[0], setHistory = _a[1];
    var route = react_1.useMemo(function () { return history[history.length - 1]; }, [history]);
    var go = react_1.useCallback(function (r) { return setHistory(function (h) { return __spreadArrays(h, [r]); }); }, [setHistory]);
    var back = react_1.useCallback(function () {
        if (history.length > 1) {
            setHistory(history.filter(function (_, idx) { return idx < history.length - 1; }));
        }
        else {
            setHistory(['root']);
        }
    }, [history, setHistory]);
    return {
        route: route,
        go: go,
        back: back,
        history: history,
    };
};
//# sourceMappingURL=useNavigation.js.map