const { transferSOLTokens } = require("./account.middlewares");
const cors = require("cors");
const express = require("express");
const path = require("path");
// console.log("KEY",dotenv, process.env.REACT_APP_PORT);

const PORT = 8080 || 3001;

const app = express();

app.use(cors({
  origin:"https://air-drop-sol.netlify.app/"
}))

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
