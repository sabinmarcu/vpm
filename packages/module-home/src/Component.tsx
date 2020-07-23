import React, {
  useEffect, useMemo,
} from 'react';
import Select from 'ink-select-input';
import { useOptions } from '@nvpm/utils';
import { useSetRoute, useRoutes } from '@nvpm/navigation';

export const Home = () => {
  const routes = useRoutes();
  const options = useMemo(
    () => Object.entries(routes)
      .map(([key, route]: [string, any]) => ({ ...route, key }))
      .filter(({ name, root }) => !name.startsWith('@') && root)
      .sort(({ order: oa }, { order: ob }) => Math.sign((oa || 0) - (ob || 0)))
      .reduce((prev, { key, name }) => ({ ...prev, [key]: name }), {}),
    [routes],
  );
  const opts = useOptions(options, true);
  const go = useSetRoute();
  useEffect(
    () => {
      if (opts.isDirty && opts.selection in options) {
        go(opts.selection as string);
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

export const RootScreen = Home;
export default Home;
