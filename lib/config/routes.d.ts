/// <reference types="react" />
export declare const routes: {
    root: {
        component: () => JSX.Element;
        root: boolean;
    };
    packages: {
        component: () => JSX.Element;
        root: boolean;
    };
    'packages:a': {
        component: () => JSX.Element;
        root: boolean;
    };
    'packages:b': {
        component: () => JSX.Element;
        root: boolean;
    };
};
export declare type RouteType = keyof typeof routes;
export declare type RouteSetterType = (route: RouteType) => void;
export declare type RouterContextType = {
    route: RouteType;
    go: RouteSetterType;
    back: () => void;
    history: RouteType[];
};
//# sourceMappingURL=routes.d.ts.map