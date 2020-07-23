const { parse } = require('./parse');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const { readJSON, log } = require('./utils');

const ROOT = path.resolve(__dirname, '../');
const PACKAGES = path.resolve(ROOT, 'packages');
const refreshTsConfigs = async (
  module, 
  data
) => {
  log('Attempting Refresh');
  if (!module) {
    log('No module supplied, refreshing all!');
    const modules = await parse();
    return Promise.all(
      Object.entries(modules)
      .map(([m, d]) => refreshTsConfigs(m, d))
    );
  }
  if (!data) {
    log('No data supplied, refreshing data');
    const modules = await parse();
    if (!module in modules) {
      throw new Error('Module not found!')
    }
    return refreshTsConfigs(module, modules[module]);
  }
  log('Refreshing %s module', module);
  const {
    location,
    workspaceDependencies
  } = data;
  const allModules = fs.readdirSync(PACKAGES)
    .map(it => {
      const p = path.resolve(PACKAGES, it);
      return { 
        path: path.resolve(p, "tsconfig.json"), 
        name: readJSON(path.resolve(p, "package.json")).name 
      }
    })
    .reduce(
      (prev, { path: p, name }) => ({
        ...prev, 
        [name]: p
      }), 
      {}
    );
  const template = readJSON(path.resolve(__dirname, '../configs/tsconfig.package.json'));
  const baseTsConfig = path.resolve(__dirname, '../tsconfig.json');
  if (!fs.existsSync(baseTsConfig)) {
    fs.writeFileSync(
      baseTsConfig,
      fs.readFileSync(
        path.resolve(__dirname, '../configs/tsconfig.root.json'),
        'utf-8'
      )
    )
  }
  const modulePath = path.resolve(ROOT, location);
  const paths = workspaceDependencies.map(it => 
    path.relative(
      modulePath, 
      allModules[it]
    )
  );
  const tsConfigPath = path.resolve(modulePath, 'tsconfig.json');
  const typesPath = path.resolve(modulePath, 'types');
  const include = []
  if (fs.existsSync(typesPath) && fs.statSync(typesPath).isDirectory()) {
    glob.sync(`${typesPath}/**/*.d.ts`)
      .forEach(file => include.push(path.relative(modulePath, file)));
  }
  fs.writeFileSync(
    tsConfigPath,
    JSON.stringify({
      ...template,
      extends: path.relative(modulePath, baseTsConfig),
      include: [
        ...template.include,
        ...include.filter(Boolean),
      ],
      references: paths.map(it => ({ path: it }))
    })
  );
}

module.exports = refreshTsConfigs;
module.exports.refresh = refreshTsConfigs;

if (!module.parent) {
  if (process.argv[2]) {
    refreshTsConfigs(process.argv[2]);
  } else {
    refreshTsConfigs();
  }
}