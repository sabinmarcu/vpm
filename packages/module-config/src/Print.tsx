import React, { useMemo } from 'react';
import { Box, Text, Color } from 'ink';

import {
  CONFIG_DIR_PATH,
  TOOL_CONFIG_PATH,
  getConfig,
} from './config';

const Tab: React.FC<{size?: number}> = ({ size = 2 }) => (
  <Text>
    {new Array(size).fill(' ').join('')}
  </Text>
);

export const Print = () => {
  const config = useMemo(
    () => getConfig(),
    [],
  );
  return (
    <>
      {/* Config Section */}
      <Text bold underline>NVPM Config:</Text>
      <Box>
        <Tab />
        <Color blue>Path: </Color>
        <Text>
          {CONFIG_DIR_PATH}
        </Text>
      </Box>
      <Box>
        <Tab />
        <Color blue>File: </Color>
        <Text>
          {TOOL_CONFIG_PATH}
        </Text>
      </Box>
      <Tab />

      {/* Paths Section */}
      <Box justifyContent="space-between">
        <Box>
          <Text bold underline>Paths: </Text>
        </Box>
        <Box>
          <Color green>available</Color>
        </Box>
      </Box>
      <Box>
        <Tab />
        <Color blue>VIM Config Path: </Color>
        <Text>{config.paths.vim}</Text>
      </Box>

      {/* Github Information */}
      <Box justifyContent="space-between">
        <Box>
          <Text bold underline>Github: </Text>
        </Box>
        <Box>
          {!config.github
            ? <Color red>unavailable</Color>
            : <Color green>available</Color>}
        </Box>
      </Box>
      {config.github
        && (
          <Box>
            <Tab />
            <Color blue>Auth Token: </Color>
            <Text>Check</Text>
          </Box>
        )}
    </>
  );
};

export default Print;
