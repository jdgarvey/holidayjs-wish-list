var util = require('util'),
	OperationHelper = require('apac').OperationHelper,
	_ = require('lodash');

module.exports = function(app) {
	var opHelper = new OperationHelper({
		awsId: 'AKIAJUG5QBQFJYFPLZSQ',
		awsSecret: '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',
		assocId: 'kpin0c-20'
	});

	app.get('/products', function(req, resp) {
		opHelper.execute('ItemSearch', {
			'SearchIndex': 'All',
			'Keywords': req.params.keywords,
			'ResponseGroup': 'ItemAttributes, Images'
		}, function(err, results) {
			resp.send(_.map(results.ItemSearchResponse.Items[0].Item, function(item) {

				var result = {
					image: item.MediumImage[0].URL[0],
					title: item.ItemAttributes[0].Title[0]
				};

				_.forEach(item.ItemLinks[0].ItemLink, function(itemLink) {
					if (itemLink.Description[0] === 'Add To Wishlist') {
						result.wish = itemLink.URL[0];
					}
				});

				return result;

			}));
		});
	});
};