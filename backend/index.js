const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const path = require("path");
const port = 4000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const UrlToPdf = async (url, name) => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  // const website_url = 'https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/';

  // Open URL in current page
  await page.goto(url, { waitUntil: "networkidle0" });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const filepath = path.join(__dirname, `${name}.pdf`);
  const pdf = await page.pdf({
    path: filepath,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Close the browser instance
  await browser.close();
};

app.post("/get_text", (req, res) => {
  let { url, name } = req.body;
  UrlToPdf(url, name);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
