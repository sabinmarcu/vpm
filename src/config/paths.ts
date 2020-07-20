import path from 'path';
import fs from 'fs';
import os from 'os';

const genPath = (...args: string[]): string | undefined => {
  const p = path.resolve(...args);
  if (fs.existsSync(p)) {
    return p;
  }
  return undefined;
};

export class VimPathError extends Error {}

export const HOME_PATH = process.env.HOME || os.homedir();
export const VIM_PATH = process.env.VIM_PATH || genPath(HOME_PATH, '.vim');
export const PACKS_PATH = VIM_PATH && genPath(VIM_PATH, 'pack');
