import { getConfigHome } from 'platform-folders';
import mkdirp from 'mkdirp';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { validate } from 'jsonschema';

// eslint-disable-next-line import/extensions
import { Schema } from '../types/schema';

const schema = require('../config/schema.json');

export const CONFIG_DIR_PATH = path.join(getConfigHome(), 'nvpm');
if (!fs.existsSync(CONFIG_DIR_PATH)) {
  mkdirp.sync(CONFIG_DIR_PATH);
}

export const TOOL_CONFIG_PATH = path.join(CONFIG_DIR_PATH, 'config.json');
const initConfig = () => {
  if (fs.existsSync(TOOL_CONFIG_PATH)) {
    fs.unlinkSync(TOOL_CONFIG_PATH);
  }
  fs.writeFileSync(TOOL_CONFIG_PATH, JSON.stringify({
    paths: {
      vim: process.env.VIM_HOME || path.resolve((process.env.HOME || os.homedir()), '.vim'),
    },
  }));
};

if (!fs.existsSync(TOOL_CONFIG_PATH)) { initConfig(); }

export const getConfig = (retry?: boolean): Schema => {
  try {
    const config = JSON.parse(fs.readFileSync(TOOL_CONFIG_PATH, 'utf-8')) as Schema;
    if (!validate(config, schema)) {
      throw new Error('Not a valid config!');
    }
    return config;
  } catch (e) {
    if (retry) {
      throw new Error(e);
    }
    initConfig();
    return getConfig(true);
  }
};

export default CONFIG_DIR_PATH;
