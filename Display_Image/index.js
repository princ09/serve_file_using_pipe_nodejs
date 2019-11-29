const path = require("path");
const http = require("http");
const fs = require("fs");
var url = require("url");
const request = require("request");

var dir = path.join(__dirname, "files");
/**
 * Change Directory name to get json structure of that Directory
 */
const hname = "localhost";
const pname = 7506;
var mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  js: "application/javascript"
};
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  var reqpath = req.url.toString().split("?")[0];
  var q = url.parse(req.url, true);
  var qdata = q.query;
  if (req.method == "GET") {
    if (req.url == "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<html><body><h1>server connection sucess:)</h1></body></html>");
    } else if (req.url === "/favicon.ico") {
      res.writeHead(200, {
        "Content-Type": "image/x-icon"
      });
      res.end();
      return;
    } else {
      console.log(qdata.file);
      /*request(
              "http://localhost:8692/files/?file=" + qdata.file,
              (error, response, body) => {
                if (error) {
                  // If there is an error, tell the user
                  res.send("An erorr occured");
                }
                // Otherwise do something with the API data and send a response
                else {
                  res.send(body);
                }
              }
            );*/

      http
        .get("http://localhost:8692/files/?file=" + qdata.file, resp => {
          let data = "";
          var contentType = resp.headers["content-type"];
          res.setHeader("Content-Type", contentType);

          resp.pipe(res);

          // If an error occured, return the error to the user
        })
        .on("error", err => {
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>server connection ERROR , Request for File</h1></body></html>"
          );
        });
    }
  } else {
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>server connection sucess , Request for File</h1></body></html>"
    );
  }
});

server.listen(pname, hname, () => {
  console.log(`server running at http://${hname}:${pname}`);
});
