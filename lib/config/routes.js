"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var Home_1 = require("../screens/Home");
var Packages_1 = require("../screens/Packages");
exports.routes = {
    root: { component: Home_1.Home, root: true },
    packages: { component: Packages_1.Packages, root: true },
    'packages:a': { component: Packages_1.Packages, root: false },
    'packages:b': { component: Packages_1.Packages, root: false },
};
//# sourceMappingURL=routes.js.map