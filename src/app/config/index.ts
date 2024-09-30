import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  mongo_uri: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_accessToken_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_accessToken_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refreshToken_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwt_refreshToken_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};
