﻿var current_page=0,site_url="https://www.vacations-abroad.com",propertyid=-1,init_region=!1,init_country=!1,init_state=!1,init_type=!1,init_city=!1,furniture_tag="",submitting=!1;function showmessagebox(t){$("#modalmsg").html(t),$("#msgdlg").show()}function init_basicstepPage(){"-1"!=propertyid&&"0"!=propertyid&&($("#_propname2").val(HtmlDecoder(prop_info.Name2)),$("#_propname").val(HtmlDecoder(prop_info.Name)),$("#_virttour").val(HtmlDecoder(prop_info.VirtualTour)),$("#_propaddr").val(HtmlDecoder(prop_info.Address)),""!=prop_info.IfShowAddress&&null!=prop_info.IfShowAddress&&$("#_propdisplay").val(prop_info.IfShowAddress),$("#_propbedroom").val(prop_info.NumBedrooms),$("#_propbathrooms").val(prop_info.NumBaths),$("#_propsleep").val(prop_info.NumSleeps),""!=prop_info.MinimumNightlyRentalID&&null!=prop_info.MinimumNightlyRentalID&&$("#_propminrental").val(prop_info.MinimumNightlyRentalID),$("#_proptv").val(prop_info.NumTVs),$("#_propcd").val(prop_info.NumCDPlayers),$("#additional_type").val(prop_info.PropertyName)),$("#wzardstep0 .chosen-select").chosen(),changePropertyType()}function refreshListBox(t,e){var r=$("#"+t).val();if(null!=r){var o=window[e];"function"==typeof o&&o(r)}}function changePropertyType(){$("#additional_type").parent().find(".error_msg").remove()}function changeCityEvent(){var t=$("#citylist").val();null!=t&&("0"==t.toString()?($("#additionalcity").show(),$("#additionalcity").addClass("required")):($("#additionalcity").hide(),$("#additionalcity").removeClass("required")))}function SubmitPage(t){var e="#frmstep"+t;submitting?showmessagebox("Now proecessing!!!"):(submitting=!0,$.ajax({type:"POST",url:site_url+"/apihelper/savepropertyinfo.aspx?UserID="+$("#userid").val(),data:$(e).serialize(),success:processSubmitResult,error:function(t){console.log(t),submitting=!1,showmessagebox("Something wrong, please make sure that all fields are filled.")}}))}function processSubmitResult(t){if(console.log(t),submitting=!1,-1!=t.status){if(prop_info=t.propinfo,0==current_page&&"0"==$("#citylist").val().toString()){init_city=!0;var e=$("#statelist").val(),r=city_arr.indexOf(e);city_arr.splice(r,1),city_result_arr.splice(r,1),refreshListBox("statelist","getCityList")}0==current_page&&$("#additional_type").val(prop_info.PropertyName),$("input[name=propid]").val(prop_info.ID),1==current_page?(prop_amenity=t.amenity_list,prop_furniture=$.parseJSON(t.room_furniture)):2==current_page&&(prop_attraction=t.attractions),current_page<3?(switchPage(current_page+1),buttongroup(current_page)):window.location.replace(site_url+"/userowner/listings.aspx?UserID="+prop_info.UserID)}else showmessagebox("Something wrong, Please contact to system administrator.")}function switchPage(t){for(var e=t;e<4;e++)$('div.step[data-target="'+e+'"]').parent().removeClass("done").removeClass("active");for(e=0;e<t;e++)$('div.step[data-target="'+e+'"]').parent().addClass("done").removeClass("active");$("#wzardstep"+current_page).hide(),$("#wzardstep"+t).css({left:300,opacity:0}),$("#wzardstep"+t).show(),$("#wzardstep"+t).animate({opacity:1,left:0},300,function(){}),current_page=parseInt(t),$('div.step[data-target="'+current_page+'"]').parent().addClass("active"),0==t?init_basicstepPage():1==t?Init_DescriptionStepPage():2==t?init_AttractionPage():3==t&&init_RatePage()}function checkCityLocation(){$("#additionalcity").hasClass("required")?geocodeAddress($("#additionalcity").val(),$("#statelist option:selected").text(),$("#countrylist option:selected").text()):SubmitPage(current_page)}function validatePage(t){var e=!0;return $(".error_msg").remove(),$("#frmstep"+t+" input").each(function(){$(this).hasClass("required")&&0==$(this).val().length&&($(this).addClass("error_required"),addErrorField(this,"This field is requried"),e=!1),$(this).hasClass("maxchars")&&$(this).val().length>$(this).attr("data-max")&&($(this).addClass("error_required"),addErrorField(this,"This field length has to be less than "+$(this).attr("data-max")),e=!1)}),e}function addErrorField(t,e){$(t).after("<div class='error_msg'>"+e+"</div>")}function buttongroup(t){0==t?$(".btnprev").addClass("firststep"):$(".btnprev").removeClass("firststep"),3==t?$(".btnnext").val("Finish"):$(".btnnext").val("Next")}String.prototype.replaceAll=function(t,e){return this.replace(new RegExp(t,"g"),e)},$(document).ready(function(){$("#wzardstep"+current_page).show(),$("div.step").click(function(){var t=$(this).attr("data-target");$('div.step[data-target="'+t+'"]').parent().hasClass("done")&&(switchPage(t),buttongroup(current_page))}),$(".btnprev").click(function(){current_page>0&&(switchPage(current_page-1),buttongroup(current_page))}),$(".btnnext").click(function(){0==current_page&&validatePage(current_page)?checkCityLocation():current_page<4&&validatePage(current_page)&&SubmitPage(current_page)}),$("input").keypress(function(){$(this).removeClass("error_required"),$(this).parent().find(".error_msg").remove()}),buttongroup(current_page),$("#propcategory").change(function(){refreshListBox("propcategory","getTypeListbyCategory")}),$("#regionlist").change(function(){refreshListBox("regionlist","getCountryList")}),$("#countrylist").change(function(){refreshListBox("countrylist","getStateList")}),$("#statelist").change(function(){refreshListBox("statelist","getCityList")}),$("#citylist").change(function(){$("#citylist").parent().find(".error_msg").remove(),changeCityEvent()}),$("#propcategory").change(function(){$("#propcategory").parent().find(".error_msg").remove()}),$("#msgclose").click(function(){$("#msgdlg").hide()}),"-1"!=(propertyid=$("#propid").val()).toString()&&(0!=prop_info.RegionID&&(init_region=!0,init_country=!0,init_state=!0,init_city=!0,$("#regionlist").val(prop_info.RegionID)),prop_info.CategoryID>0&&(init_type=!0,$("#propcategory").val(prop_info.CategoryID))),refreshListBox("regionlist","getCountryList"),refreshListBox("propcategory","getTypeListbyCategory");for(var t=all_furniture.length,e=0;e<t;e++)furniture_tag+="<option value='"+all_furniture[e].ID+"'>"+all_furniture[e].FurnitureItem+" </option>";$("#addroom").click(function(){addNewRoom()}),switchPage(current_page),buttongroup(current_page)});var cat_arr=[],calling_id=0,result_arr=[];function getTypeListbyCategory(t){t.toString()==prop_info.CategoryID?$("#additional_type").val(prop_info.PropertyName):$("#additional_type").val(""),$("#additional_type").parent().find(".error_msg").remove(),$("#additional_type").removeClass("error_required")}function processTypeList(t){var e=$.parseJSON(t.d),r=e.id,o=e.data;(cat_arr.push(r),result_arr.push(o),r.toString()==calling_id.toString())&&refreshTypeList(cat_arr.indexOf(r))}function refreshTypeList(t){structureListBox(t,"proptypename",result_arr,["ID","Name"],!0,"Be creative and create a unique property type in the following field"),init_type?($("#proptypename").val(prop_info.TypeID),init_type=!1):$("#proptypename").val($("#proptypename option:first").val()),$("#proptypename").trigger("chosen:updated"),changePropertyType()}function structureListBox(t,e,r,o,i,a){var n=r[t],s="#"+e;$(s).html("");for(var l=0;l<n.length;l++){var p=n[l];$(s).append($("<option></option>").val(p[o[0]]).html(p[o[1]]))}i&&$(s).append($("<option></option>").val("0").html(a))}var country_arr=[],country_calling_id=0,country_result_arr=[];function getCountryList(t){var e=country_arr.indexOf(parseInt(t));-1==e?(country_calling_id=t,$.ajax({type:"POST",url:site_url+"/ajaxhelper.aspx/getcountrylist",data:"{id:"+t+"}",contentType:"application/json; charset=utf-8",dataType:"json",success:processCountryList,failure:function(t){console.log(t.d)}})):refreshCountryList(e)}function processCountryList(t){var e=$.parseJSON(t.d),r=e.id,o=e.data;(country_arr.push(r),country_result_arr.push(o),r.toString()==country_calling_id.toString())&&refreshCountryList(country_arr.indexOf(r))}function refreshCountryList(t){structureListBox(t,"countrylist",country_result_arr,["ID","Country"],!1,""),init_country?($("#countrylist").val(prop_info.CountryID),init_country=!1):$("#countrylist").val($("#countrylist option:first").val()),$("input[name=countryname]").val($("#countrylist option:selected").text()),$("#countrylist").trigger("chosen:updated"),$("#statelist").html(""),$("#citylist").html(""),$("#citylist").trigger("chosen:updated"),refreshListBox("countrylist","getStateList")}var state_arr=[],state_calling_id=0,state_result_arr=[];function getStateList(t){var e=state_arr.indexOf(parseInt(t));-1==e?(state_calling_id=t,$.ajax({type:"POST",url:site_url+"/ajaxhelper.aspx/getstatelist",data:"{id:"+t+"}",contentType:"application/json; charset=utf-8",dataType:"json",success:processStateList,error:function(t){console.log(t.d)}})):refreshStateList(e)}function processStateList(t){var e=$.parseJSON(t.d),r=e.id,o=e.data;(state_arr.push(r),state_result_arr.push(o),r.toString()==state_calling_id.toString())&&refreshStateList(state_arr.indexOf(r))}function refreshStateList(t){structureListBox(t,"statelist",state_result_arr,["ID","Name"],!1,""),init_state?($("#statelist").val(prop_info.StateProvinceID),init_state=!1):$("#statelist").val($("#statelist option:first").val()),$("input[name=countryname]").val($("#countrylist option:selected").text()),$("input[name=statename]").val($("#statelist option:selected").text()),$("#statelist").trigger("chosen:updated"),refreshListBox("statelist","getCityList")}var geocoder,city_arr=[],city_calling_id=0,city_result_arr=[];function getCityList(t){var e=city_arr.indexOf(parseInt(t));-1==e?(city_calling_id=t,$.ajax({type:"POST",url:site_url+"/ajaxhelper.aspx/getcitylist",data:"{id:"+t+"}",contentType:"application/json; charset=utf-8",dataType:"json",success:processCityList,error:function(t){console.log(t)}})):refreshCityList(e)}function processCityList(t){var e=$.parseJSON(t.d),r=e.id,o=e.data;(city_arr.push(r),city_result_arr.push(o),r.toString()==city_calling_id.toString())&&refreshCityList(city_arr.indexOf(r))}function refreshCityList(t){structureListBox(t,"citylist",city_result_arr,["ID","Name"],!0,"Specify the other city"),init_city?($("#citylist").val(prop_info.CityID),init_city=!1):$("#citylist").val($("#citylist option:first").val()),$("input[name=statename]").val($("#statelist option:selected").text()),$("#citylist").trigger("chosen:updated"),changeCityEvent()}function initMap(){geocoder=new google.maps.Geocoder}function geocodeAddress(t,e,r){var o=t+", "+e+", "+r;geocoder.geocode({address:o},function(e,i){"OK"===i?(console.log("addr:"+o),geocodeLatLng(e[0].geometry.location.lat(),e[0].geometry.location.lng(),r,t)):(addErrorField("#additionalcity","Geo Error:"+i),console.log("get geo code error:"+i))})}function geocodeLatLng(t,e,r,o){var i=!1,a={lat:parseFloat(t),lng:parseFloat(e)};return geocoder.geocode({location:a},function(t,e){if("OK"===e){for(var a=0;a<t.length;a++)if(locationDetails=t[a].formatted_address.toLowerCase(),console.log(locationDetails),locationDetails.indexOf(r.toLowerCase())>=0&&locationDetails.indexOf(o.toLowerCase())>=0)return i=!0,void SubmitPage(current_page);addErrorField("#additionalcity","Fail to get the geo code"),console.log("geocodelatlng No results found")}else addErrorField("#additionalcity","Geo Error:"+e),console.log("geocodelatlng error:"+e)}),i}var hotel_type=[8,2,5,16,11,24,2,19,22,12],room_id_arr=[],newrooms=0;function htmlEncode(t){return $("<div/>").text(t).html()}function htmlDecode(t){return $("<div/>").html(t).text()}function Init_DescriptionStepPage(){$("#roomwarper").hide(),newrooms=0,room_id_arr=[];for(var t=prop_amenity.length,e=0;e<t;e++)$("#propamenity option[value="+prop_amenity[e].AmenityID+"]").attr("selected",!0);if($("#_propdescription").text(HtmlDecoder(prop_info.Description)),$("#_propdescription").text($("#_propdescription").text().replaceAll("<br />","\r\n")),$("#_propdescription").text($("#_propdescription").text().replaceAll("<br>","\r\n")),$("#_propamenitytxt").text(HtmlDecoder(prop_info.Amenities)),$("#_propamenitytxt").html($("#_propamenitytxt").text().replaceAll("<br />","\r\n")),$("#_propamenitytxt").html($("#_propamenitytxt").text().replaceAll("<br>","\r\n")),-1==hotel_type.indexOf(prop_info.CategoryID)){$("#roomwarper").show(),$("#roomcontainer").empty();for(var r,o=prop_furniture.length,i=0;i<o;i++)if(r=prop_furniture[i].RoomID,room_id_arr.indexOf(r)>=0)null!=prop_furniture[i].FurnitureItemID&&""!=prop_furniture[i].FurnitureItemID&&$("#roomcontainer input[value="+r+"]").parent().find(".roomfurniture option[value="+prop_furniture[i].FurnitureItemID+"]").attr("selected",!0);else{room_id_arr.push(r);var a=room_id_arr.indexOf(r),n="<div class='srow'>                                     <input type='hidden' name='_roomids' value='"+r+"'/>                                <div class='srow group_form roomborder'>                                   <div class='center roomHeaer'>Room "+String.fromCharCode(a+65)+"</div>                                  <div class='col-x-4 col-3'>                                     <div class='srow group_form'>                                         <div class=''>                                               Title:                                         </div>                                        <div class=''>                                            <input type='text' name='_roomnames'  class='input_text medium_width required' placeholder='Room Title' />                                        </div>                                    </div>                                  </div>                                   <div class='col-x-4 col-9'>                                     <div class='srow group_form'>                                        <div class=''>                                            Sleeping arrangements and Furniture                                        </div>                                        <div class=''>                                            <select class='selectbox chosen-select large_width roomfurniture' multiple='multiple' name='room"+r+"'>                                            </select>                                        </div>                                     </div>                                  </div>                                    <div class='buttongroup'>                                        <input class='btnnormal removeroom' type='button'  value ='Remove Room'/>                                    </div>                                </div>                            </div>";$("#roomcontainer").append(n),$("#roomcontainer input[value="+r+"]").parent().find("input[name=_roomnames]").val(HtmlDecoder(prop_furniture[i].RoomTitle)),$("#roomcontainer input[value="+r+"]").parent().find(".roomfurniture").append(furniture_tag),null!=prop_furniture[i].FurnitureItemID&&""!=prop_furniture[i].FurnitureItemID&&$("#roomcontainer input[value="+r+"]").parent().find(".roomfurniture option[value="+prop_furniture[i].FurnitureItemID+"]").attr("selected",!0)}}$("#wzardstep1 .chosen-select").chosen("destroy"),$("#wzardstep1 .chosen-select").chosen(),$("input").keypress(function(){$(this).parent().find(".error_msg").remove(),$(this).removeClass("error_required")}),$(".removeroom").click(function(){console.log("remove"),$(this).parent().parent().parent().remove()})}function addNewRoom(){var t="new"+newrooms++,e="<div class='srow'>                                     <input type='hidden' name='_roomids' value='"+t+"'/>                                <div class='srow group_form roomborder'>                                   <div class='center roomHeaer'>New Room</div>                                  <div class='col-x-4 col-3'>                                     <div class='srow group_form'>                                         <div class=''>                                               Title:                                         </div>                                        <div class=''>                                            <input type='text' name='_roomnames'  class='input_text medium_width required' placeholder='Room Title' />                                        </div>                                    </div>                                  </div>                                   <div class='col-x-4 col-9'>                                     <div class='srow group_form'>                                        <div class=''>                                            Sleeping arrangements and Furniture                                        </div>                                        <div class=''>                                            <select class='selectbox chosen-select large_width roomfurniture' multiple='multiple' name='room"+t+"'>                                            </select>                                        </div>                                     </div>                                  </div>                                    <div class='buttongroup'>                                        <input class='btnnormal removeroom' type='button'  value ='Remove Room'/>                                    </div>                                </div>                            </div>";$("#roomcontainer").append(e),$("#roomcontainer input[value="+t+"]").parent().find(".roomfurniture").append(furniture_tag),$("#roomcontainer").find(".roomfurniture").chosen(),$("#roomcontainer").find(".roomfurniture").trigger("chosen:updated"),$("input").keypress(function(){$(this).parent().find(".error_msg").remove(),$(this).removeClass("error_required")}),$(".removeroom").click(function(){console.log("remove"),$(this).parent().parent().parent().remove()})}function init_AttractionPage(){var t=prop_attraction.length,e=HtmlDecoder(prop_info.LocalAttractions);$("#_propattract").text(e),$("#_propattract").text($("#_propattract").text().replaceAll("<br />","\r\n")),$("#_propattract").text($("#_propattract").text().replaceAll("<br>","\r\n"));for(var r=0;r<t;r++){var o=prop_attraction[r].AttractionID,i=prop_attraction[r].DistanceID,a=$("#wzardstep2 input[name=attractids][value="+o+"]");a.attr("checked","checked"),a.parent().parent().find("select option[value="+i+"]").attr("selected","selected")}}function init_RatePage(){$("#minrate").val(prop_info.MinNightRate),$("#hirate").val(prop_info.HiNightRate),$("#currency").val(prop_info.MinRateCurrency),$("#rates").val(HtmlDecoder(prop_info.Rates)),$("#rates").val($("#rates").val().replaceAll("<br />","\r\n")),$("#rates").val($("#rates").val().replaceAll("<br>","\r\n")),$("#checkin").val(HtmlDecoder(prop_info.CheckIn)),$("#checkin").val($("#checkin").val().replaceAll("<br />","\r\n")),$("#checkin").val($("#checkin").val().replaceAll("<br>","\r\n")),$("#checkout").val(HtmlDecoder(prop_info.CheckOut)),$("#checkout").val($("#checkout").val().replaceAll("<br />","\r\n")),$("#checkout").val($("#checkout").val().replaceAll("<br>","\r\n")),$("#cancel").val(HtmlDecoder(prop_info.CancellationPolicy)),$("#cancel").val($("#cancel").val().replaceAll("<br />","\r\n")),$("#cancel").val($("#cancel").val().replaceAll("<br>","\r\n")),$("#deposit").val(HtmlDecoder(prop_info.DepositRequired)),$("#deposit").val($("#deposit").val().replaceAll("<br />","\r\n")),$("#deposit").val($("#deposit").val().replaceAll("<br>","\r\n"))}function HtmlDecoder(t){return(new DOMParser).parseFromString("<!doctype html><body>"+t,"text/html").body.textContent}