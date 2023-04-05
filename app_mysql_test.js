const express = require("express");
const mysql = require("./query_test.js");

const app = express();

app.listen(3000, () => {
  console.log("Sever stared. port 3000");
});

app.get("/", async (req, res) => {
  //const customers = await mysql.query("sellerList");
  res.send("hi! 유성민 바보.");
});

app.get("/api/test", async (req, res) => {
  const customers = await mysql.query("customerList");
  res.send(customers);
});
