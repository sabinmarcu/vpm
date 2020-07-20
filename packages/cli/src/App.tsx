import React from 'react';
import { useInput } from 'ink';
import { Router, RouterDebug } from '@nvpm/navigation';
import { Banner } from './Banner';
import { Version } from './Version';

export const App = () => {
  useInput(
    (_, key) => {
      if (key.escape) {
        process.exit(0);
      }
    },
  );
  return (
    <>
      <Router root={__dirname}>
        <Banner />
        {process.env.DEV && process.env.DEV === 'true' && (
          <>
            <Version />
            <RouterDebug />
          </>
        )}
      </Router>
    </>
  );
};
export default App;
