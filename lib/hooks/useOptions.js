"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOptions = exports.ACTIONS = void 0;
var react_1 = require("react");
var useNavigation_1 = require("./useNavigation");
var ACTIONS;
(function (ACTIONS) {
    ACTIONS[ACTIONS["EXIT"] = 0] = "EXIT";
    ACTIONS[ACTIONS["BACK"] = 1] = "BACK";
})(ACTIONS = exports.ACTIONS || (exports.ACTIONS = {}));
function useOptions(options, isDefault) {
    var back = useNavigation_1.useBackRoute();
    var allOptions = react_1.useMemo(function () {
        var baseOptions = Object.entries(options)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return ({
                label: value,
                value: key,
            });
        });
        var extraOption = isDefault
            ? {
                label: 'Exit',
                value: ACTIONS.EXIT,
            } : {
            label: 'Back',
            value: ACTIONS.BACK,
        };
        return __spreadArrays(baseOptions, [extraOption]);
    }, [options, isDefault]);
    var _a = react_1.useState(allOptions[0].value), selection = _a[0], setSelection = _a[1];
    var _b = react_1.useState(false), isDirty = _b[0], setIsDirty = _b[1];
    var select = react_1.useCallback(function (_a) {
        var value = _a.value;
        if (value in options || value in ACTIONS) {
            setSelection(value);
            if (!isDirty) {
                setIsDirty(true);
            }
        }
    }, [setSelection, options, setIsDirty]);
    react_1.useEffect(function () {
        if (isDefault && selection === ACTIONS.EXIT) {
            process.exit(0);
        }
        if (selection === ACTIONS.BACK) {
            setIsDirty(false);
            setSelection(allOptions[0].value);
            back();
        }
    }, [selection, isDefault, back, allOptions, setIsDirty, setSelection]);
    return {
        options: allOptions,
        selection: selection,
        isDirty: isDirty,
        select: select,
    };
}
exports.useOptions = useOptions;
//# sourceMappingURL=useOptions.js.map