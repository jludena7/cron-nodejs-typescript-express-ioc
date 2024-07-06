require("dotenv").config({ path: ".env" });

export const ENV = {
  DATABASE_URI: process.env.DATABASE_URI as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
};
