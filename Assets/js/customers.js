function check_select(){for(var s=$("#count_rows").val(),t=0;t<s;t++){var e="#chk"+t,c="#num"+t;if($(e).is(":checked")){var o=$(e).val();return $("#customer_no").val(o),$("#phonenum").val($(c).val()),!0}}return!1}function send_sms(){1==check_select()&&($("#customers_form").attr("action","/index.php/smsmsg/sendsms"),$("#customers_form").submit())}function cus_list(){$("#customers_form").attr("action","/index.php/customers"),$("#customers_form").submit()}function cus_edit(){1==check_select()&&($("#customers_form").attr("action","/index.php/customers/edit"),$("#customers_form").submit())}function cus_delete(){1==check_select()&&($("#customers_form").attr("action","/index.php/customers/delete"),$("#customers_form").submit())}function cus_add(){$("#customers_form").attr("action","/index.php/customers/add"),$("#customers_form").submit()}