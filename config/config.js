// Setup server side configurations for variables
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'Your_Secret_key',
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb+srv://SMLukiwya:anying@cluster0-mjnd7.gcp.mongodb.net/local_library?retryWrites=true'
}

export default config;
