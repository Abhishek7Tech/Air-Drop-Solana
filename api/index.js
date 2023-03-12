const { transferSOLTokens } = require("./account.middlewares");

const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
// console.log("KEY",dotenv, process.env.REACT_APP_PORT);

const PORT = 8080 || 3001;

const app = express();
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://air-drop-sol-api.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] =
        "https://air-drop-sol.netlify.app/";
    },
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
