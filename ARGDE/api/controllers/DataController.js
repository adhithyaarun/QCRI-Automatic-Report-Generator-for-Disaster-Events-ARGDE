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
					console.log(records);
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
					return res.view('Dashboard/label_freq', {label_data: records});
				}
			});
	},
};
