"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackages = exports.initPacks = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var paths_1 = require("./paths");
exports.initPacks = function () {
    if (paths_1.PACKS_PATH && !fs_1.default.existsSync(paths_1.PACKS_PATH)) {
        fs_1.default.mkdirSync(paths_1.PACKS_PATH);
    }
};
exports.getPackages = function () {
    if (!paths_1.PACKS_PATH) {
        throw new paths_1.VimPathError();
    }
    var packs = paths_1.PACKS_PATH;
    exports.initPacks();
    return fs_1.default.readdirSync(packs)
        .filter(function (file) { return fs_1.default.statSync(path_1.default.resolve(packs, file)).isDirectory(); });
};
//# sourceMappingURL=plugins.js.map