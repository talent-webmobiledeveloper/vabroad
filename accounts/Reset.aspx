﻿<%@ Page Language="C#" MasterPageFile="/masterpage/mastermobile.master" AutoEventWireup="true" CodeFile="Reset.aspx.cs" Inherits="accounts_Reset" %>
<asp:Content ID="head" ContentPlaceHolderID="head" runat="server">
    Reset Password
</asp:Content>

<asp:Content ID="links" ContentPlaceHolderID="links" runat="server">
    <style>
        .formgrouppadding{
            padding:30px 50px;
        }
        .formgroup{
            padding:20px 0px;
        }
        .btnstyle{
            border-radius:1em;color:#fff;font-family:arial;font-size:12px;background:#154890;font-weight:700;height:26px;right:6px;box-shadow:2px 2px 6px #154890;border:1px solid #154890;
        }
        .form-control {
            width: 300px;
            height: 34px;
            padding: 2px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
            -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
            -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            box-sizing:border-box;
       }



  .modalLoading{
        margin-top:270px;
    }
    .dlgMsg{
        background-color:#fafbfc;
        border:5px solid #f0b892;
        border-radius:55px;
        color:#767271;
        width:300px;
        position:relative;
        margin:auto;
        margin-top:300px;
        padding:40px;
    }
     .modalhead{
        position:absolute;right:15px; top:10px;
    }
    </style>
</asp:Content>

<asp:Content ID="body" ContentPlaceHolderID="bodycontent" runat="server">
             <div id="msgdlg" class="modalform">
                  <div id="modal_loading" class="modalLoading">
                        <div class="loader"> </div>
                  </div>
                  <div id="modal_dialog" class="dlgMsg" >
                      <div class="modalhead">
                            <span id="msgclose" class="mclose">x</span>
                      </div>
                      <div class="srow">
                          <div class="col-4">Message:</div>
                          <div class="col-8" id="modalmsg"></div>
                      </div>
                  </div>
            </div>
    <div class="internalpagewidth">
        <input type="hidden" id="t_redirect" value="<%=triger_redirect %>" />
        <input type="hidden" id="t_error" value="<%=errormsg %>" />
        <div class="formgrouppadding center">
            <div class="srow">
                You will get the password reset link only if you input correct registered email.
            </div>
            <div class="srow formgroup">
                Your Email: <input type="text" id="uemail"  class="form-control" value="<%=email %>" name="uemail" />
            </div>
            <div class="srow formgroup">
                <input type="button" class="btnstyle" id="btnsend" value="Send Password Reset Link"/>
            </div>
        </div>
   </div>
    <script src="/assets/js/resetpwd.js" defer="defer"></script>
</asp:Content>