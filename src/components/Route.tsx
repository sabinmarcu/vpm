import React from 'react';
import { RouteType } from '../config/routes';
import { useRoute } from '../hooks/useNavigation';

export const Route: React.FC<{ route: RouteType }> = ({
  children,
  route,
}) => {
  const shouldRender = useRoute(route);
  if (shouldRender) {
    return <>{children}</>;
  }
  return null;
};

export default Route;
