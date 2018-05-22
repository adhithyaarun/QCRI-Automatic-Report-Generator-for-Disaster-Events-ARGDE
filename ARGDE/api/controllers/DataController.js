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
};
