﻿<%@ Page Language="C#" MasterPageFile="~/masterpage/mastermobile.master" AutoEventWireup="true"
    CodeFile="rentalguarantee.aspx.cs" Inherits="rentalguarantee" %>

<asp:Content ID="head" ContentPlaceHolderID="head" runat="server">
   Rental Guarantee
</asp:Content>
<asp:Content ID="links" ContentPlaceHolderID="links" runat="server">
    <link href="/Assets/css/staticspage.css" rel="stylesheet" />
    <style>
.righttext{float:right;}
    .imgwraper{
        margin:0;padding:0 0 30px 0;left:0;top:0;width:100%;
        position:relative;
    }
      .background{position:relative;margin:0;}
      .back_img{width:100%; left:0;top:-0px;z-index:0;position:relative;}.back_item{z-index:10; margin:0;padding:0 0 30px 0;left:0;top:0;width:100%;position:absolute;}
        .topbox h1{display:inline;font-size:28px;margin:0;padding:0; -webkit-margin-before: 0;  -webkit-margin-after: 0; -webkit-margin-start: 0px;    -webkit-margin-end: 0px;}
        .footeritem h2{padding:0px;margin:0px;}
        @media(max-width:510px){
        .alist{ color:#000;padding:3px 20px; font-family:Verdana; font-size:14pt; background-color:#fff;margin:auto;}
       .formgroup{padding-top:4px;} .footeritem{width:300px; background-color:#f5ede3;border:2px solid #cdbfac;padding:5px; color:#5a5a5a;margin-left:1%;text-align:left;}
       .itemtile{font-variant: small-caps;font-size:8pt;display:inline-block;padding:2px;}.itemtext{font-variant:small-caps; font-size:7pt;display:block;padding:2px;}
       .interalitem{padding:0 0 10px 30px;} a{cursor:pointer;}.topbox{padding:5px 5px;border:2px solid #ff6600;width:300px;margin:auto;}
        .contentboxmargin{margin-top:4px;}
        .contentbox{margin-top:10px;}
        .link{font-size:8pt;}
            .shidden{display:none;}
        }
       @media(max-width:670px) and (min-width:510px){
        .alist{ color:#000;padding:3px 20px; font-family:Verdana; font-size:14pt; background-color:#fff;margin:auto;}
       .formgroup{padding-top:29px;} .footeritem{width:320px; background-color:#f5ede3;border:2px solid #cdbfac;padding:5px; color:#5a5a5a;margin-left:1%;text-align:left;}
       .itemtile{font-variant: small-caps;font-size:10pt;display:inline-block;padding:4px;}.itemtext{font-variant:small-caps; font-size:8pt;display:block;padding:4px;}
       .interalitem{padding:0 0 10px 30px;} a{cursor:pointer;}.topbox{padding:5px 5px;border:2px solid #ff6600;width:300px;margin:auto;}
        .contentboxmargin{margin-top:4px;}
        .contentbox{margin-top:10px;}
       }
        @media(min-width:670px)
        {
        .alist{ color:#000;padding:3px 30px; font-family:Verdana; font-size:16pt; background-color:#fff;margin:auto;}
       .formgroup{padding-top:45px;} .footeritem{width:400px; background-color:#f5ede3;border:2px solid #cdbfac;padding:5px; color:#5a5a5a;margin:0 30px;text-align:left;}
       .itemtile{font-variant: small-caps;font-size:11pt;display:inline-block;padding:4px;}.itemtext{font-variant:small-caps; font-size:9pt;display:block;padding:4px;}
       .interalitem{padding:0 0 10px 30px;} a{cursor:pointer;}.topbox{padding:5px 15px;border:2px solid #ff6600;width:400px;margin:auto;}
        .contentboxmargin{margin-top:30px;}
        .contentbox{margin-top:10px;}
        }
        @media(min-width:900px)
        {
        .alist{ color:#000;padding:3px 30px; font-family:Verdana; font-size:22pt; background-color:#fff;margin:auto;}
       .formgroup{padding-top:55px;} .footeritem{width:400px; background-color:#f5ede3;border:2px solid #cdbfac;padding:5px; color:#5a5a5a;margin:0 100px;text-align:left;}
       .itemtile{font-variant: small-caps;font-size:12pt;display:inline-block;padding:4px;}.itemtext{font-variant:small-caps; font-size:10pt;display:block;padding:4px;}
       .interalitem{padding:0 0 10px 30px;} a{cursor:pointer;}.topbox{padding:5px 15px;border:2px solid #ff6600;width:400px;margin:auto;}
        .contentboxmargin{margin-top:30px;}
        .contentbox{margin-top:20px;}
         }
        @media(min-width:1200px)
        {
         .alist{ color:#000;padding:3px 30px; font-family:Verdana; font-size:22pt; background-color:#fff;margin:auto;}
          .formgroup{padding-top:120px;} .footeritem{width:400px; background-color:#f5ede3;border:2px solid #cdbfac;padding:5px; color:#5a5a5a;margin:0 170px;text-align:left;}
        .itemtile{font-variant: small-caps;font-size:14pt;display:inline-block;padding:4px;}.itemtext{font-variant:small-caps; font-size:12pt;display:block;padding:4px;}
        .interalitem{padding:0 0 10px 30px;} a{cursor:pointer;}.topbox{padding:15px 30px;border:2px solid #ff6600;width:400px;margin:auto;}
         .contentboxmargin{margin-top:30px;}
         .contentbox{margin-top:80px;}
        }
    </style>
</asp:Content>
<asp:Content ID="Content" ContentPlaceHolderID="bodycontent" runat="Server">
        <div class="scontainer">
    <div class="background">
          <img class="back_img" src="/Assets/img/rent.jpg" />
        <div class="back_item">
            <div class="srow center formgroup">
                <div class="topbox"> <h1><label class="alist" >Rental Guarantee</label></h1></div>
               
            </div>
            <div class="srow formgroup" >
                  <div class="footeritem">
                    <span class="itemtile">Vacations-Abroad.com will Guarantee Your Reservation Booked Through Our Website. </span>
                    <span class="itemtext">Upon Your Arrival, If The Property Is Not Up To Your Expectations And You Have Found It To Be Unacceptable and Inaccurately Represented.  Notify Us Immediately.  We Will Begin Negotiations With the Property Owner Regarding a Refund. </span>
                    <span class="itemtext">Should The Property Owner Decline a Refund, Vacations-Abroad.com will Reimburse You Directly.  If Possible, Document the Status of The Property With Your Phone Camera.</span>
                    <span class="itemtext">The Management at Vacations-Abroad.Com</span>
                 </div>
                </div>
        </div>
    </div>
            </div>
        <script src="/Assets/js/footerpage.js" defer="defer"></script>
</asp:Content>
