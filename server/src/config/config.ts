export default () => ({
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  PORT: process.env.MYSQLPORT,
  USERNAME: process.env.DBUSERNAME,
  PASSWORD: process.env.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
});
