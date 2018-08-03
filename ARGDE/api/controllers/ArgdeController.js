/*
	The following variables allow us to have access to the functions of other
	controllers of the web app.
*/
var hourController = require('./Hour_frequencyController');
var dayController = require('./Day_frequencyController');
var minuteController = require('./Minute_frequencyController');
var labelController = require('./Label_frequencyController');
/*
	DOC:
		Purpose:
			The following object contains the functions that we have used and
			associated with routes.
*/
module.exports = {
	/*
		DOC:
			Purpose:
				The following function initiates precomputation routines on the existing
				data and aggregates it into a smaller, visualizable dataset based on a
				set of (7) parameters or filters such as:
					(1) By day
					(2) By hour
					(3) By minute
					(4) By class label
					(5) By sentiment
					(6) By image damage class
					(7) By image relevancy
				The following function calls the appropriate functions of other
				controllers that handle the data aggregation of different
				filter/parameters. The function also collects some basic general data
				for the provided dataset. They are:
					(i) Minimum (earliest) Date
					(ii) Maximum (latest) Date
					(iii) Difference of dates between (i) & (ii)
			Working:
				The function resets the precomputation progress indicator flags after
				which it does database queries to obtain the above mentioned
				(i), (ii) & (iii). After this, the function makes asynchronous calls to
				the corresponding responsible functions that aggregate the data
				collected and return it back to the database. The function validates
				the fact that data is sent and that is a collection code or not.
	*/
	precompute: function(req, res){
		// Reset precomputation progress indicator flags
		Argde.precomputation['day'] = false;
		Argde.precomputation['hour'] = false;
		Argde.precomputation['minute'] = false;
		Argde.precomputation['label'] = false;
		Argde.precomputation['sentiment'] = false;
		Argde.precomputation['damage'] = false;
		Argde.precomputation['image_relevancy'] = false;

		// Other variable initializations and declarations
		var collection_name = req.param('collection');
		var min_date;
		var max_date;
		var date_diff;
		var paramList;

		/*
			If no collection code is provided, redirect to precomputation
			intiation page and prompt for collection code
		*/
		if(!collection_name)
		{
			let noCollectionNameError = [{name: 'noCollectionName', message: 'Please enter a collection code.'}];
			req.session.flash = {err: noCollectionNameError};
			return res.redirect('/precompute');
		}

		/*
			Queries for minimum date, maximum date and difference between the dates
		*/
		// Query for minimum date
		Argde.query("select min("+Argde.attributes.updatedAt.columnName+") from "+Argde.tableName+" where "
			+Argde.attributes.code.columnName+"='"+collection_name+"';",
			function(err, result){
				if(err)
				{
					sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
					return res.serverError(err);
				}
				else if(result.rows[0].min == null)
				{
					let invalidCollectionNameError = [{name: 'invalidCollectionName', message: 'Invalid code entered. Please enter a valid collection code.'}];
					req.session.flash = {err: invalidCollectionNameError};
					return res.redirect('/precompute');
				}
				else
				{
					min_date = new Date(result.rows[0].min);

					// Query for maximum date
					Argde.query("select max("+Argde.attributes.updatedAt.columnName+") from "+Argde.tableName+" where "
						+Argde.attributes.code.columnName+"='"+collection_name+"';",
						function(err, result){
							if(err)
							{
								sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
								return res.serverError(err);
							}
							else
							{
								max_date = new Date(result.rows[0].max);

								// Query for difference between the dates
								Argde.query("select date(max("+Argde.attributes.updatedAt.columnName+"))-date(min("
									+Argde.attributes.updatedAt.columnName
									+")) from "+Argde.tableName+" where "+Argde.attributes.code.columnName+"='"+req.param('collection')
									+"';",function(err, result){
										if(err)
										{
											sails.log.error("Error name: "+err.name+"	 "+"Error code: "+err.code);
											return res.serverError(err);
										}
										else
										{
											date_diff = result.rows[0]['?column?'];
											paramList={'min':min_date, 'max':max_date, 'diff':date_diff, 'collection': req.param('collection')};

											/*
												Function calls to appropriate functions in other
												controllers to precompute by various filters.
											*/
											// Precompute minute-wise
											minuteController.createPreMinutes(paramList);

											/*
												Precompute:
													(1) label-wise
													(2) class-wise
													(3) image damage class-wise
													(4) sentiment-wise
													(5) image relevancy-wise
											*/
											labelController.createPreLabels(paramList);

											// Precompute hour-wise
											hourController.createPreHours(paramList);

											// Precompute day-wise
											dayController.createPreDays(paramList);
										}
									});
							}
						});
				}
			});
		req.session.collection = collection_name;

		// Redirect to progress page
		res.redirect('/precomputation_progress');
	},
	/*
		DOC:
			Purpose:
				The following function generates the link for the visualization page
				for the recently precomputed data for a particular collection code.
			Working:
				The function simply joins the baseURL (domain name) to the route for
				displaying visualized data and adds the parameter as the recently
				precomputed collection's code to the URL and returns it in a string
				format that can be copied/navigated to from the web page.
	*/
	precompute_done: function(req, res){
		if(req.session.collection)
		{
			// Collection code
			var collection = req.session.collection;

			delete req.session.collection;

			// Domain name (in development: localhost:1337)
			var pre_url = sails.getBaseurl();

			// Route extension for visualization (not in required form)
			var the_url_raw = sails.getUrlFor('DataController.retrieveAll');

			// Refined route as per required for URL
			var the_url = the_url_raw.substr(0, the_url_raw.length - 5);

			// Aggregation of all parts of the URL with the collection code
			var url = pre_url + the_url + collection;

			return res.view('admin/precomputation_complete', { graphs_url: url});
		}
		/*
			In case this route is manually navigated to, or if this route is
			navigated	to without the initiation of any precomputation, redirect
			to precomputation initiation page .
		*/
		else
		{
			var noComputationInitiatedError = [{name: 'noComputationInitiated', message: 'Please initiate precomputation to obtain URL for visualization for the corresponding collection.'}];
			req.session.flash = {err: noComputationInitiatedError};
			return res.redirect('/precompute');
		}
	},
	/*
		DOC:
			Purpose:
				The following function responds to socket requests from front end with the status of
				completion of the precomputation tasks based on different segments of
				aggregation
			Working:
				The precomputation function	sets flags as database queries for each section
				completes. The following function simply counts the number of flags that are
				set and sends it in the form of a precentage for the progress bar to display
				the completion progress.

			NOTE: The flags used here are part of the 'Argde' model.
	*/
	getProgress: function(req, res){
		// Initializations START
		var count = 0;			// Number of flags that have been set
		var progress = 0;		// Progress in percentage
		// Initializations END

		if(Argde.precomputation['day'] == true)
		{
			count += 1;
		}
		if(Argde.precomputation['hour'] == true)
		{
			count += 1;
		}
		if(Argde.precomputation['minute'] == true)
		{
			count += 1;
		}
		if(Argde.precomputation['label'] == true)
		{
			count += 1;
		}
		if(Argde.precomputation['sentiment'] == true)
		{
			count += 1;
		}
		if(Argde.precomputation['damage'] == true)
		{
			count += 1;
		}
		if(Argde.precomputation['image_relevancy'] == true)
		{
			count += 1;
		}
		progress = (count/7)*100;
		sails.log.info('Sending progress data');

		return res.send({progress: progress});
	},
};
