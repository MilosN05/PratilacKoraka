let server = io("https://pratilackoraka.onrender.com")

let taster = document.querySelector("button")
let body = document.querySelector("body")
let div = document.querySelector("div")
let sat = document.getElementById("vreme")


let vremenskaKlasa = new Date()
let opcije = {enableHighAccuracy: true, timeout: 5000, maximumAge:0 
}
sat.innerHTML = `${vremenskaKlasa.getUTCHours() + 2}:${vremenskaKlasa.getUTCMinutes()}`



let predjenoKilometara = []
let lang1 = 0
let lang2 = 0
let prvoIzvrsenje = 0
let predjeniKoraci = 0




taster.addEventListener("click", ()=> {
    taster.hidden = "true"
    kreiranjeElemenata("h2", "0 K")


    setInterval(() => {
        sat.innerHTML = `${vremenskaKlasa.getUTCHours() + 2}:${vremenskaKlasa.getUTCMinutes}`
        navigator.geolocation.getCurrentPosition(primanjeLokacije1, greska, opcije)
        server.emit("obavljanjeGF")
    }, 5000);

    

})


server.on("izvrsenje", ()=> {
    
    // if (prvoIzvrsenje == 1) {
    //     while (predjenoKilometara.includes("cekanje")) {
    //         setInterval(() => {
    //             if (!predjenoKilometara.includes("cekanje")) {
    //                 izvrsenje()
    //             }
    //         }, 2000);
            
    //     }
    // }

    // else {
    //     izvrsenje()
    // }

    izvrsenje()
    
})




///DOBIJANJE LOKACIJE

function primanjeLokacije1(lokacija) {
    let {coords} = lokacija

    lang1 = coords.latitude
    lang2 = coords.longitude

    console.log(lang1, lang2)
    if (document.querySelector("h3")) {
        document.querySelector("h3").innerHTML = `${lang1} ${lang2}`
    }
    else {
        kreiranjeElemenata("h3", `${lang1} ${lang2}`)
    }
    
    } /////U PRIMANJE LOKACIJA NASTAJE PROBLEM

function primanjeLokacije2(lokacija) {

    console.log("test")
    const {coords} = lokacija    
    if (predjenoKilometara.length != 0) {
        predjenoKilometara.pop()
    }
    predjenoKilometara.push(distanceInKmBetweenEarthCoordinates(coords.latitude, coords.longitude, lang1, lang2)) 
    console.log(predjenoKilometara)
    
}

function stepeniURadijane(stepen) {
    return stepen/180*Math.PI
}




///glavna FUNKCIJE

function izvrsenje() {
    
    prvoIzvrsenje = 1
    setTimeout(() => {
        
        navigator.geolocation.getCurrentPosition(primanjeLokacije2, greska, opcije)
        
    }, 4000);
    setInterval(() => {           
        
        predjeniKoraci += (predjenoKilometara[0] *1000)*1.7

        document.querySelector("h2").innerHTML = `${Math.floor(predjeniKoraci)} K`
        
        
    }, 4500);


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





  //POMOCNA FUNKCIJA

function kreiranjeElemenata(tag, sadrzaj) {
    
    let element = document.createElement(tag)
    element.textContent = sadrzaj
    div.appendChild(element)
}

//najnebitnija funkcija, koja nicemu ne sluzi, ali sam primoran da je koristim ...
function greska(eror) {
    console.warn(`ERROR(${err.code}): ${err.message}`);

}

//KORISTI POSTMAN
//TRAZI INFORMACIJU OD API ZA KILOMETRAZU
//AZURIRAJ LOKACIJU NA KOJOJ SE NALAZIS
//https://stackoverflow.com/questions/69654737/axios-get-request-format-for-third-party-api