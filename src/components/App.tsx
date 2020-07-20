import React from 'react';
import { useInput } from 'ink';
import { Banner } from './Banner';
import { Router } from './Router';
import { RouterDebug } from './RouterDebug';

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
      <Router start="packages:a">
        <Banner />
        {process.env.DEV && process.env.DEV === 'true'
          && <RouterDebug />}
      </Router>
    </>
  );
};

export default App;
