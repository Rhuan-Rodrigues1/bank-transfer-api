const { app } = require("./app");
const { config } = require("dotenv");

config();

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );
});

process.on("uncaughtException", (error) => {
  console.log(`App exiting due to an uncaught exception: ${error}`);
  process.exit(1);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running in: http://localhost:${PORT}`);
});
