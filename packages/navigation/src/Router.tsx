import React, { useState, useEffect, createElement } from 'react';

import {
  getModules,
} from '@nvpm/config';
import {
  RoutesType,
  RouterContext,
  useRouterProvider,
} from './useNavigation';
import { Route } from './Route';

export const Router: React.FC<{
  start?: string,
  root: string
}> = ({
  start = 'root',
  root,
  children,
}) => {
  const contextData = useRouterProvider(start);
  const [routes, setRoutes] = useState<RoutesType>({});
  useEffect(
    () => {
      getModules(root).then((r) => setRoutes(r));
    },
    [],
  );
  return (
    <RouterContext.Provider value={{ ...contextData, routes }}>
      {children}
      {
        (Object.entries(routes))
          .filter(([, { root: r }]) => r)
          .map(([r, { component }]) => (
            <Route key={r} route={r}>
              {createElement(component)}
            </Route>
          ))
      }
    </RouterContext.Provider>
  );
};

export default Router;
