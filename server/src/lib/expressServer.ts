import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import axios from 'axios';
import { subWeeks } from 'date-fns';

// #region constants
const port = process.env.PORT || 8082;
const host = process.env.SERVER_HOST || 'localhost';
const TURNSTILE_SITE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_SECRET_KEYS = Object.freeze({
  ALWAYS_SUCCESS: '1x0000000000000000000000000000000AA',
  ALWAYS_FAIL: '',
});
// #endregion

const expressServer = (app: express.Application, isDev = false) => {
  if (!app) {
    console.log('Server application instance is undefined');
    throw new Error('Server application instance is undefined');
  }

  app.set('port', port);
  app.set('ipAdress', host);

  app.use(bodyParser.json()); // for JSON bodies
  app.use(bodyParser.urlencoded({ extended: true })); // for URL-encoded bodies

  app.post('/allwaysSuccess', async (req: Request, res: Response) => {
    // tests with
    // curl 'http:localhost:8082/allwaysSuccess' --data 'token=fakeornothingastoken'
    try {
      const token = req?.body?.token ?? 'NO_TOKEN';
      const ip = req.ip;
      const body = {
        secret: TURNSTILE_SECRET_KEYS.ALWAYS_SUCCESS,
        response: token,
        remoteip: ip,
      };
      const response = await axios.post(TURNSTILE_SITE_VERIFY_URL, body);

      console.info('POST Request Called for /allwaysSuccess endpoint : ', {
        requestBody: body,
        response: {
          status: response.status,
          data: response.data,
        },
      });
      res.json({ status: response.status, data: response.data });
    } catch (error) {
      console.error('ERROR: ', { error });
      res.json('POST Request failed');
    }
  });

  app.post('/allwaysFail', async (req: Request, res: Response) => {
    console.info('POST Request Called for /allwaysFail endpoint');
    try {
      //
    } catch (error) {
      console.error('ERROR: ', { error });
    }
    res.json('POST Request Called');
  });

  app.post('/challenge', async (req: Request, res: Response) => {
    console.info('POST Request Called for /challenge endpoint');
    try {
      //
    } catch (error) {
      console.error('ERROR: ', { error });
    }
    res.json('POST Request Called');
  });

  app.get('*', (req: Request, res: Response) => {
    res.json({ info: 'pas de get sur ce server' });
  });

  /* eslint-disable no-console */
  // @ts-ignore
  app.listen(port, host, () =>
    console.info(`
        =====================================================
        -> Server 🏃 (running) on ${chalk.green(host)}:${chalk.green(`${port}`)}
        =====================================================
      `),
  );
  /* eslint-enable no-console */

  return app;
};

export default expressServer;
