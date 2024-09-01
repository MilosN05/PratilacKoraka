let server = io("https://pratilackoraka.onrender.com")

let taster = document.querySelector("button")
let body = document.querySelector("body")
let merenje = true
let predjenoKilometara = []
let lang1 = 0
let lang2 = 0
let prvoIzvrsenje = 0
let predjeniKoraci = 0




taster.addEventListener("click", ()=> {
    navigator.geolocation.getCurrentPosition(primanjeLokacije1)
    console.log(lang1, lang2)
    
    
    
    setTimeout(() => {
        server.emit("obavljanjeGF")
        prvoIzvrsenje = 1
    }, 1000);
    
    if (prvoIzvrsenje == 1) {
    setInterval(() => {
        server.emit("obavljanjeGF")
    }, 11000);
    
    
}
})


server.on("izvrsenje", ()=> {
    
    izvrsenje()
})



// izvrsenje()




function primanjeLokacije1(lokacija) {
    let {coords} = lokacija

    lang1 = coords.latitude
    lang2 = coords.longitude

    console.log(lang1, lang2)
    } /////U PRIMANJE LOKACIJA NASTAJE PROBLEM

function primanjeLokacije2(lokacija) {

    console.log("test")
    const {coords} = lokacija    
    predjenoKilometara.push(distanceInKmBetweenEarthCoordinates(coords.latitude, coords.longitude, lang1, lang2)) 
    console.log(predjenoKilometara)
}

function stepeniURadijane(stepen) {
    return stepen/180*Math.PI
}


function izvrsenje() {
    
    
    setTimeout(() => {
        
        navigator.geolocation.getCurrentPosition(primanjeLokacije2)
        
    }, 10000);
    setinterval(() => {
        merenje = false
        sumaPredjenihKm = 0
        for (let i =0; i<predjenoKilometara.length; i++) {
            sumaPredjenihKm += predjenoKilometara[i]
           
        }
        predjeniKoraci += (sumaPredjenihKm *1000)*1.7

        if (document.querySelector("h1")) {
            body.removeChild(deteHTML)
            

    }
        const deteHTML = document.createElement("h1")
        deteHTML.textContent = predjeniKoraci

        body.appendChild(deteHTML)
        
        
    }, 20000);

}


function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = stepeniURadijane(lat2-lat1);
    var dLon = stepeniURadijane(lon2-lon1);
  
    lat1 = stepeniURadijane(lat1);
    lat2 = stepeniURadijane(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }

//KORISTI POSTMAN
//TRAZI INFORMACIJU OD API ZA KILOMETRAZU
//AZURIRAJ LOKACIJU NA KOJOJ SE NALAZIS
//https://stackoverflow.com/questions/69654737/axios-get-request-format-for-third-party-api