console.log('wired up!')
console.log($)
var locationInput = document.querySelector('.location-input')
var locEl = document.querySelector('.current-loc')
var tempEl = document.querySelector('.current-temp')


var retrieveWeather = function(weatherData){

   var currentTemp = weatherData.currently.temperature

   console.log(currentTemp)
   tempEl.innerHTML = currentTemp


}
// weather api

var weatherCollector = function(latitude, longitude){
   $.getJSON('https://api.darksky.net/forecast/07a204e2beaccc63b19f6304b4ef51c6/' + latitude + ','+ longitude +'?callback=?').then(retrieveWeather)
}

var retrieveLocation = function(locationData){

   var currentLat = locationData.results[0].geometry.location.lat
   var currentLng = locationData.results[0].geometry.location.lng

   weatherCollector(currentLat, currentLng)
}

var positionCollector = function(city , state){

   locEl.innerHTML = city + ', ' + state.toUpperCase()

   $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+city + ',+' + state + '&key=AIzaSyBywIjBdlwwmhp3_uPMX7LoZKkTh2CSflU').then(retrieveLocation)

}


// var locationCollector(locInput){
//
//    $.getJSON
//
//
// }
var hashChanger = function(evt){
   if(evt.keyCode === 13){
      window.location.hash = locationInput.value

   }




}

var hashController = function(){
   console.log(window.location.hash)
   var hashStr = window.location.hash.slice(1)
   var hashSplit = hashStr.split(' ')
   var hashCity = hashSplit[0]
   var hashState = hashSplit[1]
   if(hashStr.length === 0){
      positionCollector('Charleston', 'SC')

   }
      positionCollector(hashCity, hashState)
}
locationInput.addEventListener('keydown' , hashChanger )
window.addEventListener('hashchange', hashController)
hashController()
