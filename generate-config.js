#!/usr/bin/env node
const fs = require('fs');
const serialize = require('serialize-javascript');

const config = Object.assign(
  {},
  ...Object.entries(process.env)
    .filter(
      ([k]) => k.startsWith('REACT_APP_')
    )
    .map(([k, v]) => ({ [k.startsWith('_') ? k.slice(1) : k]: v }))
);

const configjs = `window.env = ${serialize(config)};`;

fs.writeFileSync('build/config.js', configjs);
