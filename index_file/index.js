const path = require("path");
const http = require("http");
const fs = require("fs");
var url = require("url");
var dir = path.join(__dirname, "files");
/**
 * Change Directory name to get json structure of that Directory
 */
const hname = "localhost";
const pname = 8692;
var hash = {};
hash[7506] = "7506.jpg";
hash[79729] = "79729.jpg";
hash[82914] = "82914.jpg";
hash[98194] = "98194.jpg";
hash[869298] = "869298.jpg";
hash["doc"] = "doc.pdf";


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
    console.log(q);
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
            var file_name = hash[qdata.file];

            console.log(file_name);
            var file = path.join(dir, file_name);
            var type = mime[path.extname(file_name).slice(1)] || "text/plain";
            var s = fs.createReadStream(file);
            console.log(file);
            console.log(type);
            s.on("open", function () {
                res.setHeader("Content-Type", type);
                s.pipe(res);
            });
            s.on("error", function () {
                res.setHeader("Content-Type", "text/plain");
                res.statusCode = 404;
                res.end("Not found");
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