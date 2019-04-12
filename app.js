const finalhandler = require("finalhandler");
const http = require("http");
const Router = require("router");
const Fs = require("fs");

const router = Router();
const hostname = "127.0.0.1";
const port = 3000;

//create the server
const server = http.createServer((req, res) => {
  router(req, res, finalhandler(req, res));
});

//listen on the port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//router => main page
router.get("/", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  Fs.readdir("./Assets", (err, files) => {
    if (err) {
      res.end("page Not found");
    } else res.end(JSON.stringify(files));
  });
});

//router => /filename.jpg
router.get(`/:filename`, function(req, res) {
  Fs.readFile(`./Assets/${req.params.filename}`, (err, file) => {
    if (err) {
      res.end("page Not found");
    } else res.end(file);
  });
});
