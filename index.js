// /**Raspunsurile vor fi furnizate prin intermediul urmatorului formular: https://docs.google.com/forms/d/e/1FAIpQLSdfUkNycj_cA7w88OxkMpPn0yDv6PiJ6kFuW_-wmUNFq-qecg/viewform


// /**
//  * Exercitiul nr. 1
//  */

// [5p] Creati un API HTTP (JSON-RPC) care sa furnizeze glume despre Chuck Norris.
//API-ul va raspunde la cereri GET. Numarul de glume oferite va fi parametrizabil.
//La fiecare cerere va fi furnizata o gluma aleatoare. Tipul continutului raspunsului va fi JSON.
//Glumele vor fi preluate dintr-o baza de date ce va fi creata manual.

// http://www.icndb.com/the-jokes-2/

// /**
//  * Exercitiul nr. 2
//  */
// [5p] Creati un API HTTP (JSON-RPC) care sa furnizeze link-uri la imagini cu catei. API-ul va raspunde la cereri GET. Numarul de imagini oferite va fi parametrizabil.
// La fiecare cerere va fi 
//furnizata o imagine aleatoare. Tipul continutului raspunsului va fi JSON. Link-urile vor fi preluate dintr-o baza de date ce va fi creata manual.
// https://www.google.com/search?q=shiba&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj77O2Ssq_iAhWR6qQKHUBmAaMQ_AUIDigB&biw=1920&bih=944 */

    
const http = require("http"); 
const port = 8080;
const fs = require("fs");
const serve = require("./module/static");

const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;

const server = http.createServer((req, res) => {
    if (req.url.indexOf("/file../") != -1) {
        serve.staticServe(req, res, "public");
      }
    if(req.url === '/'){
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        var myReadStream = fs.createReadStream(
          __dirname + "/public/index.html",
          "utf8"
        );
        myReadStream.pipe(res);
    }
    if(req.url === '/get-joke'){
        console.log(req.body);
        var post;
        var body = "";
        req.on("data", (data) => {
            body = JSON.parse(data);
            fetch("http://api.icndb.com/jokes/random/"+body.jokes+"/?firstName="+body.surname+"&amp;lastName="+body.name)
            .then(resp=>{
                return resp.json();
            })
            .then(resp=>{
                console.log(resp)
                res.end(JSON.stringify(resp));
            })
        })
    }
        
})

server.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
