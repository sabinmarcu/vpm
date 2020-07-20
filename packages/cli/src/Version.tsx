import React from 'react';
import path from 'path';
import fs from 'fs';
import { Text } from 'ink';

const pkg = JSON.parse(
  fs.readFileSync(
    path.resolve(
      __dirname,
      '../package.json',
    ),
    'utf-8',
  ),
);

export const Version = () => (
  <>
    <Text>
      {`CLI (${pkg.name})`}
    </Text>
    <Text>
      {`Version: ${pkg.version}`}
    </Text>
    <Text>   </Text>
  </>
);

export default Version;
