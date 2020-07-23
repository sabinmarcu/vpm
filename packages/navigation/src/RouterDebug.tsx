import React from 'react';
import { Box, Text, Color } from 'ink';
import { useRouter } from './useNavigation';

export const RouterDebug = () => {
  const { route, history } = useRouter();
  return (
    <>
      <Box>
        <Color red>Router:        </Color>
        <Text>{route}</Text>
      </Box>
      <Box>
        <Color red>Route History: </Color>
        <Text>{history.join(' > ')}</Text>
      </Box>
      <Text>   </Text>
    </>
  );
};

export default RouterDebug;
