import React, { createElement } from 'react';

import {
  routes,
  RouteType,
} from '../config/routes';
import { RouterContext, useRouterProvider } from '../hooks/useNavigation';
import { Route } from './Route';

export const Router: React.FC<{ start?: RouteType }> = ({ start = 'root', children }) => {
  const contextData = useRouterProvider(start);
  return (
    <RouterContext.Provider value={contextData}>
      {children}
      {
        (Object.keys(routes) as RouteType[])
          .filter((r: RouteType) => routes[r].root)
          .map((r: RouteType) => (
            <Route key={r} route={r}>
              {createElement(routes[r].component)}
            </Route>
          ))
      }
    </RouterContext.Provider>
  );
};

export default Router;
