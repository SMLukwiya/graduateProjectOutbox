import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import template from '../template';
import devBundle from './devBundle';//comment out for production.

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {staticRouter} from 'react-router-dom';
import MainRouter from '../client/MainRouter';
import {SheetsRegistry} from 'react-jss';
import {JssProvider} from 'react-jss';
import {createGenerateClassName} from '@material-ui/core/styles';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

//Import Routes functions
import userRoutes from './routes/user.route';
import authRoutes from './routes/authenticate.routes';
import buyHouseRoutes from './routes/buy.route';
import rentHouseRoutes from './routes/rent.route';

const CURRENT_WORKING_DIR = process.cwd()
const app = express();

//comment out before building for production
devBundle.compile(app);

//Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', buyHouseRoutes);
app.use('/', rentHouseRoutes);

app.get('*', (req, res) => {
  res.status(200).send(template())
})

// // ///** Server Side Rendering ***///
//   const theme = createMuiTheme({
//     palette: {
//       primary: {
//       light: '#757de8',
//       main: '#3f51b5',
//       dark: '#002984',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff79b0',
//       main: '#ff4081',
//       dark: '#c60055',
//       contrastText: '#000',
//     },
//       openTitle: indigo['400'],
//       protectedTitle: pink['400'],
//       type: 'light'
//     }
//   })
//
//   const sheetsRegistry = new SheetsRegistry();
//   const generateClassName = createGenerateClassName();
//   const context = {}
//
//   const html = ReactDOMServer.renderToString(
//      <StaticRouter location={req.url} context={context}>
//         <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
//            <ThemeProvider theme={theme} sheetsManager={new Map()}>
//             <MainRouter/>
//            </ThemeProvider>
//         </JssProvider>
//      </StaticRouter>
//   )
//
//   if (context.url) {
//     return res.redirect(303, context.url)
//   }
//
//   const css = sheetsRegistry.toString();
//
//   res.status(200).send(template(html))
// })

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error": err.name + ": " + err.message});
  }
})

export default app;
