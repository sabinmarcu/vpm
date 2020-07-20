import React from 'react';
import { useRoute } from './useNavigation';

export const Route: React.FC<{ route: string }> = ({
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
