  var map, infoWindow,pos,latitude1,longitude1,restaurent_data;
  
  function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 14

        });
        infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude, 
              lng: position.coords.longitude
            };
           
            infoWindow.setPosition(pos);
            infoWindow.setContent('You Are Here ');
            infoWindow.open(map);
            map.setCenter(pos);
            getdata(pos);
         }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                       'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    
function getdata(ghj){
    
    $.ajax({
            type: "POST",
            url: "/responsed",
            data : ghj,
            success : function(data){
                mapall(data);
            },
            error:function(jqXHR, textStatus, errorThrown) {
                alert("HII n==="+ errorThrown);
            }
         
      });
};


function mapall(data){
                  
              var infowindow =  new google.maps.InfoWindow({});
              var marker, count;
              for (count = 0; count < data.nearby_restaurants.length; count++) {
                   
                    marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.nearby_restaurants[count].restaurant.location['latitude'],data.nearby_restaurants[count].restaurant.location['longitude']),
                    map: map,
                    title: data.nearby_restaurants[count].restaurant['name']
                });
              google.maps.event.addListener(marker, 'click', (function (marker, count) {
                    return function () {
                      
               infowindow.open(map, marker);
                       
                       //after google distance
                      // compltete for google distance
                       var obj1 = JSON.stringify(data.nearby_restaurants[count].restaurant.R.res_id);
                       call_restaurent(data.nearby_restaurants[count].restaurant);
                      // scrap(data.nearby_restaurants[count].restaurant.menu_url);
                       

                       // var distance =call_distance(data.nearby_restaurants[count].restaurant.location['latitude'],data.nearby_restaurants[count].restaurant.location['longitude']);
                       // console.log("i am in call ");
                      infowindow.setContent(
                            data.nearby_restaurants[count].restaurant['name']
                      );
                    }
                  })(marker, count));
              
            }
}

function call_restaurent(data) {

    var myWindow = window.open("", "", "width=800, height=700");
    var content=('<html><head><title>'+data.name+'</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body><div class="container"><div class="jumbotron"><h1>'+data.name+'</h1><p>'+data.location.address +'</p><img src='+data.featured_image+' width=100% height=50%></div><div class="row"><div class="col-sm-4"><h3>Type of Restaurent</h3><p>'+data.cuisines+'</p><p>Average cost for two :- '+data.average_cost_for_two+' '+data.currency+'</p></div><div class="col-sm-4"><h3>Ratings</h3><p>User Rating :- '+data.user_rating.aggregate_rating+'</p><p>Rating Type :- '+data.user_rating.rating_text+'</p></div> <div class="col-sm-4"><h3>Check More Details :- </h3><a href='+data.photos_url+' target="_blank">Photos</a><br><a href='+data.menu_url+' target="_blank">Menu</a><br><a href='+data.events_url+' target="_blank">Events</a></div></div></div></body></html>');
    myWindow.document.write(content);
    myWindow.blur();
}

// function scrap(data){

//           document.write(data);
//           // var Scraper = require('image-scraper');
//           // var scraper = new Scraper(data);
 
//           // scraper.scrape(function(image) { 
//           //     image.save();
//           // });



// }

// function call_distance(data,data1) {

//        console.log("i am in call ");
//        var content={
//            destination : data,
//            destination1 : data1,
//            origin : pos.lat,
//            origin1 : pos.lng
//          };
//        $.ajax({
//             type: "POST",
//             url: "/distance",
//             data : content,
//             success : function(data){
//                 return data;
//             },
//             error:function(jqXHR, textStatus, errorThrown) {
//                 alert("HII n==="+ errorThrown);
//             }
         
//       });

// }

// $(function() {
//   $('.pop-up').hide();
//   $('.pop-up').fadeIn(1000);
  
//       $('.close-button').click(function (e) { 

//       $('.pop-up').fadeOut(700);
//       $('#overlay').removeClass('blur-in');
//       $('#overlay').addClass('blur-out');
//       e.stopPropagation();
        
//     });
//  });