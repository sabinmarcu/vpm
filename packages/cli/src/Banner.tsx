import fs from 'fs';
import path from 'path';

import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

const pkg = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../package.json'),
    'utf-8',
  ),
);

export const Banner = () => (
  <Gradient name="mind">
    <BigText text={pkg.name.substr(1, pkg.name.indexOf('/') - 1)} />
  </Gradient>
);

export default Banner;
