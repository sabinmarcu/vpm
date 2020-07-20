import React from 'react';
import { Box, Text } from 'ink';
import { useRouter } from '../hooks/useNavigation';

export const RouterDebug = () => {
  const { route, history } = useRouter();
  return (
    <>
      <Box>
        <Text>Route: </Text>
        <Text>{route}</Text>
      </Box>
      <Box>
        <Text>Route History:</Text>
        <Text>{history.join(' > ')}</Text>
      </Box>
    </>
  );
};

export default RouterDebug;
