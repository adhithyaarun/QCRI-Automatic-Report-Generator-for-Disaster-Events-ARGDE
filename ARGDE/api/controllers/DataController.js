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
				for(i in records)
				{
					records[i].code = req.param('collection');
				}
				res.send({minute_data: records});
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
				for(i in records)
				{
					records[i].code = req.param('collection');
				}
				res.send({hour_data: records});
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
				for(i in records)
				{
					records[i].code = req.param('collection');
				}
				res.send({day_data: records});
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
				for(i in records)
				{
					records[i].code = req.param('collection');
				}
				res.send({label_data: records});
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
							for(i in records.rows)
							{
								records.rows[i].code = req.param('collection');
							}
							res.send({sentiment_data: records.rows});
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
							for(i in records.rows)
							{
								records.rows[i].code = req.param('collection');
							}
							res.send({class_data: records.rows});
						}
					});
				}
			}
			);
	},
	retrieveDamage: function(req, res){
		Argde.query("select distinct "+Argde.attributes.image_damage_class.columnName+" from "
			+Argde.tableName+" where "+Argde.attributes.image_damage_class.columnName+" is not NULL;",
			function(err, damage_classes){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	"+"Error code: "+err.code);
					return res.serverError(err);
				}
				else
				{
					var damage_values = [];
					damage_classes.rows.forEach(function(eachclass){
						damage_values.push(String(eachclass['image_damage_class']));
					});

					var query = "select * from "+Label_frequency.tableName+" where (";

					for(i in damage_values)
					{
						if(i == (damage_values.length-1))
						{
							query = query + Label_frequency.attributes.class_label.columnName+"='"+damage_values[i]+"'";
						}
						else
						{
							query = query + Label_frequency.attributes.class_label.columnName+"='"+damage_values[i]+"' or ";
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
							sails.log.info("Image Damage Class data retrieved, passing to view");
							for(i in records.rows)
							{
								records.rows[i].code = req.param('collection');
							}
							res.send({damage_data: records.rows});
						}
					});
				}
			}
			);
	},
	retrieveRelevancy: function(req, res){
		var relevancy_values = ['ir_true', 'ir_false'];
		var query = "select * from "+Label_frequency.tableName+" where (";
		for(i in relevancy_values)
		{
			if(i == (relevancy_values.length-1))
			{
				query = query + Label_frequency.attributes.class_label.columnName+"='"+relevancy_values[i]+"'";
			}
			else
			{
				query = query + Label_frequency.attributes.class_label.columnName+"='"+relevancy_values[i]+"' or ";
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
				sails.log.info("Image Relevancy data retrieved, passing to view");
				for(i in records.rows)
				{
					records.rows[i].code = req.param('collection');
				}
				res.send({relevancy_data: records.rows});
			}
		});
	},
	retrieveTweets: function(req, res){
		var resolution = req.param('resolution');
		var res_value = req.param('res_value');
		var filter = req.param('filter');
		var filter_value = req.param('value');
		var collection = req.param('code');
		var query_text = "select "+Argde.attributes.tweet_text.columnName+", "
		+Argde.attributes.createdAt.columnName+" from "+Argde.tableName+" where ";
		var query_img = "select "+Argde.attributes.image_physical_location.columnName+", "
		+Argde.attributes.createdAt.columnName+" from "+Argde.tableName+" where ";
		var res_texts = [];
		var res_imgs = [];

		switch(filter)
		{
			case 'class':
			query_text += Argde.attributes.aidr_class_label.columnName+"='"+filter_value+"' and ";
			query_img += Argde.attributes.aidr_class_label.columnName+"='"+filter_value+"' and ";
			break;
			case 'sentiment':
			query_text += Argde.attributes.sentiment.columnName+"='"+filter_value+"' and ";
			query_img += Argde.attributes.sentiment.columnName+"='"+filter_value+"' and ";
			break;
			case 'relevancy':
			query_text += Argde.attributes.image_relevancy.columnName+"='"+filter_value+"' and ";
			query_img += Argde.attributes.image_relevancy.columnName+"='"+filter_value+"' and ";
			break;
			case 'damage':
			query_text += Argde.attributes.image_damage_class.columnName+"='"+filter_value+"' and ";
			query_img += Argde.attributes.image_damage_class.columnName+"='"+filter_value+"' and ";
			break;
			case 'frequency':
			break;
			default:
			break;
		}

		switch(resolution)
		{
			case 'minute':
			query_text += Argde.attributes.updatedAt.columnName+">=timestamp '"+res_value+"' and "
			+Argde.attributes.updatedAt.columnName+"<timestamp '"+res_value+"'+interval '1 minute'";
			query_img += Argde.attributes.updatedAt.columnName+">=timestamp '"+res_value+"' and "
			+Argde.attributes.updatedAt.columnName+"<timestamp '"+res_value+"'+interval '1 minute'";
			break;
			case 'hour':
			query_text += Argde.attributes.updatedAt.columnName+">=timestamp '"+res_value+"' and "
			+Argde.attributes.updatedAt.columnName+"<timestamp '"+res_value+"'+interval '1 hour'";
			query_img += Argde.attributes.updatedAt.columnName+">=timestamp '"+res_value+"' and "
			+Argde.attributes.updatedAt.columnName+"<timestamp '"+res_value+"'+interval '1 hour'";
			break;
			case 'day':
			query_text += Argde.attributes.updatedAt.columnName+">=timestamp '"+res_value+"' and "
			+Argde.attributes.updatedAt.columnName+"<timestamp '"+res_value+"'+interval '1 day'";
			query_img += Argde.attributes.updatedAt.columnName+">=timestamp '"+res_value+"' and "
			+Argde.attributes.updatedAt.columnName+"<timestamp '"+res_value+"'+interval '1 day'";
			break;
			default:
			break;
		}

		query_text += " and "+Argde.attributes.code.columnName+"='"+collection+"' order by "+Argde.attributes.updatedAt.columnName+" asc;";
		query_img += " and "+Argde.attributes.code.columnName+"='"+collection+"' order by "+Argde.attributes.updatedAt.columnName+" asc;";

		Argde.query(query_text, function(err, tweet_texts){
			if(err)
			{
				sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
			}
			else
			{
				sails.log.info("Tweet texts retrieved for "+res_value);
				if(tweet_texts.rows.length > 0)
				{
					for(i in tweet_texts.rows)
					{
						let temp = {text:	tweet_texts.rows[i].tweet_text, time: tweet_texts.rows[i].created_at};
						res_texts.push(temp);
					}
				}
			}
			Argde.query(query_img, function(err, tweet_images){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
				}
				else
				{
					sails.log.info("Tweet images retrieved for "+res_value);
					if(tweet_images.rows.length > 0)
					{
						for(i in tweet_images.rows)
						{
							let temp = {image: tweet_images.rows[i].image_physical_location, time: tweet_images.rows[i].created_at};
							res_imgs.push(temp);
						}
					}
				}
				res.send({texts: res_texts, images: res_imgs});
			});
		});
	},
	retrieveAll: function(req, res){
		let collection = req.param('name');
		var queries = {
			minute: "/get_minute?collection="+collection,

			hour: "/get_hour?collection="+collection,

			day: "/get_day?collection="+collection,

			label: "/get_label?collection="+collection,

			class: "/get_class?collection="+collection,

			sentiment: "/get_sentiment?collection="+collection,

			damage: "/get_damage?collection="+collection,

			relevancy: "/get_relevancy?collection="+collection,

			tweets: "/get_tweets",
		};
		res.view('visual/visualize', {queries: queries});
	},
};
