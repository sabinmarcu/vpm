import fs from 'fs';
import path from 'path';

import { PACKS_PATH } from './paths';

export const initPacks = () => {
  if (PACKS_PATH && !fs.existsSync(PACKS_PATH)) {
    fs.mkdirSync(PACKS_PATH);
  }
};

export const getPackages = (): string[] => {
  const packs = (PACKS_PATH as string);
  initPacks();
  return fs.readdirSync(packs)
    .filter((file) => fs.statSync(path.resolve(packs, file)).isDirectory());
};
