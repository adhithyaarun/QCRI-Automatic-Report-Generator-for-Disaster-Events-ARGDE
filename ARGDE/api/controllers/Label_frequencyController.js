module.exports = {
	createPreLabels: function(params){
		Argde.query("select distinct "+Argde.attributes.aidr_class_label.columnName+" from "+Argde.tableName+" where "
		+Argde.attributes.aidr_class_label.columnName+" is not NULL;",function(err, classes){
			if(err)
			{
				sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
			}
			else
			{
				var class_names = [];
				classes.rows.forEach(function(a_class){
					class_names.push(String(a_class['aidr_class_label']));
				});

				Argde.query("select distinct "+Argde.attributes.sentiment.columnName+" from "+Argde.tableName+" where "
				+Argde.attributes.sentiment.columnName+" is not NULL;",function(err, sentiments){
					if(err)
					{
						sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
					}
					else
					{
						var sentiment_values = [];
						sentiments.rows.forEach(function(sentiment){
							sentiment_values.push(String(sentiment['sentiment']));
						});

						var start_year = params['min'].getFullYear();
						var start_month = params['min'].getMonth()+1;
						var start_day = params['min'].getDate();
						var start_hour = params['min'].getHours();
						var start_mins = params['min'].getMinutes();
						var start_time = String(start_hour)+":"+String(start_mins)+":00";

						var end_year = params['max'].getFullYear();
						var end_month = params['max'].getMonth()+1;
						var end_day = params['max'].getDate();
						var end_hour = params['max'].getHours();
						var end_mins = params['max'].getMinutes();
						var end_date = new Date(end_year,end_month-1,end_day,end_hour,end_mins,0);

						var _date_without_time = String(start_year)+"-"+String(start_month)+"-"+String(start_day);
						var _date = _date_without_time + " " + start_time;
						var date_val;

						var query_p1 = "select count("+Argde.attributes.updatedAt.columnName+") from "+Argde.tableName+" where "
						+Argde.attributes.updatedAt.columnName+" >= timestamp '"+_date+"'+interval '";
						var query_p2 = " and "+Argde.attributes.updatedAt.columnName+"< timestamp '"+_date+"'+interval '";
				    var sql_query;

						var iterations = ((end_date-new Date(start_year,start_month-1,start_day,start_hour,start_mins,0))/60000)+1;

				    for(let i=1; i<=iterations; i++)
				    {
				      sql_query = query_p1+(i-1)+" minutes'"+query_p2+i+" minutes' and "+Argde.attributes.code.columnName+"='"
							+params['collection']+"';";
				      Argde.query(sql_query,function(err, result){
								if(err)
								{
									sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
								}
				        else
				        {
									let query = "select date(date '"+_date_without_time+"'+interval '"+(i-1)+" minutes');";
				          Argde.query(query, function(_err, newDate){
				            if(err)
				            {
				              sails.log.error("Error name: "+_err.name+"	"+"Error code: "+_err.code);
				            }
							else
							{
								let retDate = new Date(newDate.rows[0]['date']);
								let date_part = retDate.getDate();
								let month_part = retDate.getMonth()+1;
								let year_part = retDate.getFullYear();
								date_val = String(year_part)+"-"+String(month_part)+"-"+String(date_part);
								Argde.query("select timestamp '"+_date+"'+interval '"+(i-1)+" minutes';",function(errVal, newHour){
									if(errVal)
									{
										sails.log.error("Error name: "+errVal.name+"	"+"Error code: "+errVal.code);
									}
									else
									{
										let newTime = new Date(newHour.rows[0]['?column?']);
										let _hour = newTime.getHours();
										let hour_string = String(_hour)+":00:00";
										let _minute = String((i+start_mins-1)%60);
										class_names.forEach(function(class_name){
											Argde.query("select count("+Argde.attributes.aidr_class_label.columnName+") from "
											+Argde.tableName+" where "+Argde.attributes.aidr_class_label.columnName+"='"
											+class_name+"' and "+Argde.attributes.updatedAt.columnName+">=(timestamp '"
											+date_val+" "+_hour+":"+_minute+":00') and "+Argde.attributes.updatedAt.columnName
											+"<(timestamp '"+date_val+" "+_hour+":"+_minute+":00'+interval '1 minutes') and "
											+Argde.attributes.code.columnName+"='"+params['collection']+"';",
											function(err,count){
												if(err)
												{
													sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
												}
												else
												{
													let _freq = count.rows[0].count;
													Label_frequency.query("update "+Label_frequency.tableName+" set "
													+Label_frequency.attributes.frequency.columnName+"="+_freq+" where "
													+Label_frequency.attributes.date.columnName+"='"+date_val+"' and "
													+Label_frequency.attributes.hour.columnName+"='"+hour_string+"' and "
													+Label_frequency.attributes.minute.columnName+"="+_minute+" and "
													+Label_frequency.attributes.class_label.columnName+"='"+class_name+"' and "
													+Label_frequency.attributes.code.columnName+"='"+params['collection']+"';insert into "
													+Label_frequency.tableName+" select '"+date_val+"','"+hour_string+"',"+_minute+",(date '"
													+date_val+"'- date '"+String(params['min'].getFullYear())+"-"
													+String((params['min'].getMonth()+1))+"-"+String(params['min'].getDate())+"')+1,'"
													+class_name+"',"+_freq+",'"+params['collection']+"' where not exists(select 1 from "
													+Label_frequency.tableName+" where "
													+Label_frequency.attributes.date.columnName+"='"+date_val+"' and "
													+Label_frequency.attributes.hour.columnName+"='"+hour_string+"' and "
													+Label_frequency.attributes.minute.columnName+"="+_minute+" and "
													+Label_frequency.attributes.class_label.columnName+"='"+class_name+"' and "
													+Label_frequency.attributes.code.columnName+"='"+params['collection']+"');",
													function(err, retVal){
														if(err)
														{
															sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
														}
														else
														{
															sails.log.info("Label "+class_name+" at "+date_val+" "+_hour+":"+_minute+":00 OK");
														}
													});
												}
											});
										});
										sentiment_values.forEach(function(value){
											Argde.query("select count("+Argde.attributes.sentiment.columnName+") from "
											+Argde.tableName+" where "+Argde.attributes.sentiment.columnName+"='"
											+value+"' and "+Argde.attributes.updatedAt.columnName+">=(timestamp '"
											+date_val+" "+_hour+":"+_minute+":00') and "+Argde.attributes.updatedAt.columnName
											+"<(timestamp '"+date_val+" "+_hour+":"+_minute+":00'+interval '1 minutes') and "
											+Argde.attributes.code.columnName+"='"+params['collection']+"';",
											function(err,count){
												if(err)
												{
													sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
												}
												else
												{
													let _freq = count.rows[0].count;
													Label_frequency.query("update "+Label_frequency.tableName+" set "
													+Label_frequency.attributes.frequency.columnName+"="+_freq+" where "
													+Label_frequency.attributes.date.columnName+"='"+date_val+"' and "
													+Label_frequency.attributes.hour.columnName+"='"+hour_string+"' and "
													+Label_frequency.attributes.minute.columnName+"="+_minute+" and "
													+Label_frequency.attributes.class_label.columnName+"='"+value+"' and "
													+Label_frequency.attributes.code.columnName+"='"+params['collection']+"';insert into "
													+Label_frequency.tableName+" select '"+date_val+"','"+hour_string+"',"+_minute+",(date '"
													+date_val+"'- date '"+String(params['min'].getFullYear())+"-"
													+String((params['min'].getMonth()+1))+"-"+String(params['min'].getDate())+"')+1,'"
													+value+"',"+_freq+",'"+params['collection']+"' where not exists(select 1 from "
													+Label_frequency.tableName+" where "
													+Label_frequency.attributes.date.columnName+"='"+date_val+"' and "
													+Label_frequency.attributes.hour.columnName+"='"+hour_string+"' and "
													+Label_frequency.attributes.minute.columnName+"="+_minute+" and "
													+Label_frequency.attributes.class_label.columnName+"='"+value+"' and "
													+Label_frequency.attributes.code.columnName+"='"+params['collection']+"');",
													function(err, retVal){
														if(err)
														{
															sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
														}
														else
														{
															sails.log.info("Label "+value+" at "+date_val+" "+_hour+":"+_minute+":00 OK");
														}
													});
												}
											});
										});
									}
								});
							}
				          });
				        }
				      });
				    }
					}
				});
			}
		});
	},
};