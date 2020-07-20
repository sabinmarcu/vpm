import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

export type RoutesType = { [key: string]: { root: boolean, component: React.FC, name: string } };
export type RouterContextType = {
  route: string,
  go: (to: string) => void,
  back: () => void,
  history: string[],
  routes: RoutesType,
};

export const RouterContext = createContext<RouterContextType>({
  route: 'root',
  // eslint-disable-next-line no-console
  go: (route: string) => { console.error('Not Routing: ', route); },
  // eslint-disable-next-line no-console
  back: () => { console.error('No Routing: <<back>>'); },
  history: ['root'],
  routes: {},
});

export const useRouter = () => useContext(RouterContext);
export const useRoute = (route: string): boolean => {
  const router = useRouter();
  return !!router.route.match(route);
};
export const useSetRoute = () => useRouter().go;
export const useBackRoute = () => useRouter().back;
export const useRoutes = () => useRouter().routes;
export const useRouterProvider = (start: string) => {
  const [history, setHistory] = useState<string[]>([start]);
  const route = useMemo(
    () => history[history.length - 1],
    [history],
  );
  const go = useCallback(
    (r: string) => setHistory((h) => [...h, r]),
    [setHistory],
  );
  const back = useCallback(
    () => {
      if (history.length > 1) {
        setHistory(history.filter((_, idx) => idx < history.length - 1));
      } else {
        setHistory(['root']);
      }
    },
    [history, setHistory],
  );
  return {
    route,
    go,
    back,
    history,
  };
};
