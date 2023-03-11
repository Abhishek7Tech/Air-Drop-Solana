const { transferSOLTokens } = require("./account.middlewares");

const express = require("express");
const cors = require("cors");
const path = require("path");

// console.log("KEY",dotenv, process.env.REACT_APP_PORT);

const PORT = process.env.REACT_APP_PORT || 3001;
const URL = process.env.REACT_APP_ORIGIN

const app = express();
app.use(
  cors({
    origin: URL,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../", "build")));
app.get("/acc/:id/:token", transferSOLTokens);

// app.get("/min",mint);

// app.get("/transfer",transferTOkens);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log("LISTENING TO YOU", PORT);
});
