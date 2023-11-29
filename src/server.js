const { app } = require("./app");
const sequelize = require("./database/database");
const { config } = require("dotenv");

config();

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );

  throw reason;
});

process.on("uncaughtException", (error) => {
  console.log(`App exiting due to an uncaught exception: ${error}`);
  process.exit(1);
});

(async function () {
  try {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server is running in: http://localhost:${PORT}`);
    });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    const signals = ["SIGTERM", "SIGINT", "SIGQUIT"];

    for (const signal of signals) {
      process.on(signal, async () => {
        try {
          await sequelize.close();
          console.log(`App exited with success`);
          process.exit(0);
        } catch (error) {
          console.log(`App exited with error: ${error}`);
          process.exit(1);
        }
      });
    }
  } catch (error) {
    console.log(`App exited with error: ${error}`);
    process.exit(1);
  }
})();
