"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKS_PATH = exports.VIM_PATH = exports.HOME_PATH = exports.VimPathError = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
var genPath = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var p = path_1.default.resolve.apply(path_1.default, args);
    if (fs_1.default.existsSync(p)) {
        return p;
    }
    return undefined;
};
var VimPathError = /** @class */ (function (_super) {
    __extends(VimPathError, _super);
    function VimPathError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VimPathError;
}(Error));
exports.VimPathError = VimPathError;
exports.HOME_PATH = process.env.HOME || os_1.default.homedir();
exports.VIM_PATH = process.env.VIM_PATH || genPath(exports.HOME_PATH, '.vim');
exports.PACKS_PATH = exports.VIM_PATH && genPath(exports.VIM_PATH, 'pack');
//# sourceMappingURL=paths.js.map