const { json } = require("express");
const { transferSOL } = require("./AccountInfo");
const dotenv = require("dotenv").config();
console.log(dotenv);
const TOKEN = process.env.REACT_APP_TOEKN;
const ACCOUNT = process.env.REACT_APP_ACCOUNT_ADD;

const transferSOLTokens = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json({ message: "Check id! and Try again" });
  }
  try {
    const data = await transferSOL(id);
    return res.status(200).json({ message: "CREATED", data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!", err });
  }
};

module.exports = {
  transferSOLTokens,
  // mint
  // transferTOkens
};
