import config from '../config/config';
import app from './express';
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;

//Database Connection URL
const url = config.mongoUri;

mongoose.connect(url);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${url}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
});
