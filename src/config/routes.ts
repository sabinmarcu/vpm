import { Home } from '../screens/Home';
import { Packages } from '../screens/Packages';

export const routes = {
  root: { component: Home, root: true },
  packages: { component: Packages, root: true },
  'packages:a': { component: Packages, root: false },
  'packages:b': { component: Packages, root: false },
};

export type RouteType = keyof typeof routes;
export type RouteSetterType = (route: RouteType) => void;
export type RouterContextType = {
  route: RouteType,
  go: RouteSetterType,
  back: () => void,
  history: RouteType[],
};
