var mongoose = require('mongoose');

var boardSchema = {
	id: String,
	owner: { type: String, index: true },
	lanes: Array
}

module.exports = mongoose.model('Board', boardSchema);
