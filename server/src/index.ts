import express from 'express';
import PrettyError from 'pretty-error';
import expressServer from './lib/expressServer';

// #region constants
const dev = process.env.NODE_ENV !== 'production';
const pe = new PrettyError();
// #endregion

(() => {
  try {
    pe.start();
    const app = express();
    expressServer(app, dev);
  } catch (error) {
    console.log('server error: ', error);
  }
})();
