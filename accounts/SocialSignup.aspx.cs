﻿using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class accounts_SocialSignup : CommonPage
{
    public string cs = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
    protected void Page_Load(object sender, EventArgs e)
    {


        HttpCookie myCookie = Request.Cookies["fbinfo"];
        if (myCookie != null)
        {
            string smail = Request.Cookies["fbinfo"]["Email"];
            string faceBookUserId = Request.Cookies["fbinfo"]["faceBookUserId"];
            string Tuserid = Request.Cookies["fbinfo"]["username"];
            hidden_id.Value = faceBookUserId;
            acctype.Value = Request.Cookies["fbinfo"]["type"];
            LoginName.Text = Tuserid;
            Email.Text = smail;
 
            if(EmailValidate(smail) > 0)
            {
                Response.Redirect("/accounts/login.aspx");
            }
            //TUserID.Text = TwiID.Value;
            //NewPasswordRequired.Enabled = false;
            Response.Cookies["fbinfo"].Expires = DateTime.Now;


        }
        else
        {
            if(!IsPostBack)
            Response.Redirect("/accounts/login.aspx");
        }
    }

    protected void bt_register_Click(object sender ,  EventArgs e)
    {
       // Response.Redirect("/asd.aspx");
        SocialUser social = new SocialUser();
        social.email = Email.Text;
        social.username = LoginName.Text;
        social.id = hidden_id.Value;
        InsertNewUser(social);

        try
        {
            using (WebClient client = new WebClient())
            {

                byte[] response =
                client.UploadValues("https://api.madmimi.com/audience_lists/Owners/add", new NameValueCollection()
                {
                           { "username", "noreply@vacations-abroad.com" },
                           { "api_key", "9881316569391d3dbfba35b71670b4b2" },
                           { "email", Email.Text},
                           { "first_name", LoginName.Text}
                });

                //string result = System.Text.Encoding.UTF8.GetString(response);
            }
        }
        catch
        {

        }

    }

    protected bool InsertNewUser(SocialUser social)
    {
        try
        {
            int newid;
            using (SqlConnection connection = CommonFunctions.GetConnection())
            {
                connection.Open();
                //lock(CommonFunctions.Connection)
                SqlCommand getmaxid = new System.Data.SqlClient.SqlCommand("SELECT MAX(ID) FROM Users", connection);

                object maxid = getmaxid.ExecuteScalar();

                if (maxid is int)
                    newid = (int)maxid + 1;
                else
                    newid = 1;

                byte[] salt = AuthenticationManager.GenerateSalt();
                int repeats = AuthenticationManager.GenerateRepeats();
                byte[] pwdhash = AuthenticationManager.HashPassword(social.id, salt, repeats);

                string sqlQuery = "select * from Users where 0 = 1";
                SqlDataAdapter dataAdapter = new SqlDataAdapter(sqlQuery, connection);
                DataSet MainDataSet = new DataSet();
                dataAdapter.Fill(MainDataSet, "Users");

                DataRow newuser = MainDataSet.Tables["Users"].NewRow();

                newuser["ID"] = newid;
                newuser["Username"] = social.username;
                newuser["PasswordSalt"] = salt;
                newuser["Repeats"] = repeats;
                newuser["PasswordHash"] = pwdhash;
                newuser["Email"] = social.email;
                newuser["IfAdmin"] = 0;

                newuser["UserID"] = social.id;
                newuser["AdministrativeEmail"] = newuser["Email"];
                newuser["IfAgent"] = 0;
                newuser["ReservationEmail"] = newuser["Email"];
                newuser["DateCreated"] = DateTime.Now;

                newuser["FirstName"] = "";
                newuser["LastName"] = "";
                //new part
                newuser["dateModified"] = DateTime.Today.ToString();

                int type = (acctype.Value == "1") ? 1 : 2;
                newuser["AccountType"] = type;  //0:email 1: facebook 2:twitter
                bool bl_show = showproperty.Checked;
                newuser["Listing"] = (bl_show) ? 1 : 0;

                MainDataSet.Tables["Users"].Rows.Add(newuser);

                new SqlCommandBuilder(dataAdapter);
                int rows = dataAdapter.Update(MainDataSet, "Users");

                if (rows < 1) return false;
 
               // CommonFunctions.sendEmail(social.username, social.email);
                string msg = "New owner registered at " + CommonFunctions.GetSiteName() + ". <br>" +
                    "Owner details: <br>" +
                    "Login name:" + social.username + " <br>" +
                    "Email address:" + social.email + " <br>";
                BookDBProvider.SendEmail(ConfigurationManager.AppSettings["NewOwnerEmail"], "New owner registered at Vacations-abroad.com", msg, social.email);


                connection.Close();
                if (AuthenticationManager.Login(social.email, social.id, type) != "")
                {
                    FormsAuthentication.RedirectFromLoginPage(LoginName.Text, false);
                }
            }

        }
        catch (Exception ex)
        {
            throw ex;
        }

        return true;
    }


    protected void UsernameValidate(object source, ServerValidateEventArgs args)
    {
        int count = 0;
        try
        {

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                string sql = String.Format("select count(*) from Users where Username=@email");

                using (SqlCommand command = new SqlCommand(sql, con))
                {
                    SqlParameter email = new SqlParameter("@email", args.Value);
                    command.Parameters.Add(email);

                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        count = Convert.ToInt32(reader[0]);
                    }
                }




                con.Close();
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

        args.IsValid = (count == 0);
    }

    protected int EmailValidate(string semail)
    {
        int count = 0;
        try
        {

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                // string sql = String.Format("select count(*) from Users where (AccountType < 1 or AccountType is null) and Email=@email");
                string sql = String.Format("select count(*) from Users where Email=@email");

                using (SqlCommand command = new SqlCommand(sql, con))
                {
                    SqlParameter email = new SqlParameter("@email", semail);
                    command.Parameters.Add(email);

                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        count = Convert.ToInt32(reader[0]);
                    }
                }




                con.Close();
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return count;
    }
}