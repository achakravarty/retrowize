var mongoose = require('mongoose');

var boardSchema = {
	id: String,
	owner: { type: String, index: true },
	active: {type: Boolean, default: true},
	lanes: [{
      id:String,
      title: String,
			createdBy: String,
      cards: [{
        id: String,
        content: String,
        createdBy: String,
        votes: []
      }
    ]}
  ]
};

module.exports = mongoose.model('Board', boardSchema);
