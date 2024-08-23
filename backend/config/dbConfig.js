require('dotenv').config(); // Make sure to install the dotenv package

// console.log(process.env);

module.exports = {
    HOST: process.env.DB_HOST || "db-001-daiict-1.h.aivencloud.com",
    USER: process.env.DB_USER || "avnadmin",
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME || "defaultdb",
    dialect: "postgres",
    port: +process.env.DB_PORT || 11230,
    pool: {
      max: +process.env.DB_POOL_MAX || 5,
      min: +process.env.DB_POOL_MIN || 0,
      acquire: +process.env.DB_POOL_ACQUIRE || 30000,
      idle: +process.env.DB_POOL_IDLE || 10000,
    },
};
