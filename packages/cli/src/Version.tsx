import React from 'react';
import path from 'path';
import fs from 'fs';
import { Box, Text, Color } from 'ink';

const pkg = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../package.json',
    ),
    'utf-8',
  ),
);

const data = [
  ['CLI', pkg.name],
  ['Version', pkg.version],
];
const largestLength = data.reduce(
  (prev, [k]) => (
    prev < k.length
      ? k.length
      : prev
  ), 0,
);

export const Version = () => (
  <>
    {data.map(([name, value]) => (
      <Box key={name}>
        <Color blue>
          {name}
          {new Array(largestLength - name.length + 1).fill(' ').join('')}
        </Color>
        <Text>
          {`: ${value}`}
        </Text>
      </Box>
    ))}
    <Text>   </Text>
  </>
);

export default Version;
