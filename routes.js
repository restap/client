
// di image dikasih value

$("#origin").submit(function(event) {
  event.preventDefault()
  let origin = $("#origin-routes").val()
  let destination = $(".address").val() || "hacktiv8"
  $.get(`http://localhost:3000/zomato/${origin}/to/${destination}`)
  .done(data => {
   let distance = data.legs[0].distance.text
   let duration = data.legs[0].duration
   let origin = data.legs[0].start_location
   let destination = data.legs[0].end_location
    initMapRoutes(origin, destination)
    console.log(distance),
    console.log(duration)
  })
  .fail(err => {
    console.log(err)
  })


  })

function initMapRoutes(origin, destination) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  options = {
    zoom: 12,
    center: origin,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map'), options);

  directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, origin , destination) {
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }