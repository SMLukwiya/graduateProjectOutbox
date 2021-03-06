import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import Template from '../template';

//Import Routes functions
import userRoutes from './routes/user.route';
import authRoutes from './routes/authenticate.routes';
import houseRoutes from './routes/house.route';
import orderRoutes from './routes/order.route';

//modules for server side rendering
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

// import devBundle from './devBundle';//comment out for production.
const CURRENT_WORKING_DIR = process.cwd()
const app = express();

//comment out before building for production
// devBundle.compile(app);

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
app.use('/', houseRoutes);
app.use('/', orderRoutes)

app.get('*', (req, res) => {
  res.status(200).send(Template())
})

// app.get('*', (req, res) => {
//   const sheets = new ServerStyleSheets();//from ServerStyleSheets
//   const theme = createMuiTheme({
//     palette: {
//       primary: {
//         light: '#757de8',
//         main: '#3f51b5',
//         dark: '#002984',
//         contrastText: '#fff'
//       },
//       secondary: {
//         light: '#ff79b0',
//         main: '#ff4081',
//         dark: '#c60055',
//         contrastText: '#000'
//       },
//       openTitle: indigo['400'],
//       protectedTitle: pink['400'],
//       type: 'light'
//     }
//   });
//   const generateClassName = createGenerateClassName()
//   const context = {}
//   const html = ReactDOMServer.renderToString(
//     <StaticRouter location={req.url} context={context}>
//       <JssProvider registry={sheets} generateClassName={generateClassName}>
//         <ThemeProvider theme={theme} sheetsManager={new Map()}>
//           <MainRouter/>
//         </ThemeProvider>
//       </JssProvider>
//     </StaticRouter>
//   )
//   if (context.url) {
//     return res.redirect(303, context.url)
//   }
//   const css = sheets.toString()
//   res.status(200).send(Template({html:html, css:css}))
// })

//Catch unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error": err.name + ": " + err.message});
  }
})

export default app;
