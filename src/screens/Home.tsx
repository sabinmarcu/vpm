import React, { useEffect } from 'react';
import Select from 'ink-select-input';
import { useOptions } from '../hooks/useOptions';
import { useSetRoute } from '../hooks/useNavigation';

const options = {
  packages: 'Packages Management',
};

export const Home = () => {
  const opts = useOptions(options, true);
  const go = useSetRoute();
  useEffect(
    () => {
      if (opts.isDirty && opts.selection in options) {
        go(opts.selection);
      }
    },
    [opts.selection, opts.isDirty, go],
  );
  return (
    <Select
      items={opts.options}
      onSelect={opts.select}
    />
  );
};

export default Home;
