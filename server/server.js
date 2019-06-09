import config from '../config/config';
import app from './express';
import mongoose from 'mongoose';


//Database Connection URL
const url = config.mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(url);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
});
