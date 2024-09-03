let express = require("express")
let http = require("http")
let socketIO = require("socket.io")
const path = require("path")


let app = express()
let {Server} = socketIO
let server = http.createServer(app)
let kSKanal = new Server(server)



app.use(express.static("./korakoMetarHTML"))

app.get("/dodUredjenja/slike/smartwatch.png", (zahtev, odgovor)=> {
    odgovor.sendFile(path.join(__dirname, "/dodUredjenja", "/slike", "/smartwatch.png"))
})

kSKanal.on("connection", (korisnik)=> {
    korisnik.on("obavljanjeGF", ()=> {
        console.log("zapocinjanje pracenja")
        korisnik.emit("izvrsenje")
    })

    korisnik.on("pracenjeKM", (podaci)=> {
        console.log(podaci)
    })
})



server.listen(5000)