const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
  name: {
    type: String,
    unique: 1,
    required: true,
    maxlength: 100,
  },
});

const Wood = mongoose.model('Wood', woodSchema);

module.exports = { Wood };
