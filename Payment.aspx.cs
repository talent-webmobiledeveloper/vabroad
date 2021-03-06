﻿using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class userowner_Payment : CommonPage
{
    public InquiryInfo inquiryinfo;
    //public CountryInfo countryinfo;
    public EmailResponseInfo email_resp;
    public UserInfo owner_info;
    public PropertyDetailInfo prop_info;
    public string[] currency_type = { "USD", "EUR", "CAD", "GPB", "YEN" };

    public int respid = 0;
    public decimal _total_sum, _lodgingval, _balance,_total=0;
    public string custom = "" , str_coupon="";
    protected void Page_Load(object sender, EventArgs e)
    {
        NameValueCollection nvc = Request.Form;
        // string userName, password;
        if (!string.IsNullOrEmpty(nvc["resp_number"]))
        {
            respid = Convert.ToInt32(nvc["resp_number"]);
            resp_id.Value = respid.ToString();
        }
        else if (resp_id.Value != null && resp_id.Value!="")
        {
            respid = Convert.ToInt32(resp_id.Value);
        }
        else Response.Redirect("/Error.aspx?error=Wrong Request for payment"); ;  //Not post or Wrong respid

        str_coupon = Request["coupon"];
        //Get the inquiry info.
        email_resp = BookResponseEmail.getResponseInfo(respid);
        if (email_resp.ID == 0 ) Response.Redirect("/Error.aspx?error=Wrong Response number or not valid");

        inquiryinfo = BookDBProvider.getQuoteInfo(email_resp.QuoteID);
        owner_info = BookDBProvider.getUserInfo(inquiryinfo.PropertyOwnerID);
        prop_info = AjaxProvider.getPropertyDetailInfo(inquiryinfo.PropertyID);
        // _total_sum = email_resp.NightRate * inquiryinfo.Nights;
        _total_sum = email_resp.NightRate;
        _lodgingval = _total_sum * email_resp.LoadingTax / 100;
        _balance = _lodgingval + email_resp.CleaningFee + email_resp.SecurityDeposit;
        _total = _total_sum + _balance;
    }

    protected void payment_Click(object sender, EventArgs e)
    {

        string coupon = Request["coupon"];

        if (coupon.Length == 13)
        {
            string start_date, end_date;
            int discount,id;

            List<SqlParameter> param = new List<SqlParameter>();
            param.Add(new SqlParameter("@coupon", coupon));

            DataSet ds_coupon = BookDBProvider.getDataSet("uspGetCouponItem", param);
            if (ds_coupon.Tables[0].Rows.Count > 0)
            {
                start_date = ds_coupon.Tables[0].Rows[0]["Start_date"].ToString();
                end_date= ds_coupon.Tables[0].Rows[0]["End_date"].ToString();
                if (!int.TryParse(ds_coupon.Tables[0].Rows[0]["Discount"].ToString(), out discount)) discount = 0;
                id = int.Parse(ds_coupon.Tables[0].Rows[0]["CID"].ToString());

                DateTime s_date = DateTime.Parse(start_date);
                DateTime e_date = DateTime.Parse(end_date);
                DateTime now = DateTime.Now;
                if (DateTime.Compare(s_date, now) <= 0 && DateTime.Compare(now, e_date) <= 0)
                {
                    _total = _total_sum * (100 - discount) / 100 + _balance;
                    custom = coupon;
                }

            }

        }

            PaywithPaypal();
        
    }

    protected void PaywithPaypal()
    {

        /*
         * 
    URL is the URL to work with, depending on whether sandbox or a real PayPal account should be used
    cmd is a command that is sent to PayPal
    business is the seller's e-mail
    item_name is the item name -- i.e. what buyer pays for -- that will be shown to user;
    amount is the payment amount
    no_shipping is a parameter that determines whether the delivery address should be requested
    return_url is the URL that the buyer will be redirected to when payment is successfully performed
    rm is a parameter that determines the way in which information about a successfully finished transaction will be sent to the script specified in the return parameter
    notify_url is the URL PayPal will send information about transaction (IPN) to
    cancel_url is the URL that the buyer is redirected to when he cancels payment
    currency_code is the currency code
    request_id is an identifier of payment request

         * */


        string redirecturl = "";

        //Mention URL to redirect content to paypal site
        redirecturl += "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=" + ConfigurationManager.AppSettings["PaypalEmail"].ToString();
      //  redirecturl += "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=talent.anddev@yandex.com";

        //Product Name
        redirecturl += String.Format("&item_name=Property{0} in {1},{2},{3}", inquiryinfo.PropertyID,prop_info.City, prop_info.StateProvince, prop_info.Country);
        //item_number
        redirecturl += "&item_number=" +respid;
        //Product Name
        redirecturl += "&amount=" + BookDBProvider.DoFormat(_total);

        //Shipping charges if any
        redirecturl += "&no_shipping=1";

        redirecturl += "&rm=2";
        redirecturl += "&custom="+custom;
        //Currency code 
        //   redirecturl += "&currency_code=" + "USD";
        redirecturl += ("&currency_code=" + currency_type[email_resp.CurrencyType]);

        //Success return page url
        //redirecturl += "&return=" +      ConfigurationManager.AppSettings["SuccessURL"].ToString();
        redirecturl += "&return=https://www.vacations-abroad.com/paysuccess.aspx";

        //Failed return page url
        //redirecturl += "&cancel_return=" +    ConfigurationManager.AppSettings["FailedURL"].ToString();
        redirecturl += "&cancel_return=https://www.vacations-abroad.com/payfail.aspx";

        //redirecturl += "&notify_url=" +       ConfigurationManager.AppSettings["IPNURL"].ToString();
        //redirecturl += "&notify_url=https://www.vacations-abroad.com/accounts/ipnhelper.aspx";

        Response.Redirect(redirecturl);
    }

    protected void PaywithCredit()
    {

    }
}