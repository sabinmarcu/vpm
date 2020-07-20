import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

import {
  RouteType,
  RouterContextType,
} from '../config/routes';

export const RouterContext = createContext<RouterContextType>({
  route: 'root',
  // eslint-disable-next-line no-console
  go: (route: RouteType) => { console.error('Not Routing: ', route); },
  // eslint-disable-next-line no-console
  back: () => { console.error('No Routing: <<back>>'); },
  history: ['root'],
});

export const useRouter = () => useContext(RouterContext);
export const useRoute = (route: RouteType): boolean => {
  const router = useRouter();
  return !!router.route.match(route);
};
export const useSetRoute = () => useRouter().go;
export const useBackRoute = () => useRouter().back;
export const useRouterProvider = (start: RouteType) => {
  const [history, setHistory] = useState<RouteType[]>([start]);
  const route = useMemo(
    () => history[history.length - 1],
    [history],
  );
  const go = useCallback(
    (r: RouteType) => setHistory((h) => [...h, r]),
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
