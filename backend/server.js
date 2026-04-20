require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/dbInit.js");
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
