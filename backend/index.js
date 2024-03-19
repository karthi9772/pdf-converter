const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const path = require("path");
const port = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const UrlToPdf = async (url, name) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");
  const filename = `${name}.pdf`;
  const pdf = await page.pdf({
    path: filename,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });
  await browser.close();
};

app.post("/get_pdf", (req, res) => {
  let { url, name } = req.body;
  UrlToPdf(url, name);
});
app.get("/", (req, res) => {
  res.send("Hello server");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
