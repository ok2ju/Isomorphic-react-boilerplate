import isDev from 'isdev';
import http from 'http';
import express from 'express';
import serveStatic from 'serve-static';

import { config, dir } from './config';
import { logServerConfig } from './logger';

import { hotMiddleware } from './middleware/hot';
import { isoMiddleware } from './middleware/iso';

const app = express();
const server = http.createServer(app);

// use ejs template engine on express
app.set('view engine', 'ejs');
app.set('views', dir.views);

// loading the hot-middleware
if (isDev) app.use(hotMiddleware);

app
  .use('/buid', serveStatic(dir.build))
  .use('/static', serveStatic(dir.static))
  .use(isoMiddleware);

server.listen(config.port, config.host, err => logServerConfig(err));
