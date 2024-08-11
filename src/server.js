const express = require("express");
const path = require("path");
const { createRequestHandler } = require("@remix-run/express");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.all(
  "*",
  createRequestHandler({
    getLoadContext() {
      return {
        mode: process.env.NODE_ENV || "development", 
      };
    },
    mode: process.env.NODE_ENV || "development",
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
