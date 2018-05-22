module.exports = {
	createPreHours: function(params){
		var start_year = params['min'].getFullYear();
		var start_month = params['min'].getMonth()+1;
		var start_day = params['min'].getDate();
		var start_hour = params['min'].getHours();
		var start_mins = params['min'].getMinutes();
		var start_time = String(start_hour)+":00:00";

		var end_year = params['max'].getFullYear();
		var end_month = params['max'].getMonth()+1;
		var end_day = params['max'].getDate();
		var end_hour = params['max'].getHours();
		var end_mins = params['max'].getMinutes();
		var end_date = new Date(end_year,end_month-1,end_day,end_hour,0,0);

		var _date_without_time = String(start_year)+"-"+String(start_month)+"-"+String(start_day);
    var _date = _date_without_time + " " + start_time;
    var date_val;

		var query_p1 = "select count("+Argde.attributes.updatedAt.columnName+") from "+Argde.tableName+" where "
		+Argde.attributes.updatedAt.columnName+" >= timestamp '"+_date+"'+interval '";
		var query_p2 = " and "+Argde.attributes.updatedAt.columnName+"< timestamp '"+_date+"'+interval '";
    var sql_query;

		var iterations = ((end_date-new Date(start_year,start_month-1,start_day,start_hour,0,0))/(60000*60))+1;

		for(let i=1; i<=iterations; i++)
    {
      sql_query = query_p1+(i-1)+" hours'"+query_p2+i+" hours' and "+Argde.attributes.code.columnName+"='"
			+params['collection']+"';";
      Argde.query(sql_query,function(err, result){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
				}
        else
        {
          date_val = _date;
          Argde.query("select date(date '"+_date_without_time+"'+interval '"+(i-1)+" hours');",
					function(_err, newDate){
            if(err)
            {
              sails.log.error("Error name: "+_err.name+"	"+"Error code: "+_err.code);
            }
						else
						{
	            let _hour = String((i-1+start_hour)%24) + ":00:00";
							let retDate = new Date(newDate.rows[0]['date']);
							let date_part = retDate.getDate();
							let month_part = retDate.getMonth()+1;
							let year_part = retDate.getFullYear();
							date_val = String(year_part)+"-"+String(month_part)+"-"+String(date_part);

							sails.log.info("Writing to database, hour-wise for "+date_val+" "+_hour);

							Hour_frequency.query("update "+Hour_frequency.tableName+" set "
							+Hour_frequency.attributes.frequency.columnName+"="+result.rows[0].count+" where "
							+Hour_frequency.attributes.date.columnName+"='"+date_val+"' and "
							+Hour_frequency.attributes.hour.columnName+"='"+_hour+"' and "
							+Hour_frequency.attributes.code.columnName+"='"+params['collection']+"';insert into "
							+Hour_frequency.tableName+" select'"+date_val+"','"+_hour+"',"+result.rows[0].count
							+",'"+params['collection']+"' where not exists(select 1 from "+Hour_frequency.tableName+" where "
							+Hour_frequency.attributes.date.columnName+"='"+date_val+"' and "
							+Hour_frequency.attributes.hour.columnName+"='"+_hour+"' and "
							+Hour_frequency.attributes.code.columnName+"='"
							+params['collection']+"');",function(err, retValue){
		            flag = false;
		            if(err)
								{
									sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
								}
								else
								{
									sails.log.info("Hour "+date_val+" "+_hour+" OK");
								}
							});
						}
          });
        }
      });
    }
	},
};
