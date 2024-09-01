let express = require("express")
let http = require("http")
let socketIO = require("socket.io")


let app = express()
let {Server} = socketIO
let server = http.createServer(app)
let kSKanal = new Server(server)



app.use(express.static("./korakoMetarHTML"))

kSKanal.on("connection", (korisnik)=> {
    korisnik.on("obavljanjeGF", ()=> {
        console.log("zapocinjanje pracenja")
        korisnik.emit("izvrsenje")
    })
})



server.listen(5000)