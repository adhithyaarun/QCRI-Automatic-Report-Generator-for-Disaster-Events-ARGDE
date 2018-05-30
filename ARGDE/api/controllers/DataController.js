module.exports = {
	retrieveMinute: async function(req, res){
			await Minute_frequency.find({
				where: { code: req.param('collection'), },
				sort: { date: 1, hour: 1, minute: 1,},
				}).exec(function(err, records){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					sails.log.info("Minute data retrieved, passing to view");
					return res.view('Dashboard/minute_freq', {minute_data: records});
				}
			});
	},
	retrieveHour: async function(req, res){
			await Hour_frequency.find({
				where: { code: req.param('collection'), },
				sort: { date: 1, hour: 1,},
			}).exec(function(err, records){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					sails.log.info("Hour data retrieved, passing to view");
					return res.view('Dashboard/hour_freq', {hour_data: records});
				}
			});
	},
	retrieveDay: async function(req, res){
			await Day_frequency.find({
				where: { code: req.param('collection'), },
				sort: { date: 1, },
			}).exec(function(err, records){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					sails.log.info("Day data retrieved, passing to view");
					return res.view('Dashboard/day_freq', {day_data: records});
				}
			});
	},
	retrieveLabel: async function(req, res){
			await Label_frequency.find({
				where: { code: req.param('collection'), },
				sort: { date: 1, hour: 1, minute: 1,},
			}).exec(function(err, records){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					sails.log.info("Label data retrieved, passing to view");
					return res.view('Dashboard/label_freq', {label_data: records});
				}
			});
	},
	retrieveSentiment: function(req, res){
		Argde.query("select distinct "+Argde.attributes.sentiment.columnName+" from "
		+Argde.tableName+" where "+Argde.attributes.sentiment.columnName+" is not NULL;",
		function(err, sentiments){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					var sentiment_values = [];
					sentiments.rows.forEach(function(sentiment){
						sentiment_values.push(String(sentiment['sentiment']));
					});

					var query = "select * from "+Label_frequency.tableName+" where (";

					for(i in sentiment_values)
					{
						if(i == (sentiment_values.length-1))
						{
							query = query + Label_frequency.attributes.class_label.columnName+"='"+sentiment_values[i]+"'";
						}
						else
						{
							query = query + Label_frequency.attributes.class_label.columnName+"='"+sentiment_values[i]+"' or ";
						}
					}
					query = query + ") and "+Label_frequency.attributes.code.columnName+"='"
					+req.param('collection')+"' order by "+Label_frequency.attributes.date.columnName+","
					+Label_frequency.attributes.hour.columnName+","
					+Label_frequency.attributes.minute.columnName+";";

					Label_frequency.query(query,function(err, records){
						if(err)
						{
							sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
							return res.serverError(err);
						}
						else
						{
							sails.log.info("Sentiment data retrieved, passing to view");
							return res.view('Dashboard/sentiment_freq', {sentiment_data: records.rows});
						}
					});
				}
			}
		);
	},
	retrieveClass: function(req, res){
		Argde.query("select distinct "+Argde.attributes.aidr_class_label.columnName+" from "
		+Argde.tableName+" where "+Argde.attributes.aidr_class_label.columnName+" is not NULL;",
		function(err, classes){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					var class_values = [];
					classes.rows.forEach(function(eachclass){
						class_values.push(String(eachclass['aidr_class_label']));
					});

					var query = "select * from "+Label_frequency.tableName+" where (";

					for(i in class_values)
					{
						if(i == (class_values.length-1))
						{
							query = query + Label_frequency.attributes.class_label.columnName+"='"+class_values[i]+"'";
						}
						else
						{
							query = query + Label_frequency.attributes.class_label.columnName+"='"+class_values[i]+"' or ";
						}
					}
					query = query + ") and "+Label_frequency.attributes.code.columnName+"='"
					+req.param('collection')+"' order by "+Label_frequency.attributes.date.columnName+","
					+Label_frequency.attributes.hour.columnName+","
					+Label_frequency.attributes.minute.columnName+";";

					Label_frequency.query(query,function(err, records){
						if(err)
						{
							sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
							return res.serverError(err);
						}
						else
						{
							sails.log.info("Class data retrieved, passing to view");
							return res.view('Dashboard/class_freq', {class_data: records.rows});
						}
					});
				}
			}
		);
	},
};