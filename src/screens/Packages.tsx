import React, { useEffect } from 'react';
import Select from 'ink-select-input';
import { Text } from 'ink';
import { useOptions } from '../hooks/useOptions';
import { Route } from '../components/Route';
import { useSetRoute } from '../hooks/useNavigation';

const options = {
  'packages:a': 'View Packages',
  'packages:b': 'Add Package',
};
export const Packages = () => {
  const opts = useOptions(options);
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
    <>
      <Select
        items={opts.options}
        onSelect={opts.select}
      />
      <Route route="packages:a">
        <Text>A</Text>
      </Route>
      <Route route="packages:b">
        <Text>B</Text>
      </Route>
    </>
  );
};

export default Packages;
