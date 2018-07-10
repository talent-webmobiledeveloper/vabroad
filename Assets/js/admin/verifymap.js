﻿var mainmap,s_country,s_state,s_city,s_addr;function initialize(e){mainmap=initializeMap("map_canvas")}function initializeMap(e){var t={center:new google.maps.LatLng(51.5,-.12),zoom:5,mapTypeId:google.maps.MapTypeId.ROADMAP};return new google.maps.Map(document.getElementById(e),t)}function getLocationDetails(e,t){var a="https://maps.googleapis.com/maps/api/geocode/json?latlng="+e+","+t+"&sensor=false";$.ajax({url:a,success:function(a){if(a.results.length>0){for(var o="false",n=0;n<a.results.length;n++)if(locationDetails=a.results[n].formatted_address.toLowerCase(),console.log(a.results[n].formatted_address),parseInt(locationDetails.indexOf(s_country.toLowerCase()))>=0){o="true";break}"false"==o?showMsg("Incorrect Address"):$.ajax({url:"/apiadmin.aspx/update_property_location",type:"POST",contentType:"application/json; charset=utf-8",dataType:"json",data:'{ "propid": '+$("#selected_id").val()+', "lat":'+e+', "lg":'+t+', "addr":"'+s_addr+'"}'}).done(function(e,t){$("#verifymap").fadeOut(),console.log("success",e.d),angular.element($("#ngmainapp")).scope().update(),angular.element($("#ngmainapp")).scope().$apply()}).fail(function(e,t){console.log("fail",e),showMsg("Verification of Address Failed")})}else console.log("No location available for provided details."),showMsg("No location available for provided details.")},failure:function(e){console.log("get location error"+e.d)}})}$(document).ready(function(){$("#proptable").on("click",".action",function(){var e=$(this).parent().parent().find(".city").text(),t=$(this).parent().parent().find(".state").text(),a=$(this).parent().parent().find(".country").text(),o=$(this).parent().parent().find(".address input").val(),n=$(this).parent().parent().find("input[type=hidden]").val();$("#verifymap .city").text(e),$("#verifymap .state").text(t),$("#verifymap .country").text(a),$("#verifymap .address input").val(o),$("#selected_id").val(n),$("#verifymap").fadeIn(),initialize(null)}),$(".btnclose").click(function(){var e=$(this).attr("data-target");$("#"+e).fadeOut()}),$(".verifyaddr").click(function(){var e=$("#verifymap .city").text(),t=$("#verifymap .state").text(),a=$("#verifymap .country").text();s_country=a,s_state=t,s_city=e;var o=$("#verifymap .address input").val();s_addr=o,GetLocation(o+", "+e+", "+t+", "+a)})});var markers=[];function setMarkers(e,t,a){clearMarkers();var o=new google.maps.LatLng(t,a),n=new google.maps.Marker({position:o,map:e});return markers.push(n),n}function clearMarkers(){for(var e=0;e<markers.length;e++)markers[e].setMap(null);markers=[]}function GetLocation(e){console.log(e),(new google.maps.Geocoder).geocode({address:e},function(e,t){if(t==google.maps.GeocoderStatus.OK){var a=e[0].geometry.location.lat(),o=e[0].geometry.location.lng(),n=setMarkers(mainmap,a,o).getPosition();mainmap.setCenter(n),getLocationDetails(a,o)}else console.log(e),showMsg("Verification of Address Failed")})}function addAllmarkers(e){var t=new google.maps.LatLngBounds;for(i=0;i<gmarkers.length;i++){var a=gmarkers[i],o=new google.maps.LatLng(a.lat,a.lng),n=new google.maps.Marker({position:o,map:e,title:a.title});t.extend(n.position),function(e,t){google.maps.event.addListener(e,"click",function(e){window.open(t.URL)})}(n,a)}google.maps.event.addListener(e,"zoom_changed",function(){zoomChangeBoundsListener=google.maps.event.addListener(e,"bounds_changed",function(e){this.getZoom()>9&&1==this.initialZoom&&(this.setZoom(9),this.initialZoom=!1),google.maps.event.removeListener(zoomChangeBoundsListener)})}),e.initialZoom=!0,e.fitBounds(t)}function showMsg(e){$("#msgbox .modal_content").text(e),$("#msgbox").fadeIn()}