/// <reference types="react" />
import { RouteType, RouterContextType } from '../config/routes';
export declare const RouterContext: import("react").Context<RouterContextType>;
export declare const useRouter: () => RouterContextType;
export declare const useRoute: (route: RouteType) => boolean;
export declare const useSetRoute: () => import("../config/routes").RouteSetterType;
export declare const useBackRoute: () => () => void;
export declare const useRouterProvider: (start: RouteType) => {
    route: "root" | "packages" | "packages:a" | "packages:b";
    go: (r: RouteType) => void;
    back: () => void;
    history: ("root" | "packages" | "packages:a" | "packages:b")[];
};
//# sourceMappingURL=useNavigation.d.ts.map