import React from 'react';
import fs from 'fs';
import path from 'path';
import hasbin from 'hasbin';
import { exec } from 'child_process';
import { isNpm, isYarn } from 'is-npm';

export class ModuleError extends Error {}

const execPromised = (cmd: string, cwd: string) => new Promise(
  (accept, reject) => {
    exec(cmd, { cwd }, (error, stdout, stderr) => {
      if (error || stderr !== '') {
        return reject(error || 'STDERR not empty');
      }
      return accept(stdout.split('\n'));
    });
  },
);

const parseRegex = /^[├└]─+\s+/;

export const handlers = {
  npm: async () => execPromised('npm ls -g --depth 0', '/'),
  yarn: async () => execPromised('yarn global list --depth 0', '/'),
};

const getModulesFromPM = async () => {
  const tools: (keyof typeof handlers)[] = (() => {
    if (isNpm) {
      return ['npm'];
    }
    if (isYarn) {
      return ['yarn'];
    }
    return ['npm', 'yarn'];
  })().filter(hasbin.sync);
  if (tools.length === 0) {
    throw new ModuleError('No Package Manager (npm, yarn) found!');
  }
  const packages = (await Promise.all(
    tools.map((it) => handlers[it]()),
  ) as string[][])
    .reduce((prev, it) => [...prev, ...it], []);
  return packages
    .filter((line) => line.match(parseRegex))
    .map((line) => line.replace(parseRegex, ''))
    .map((line) => line.substr(0, line.substr(1).indexOf('@') + 1));
};

const getPackageFromDir = (dir: string): string => {
  const p = path.resolve(dir, 'package.json');
  if (p === '/') {
    throw new ModuleError('No package.json found!');
  }
  if (fs.existsSync(p)) {
    return p;
  }
  return getPackageFromDir(path.dirname(dir));
};
const getModulesFromPackage = async (rootDir: string) => {
  const pkg = JSON.parse(
    fs.readFileSync(
      getPackageFromDir(rootDir),
      'utf-8',
    ),
  );
  return [
    'dependencies',
    'devDependencies',
  ]
    .map((it) => pkg[it] || {})
    .map((obj) => Object.keys(obj))
    .reduce((prev, it) => [...prev, ...it], []);
};

export const getModules = async (rootDir?: string) => {
  const validPackages = (await (rootDir
    ? getModulesFromPackage(rootDir)
    : getModulesFromPM()
  ))
    .filter((pkg) => pkg.match(/^@?nvpm[/-]module-/))
    // eslint-disable-next-line import/no-dynamic-require,global-require
    .map((pkg) => ({ ...require(pkg), pkg }))
    .filter((pkg) => !!pkg.routes && !!pkg.RootScreen);
  return validPackages.reduce(
    (
      prev,
      {
        routes: r,
        name,
        pkg,
        RootScreen,
      }: {
        name: string,
        pkg: string,
        routes: { path: string, root: boolean }[],
        RootScreen: React.FC
      },
    ) => {
      const rootPath = r.find(({ root }) => root)!;
      return ({
        ...prev,
        ...r.reduce(
          (
            p,
            { path: pth, root },
          ) => ({
            ...p,
            [root ? pth : `${rootPath.path}:${pth}`]: { component: RootScreen, root, name: name || pkg },
          }),
          {},
        ),
      });
    },
    {},
  );
};
