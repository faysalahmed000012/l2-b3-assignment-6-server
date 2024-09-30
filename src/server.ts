import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.mongo_uri as string);

    server = app.listen(config.port, () => {
      console.log(`app is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// error on unhandled Rejection and uncaught Exception
// process.on("unhandledRejection", () => {
//   console.log(`😈 unhandledRejection is detected , shutting down ...`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on("uncaughtException", () => {
//   console.log(`😈 uncaughtException is detected , shutting down ...`);
//   process.exit(1);
// });
