﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ReserveList : AdminPage
{
    public string[] currency_type = { "USD", "EUR", "CAD", "GPB", "YEN" };
    protected DataSet ds_payment;
    protected void Page_Load(object sender, EventArgs e)
    {
        ds_payment = PaymentHelper.getAllPaymentList();
    }
}