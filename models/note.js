'use strict';
var mongoose = require('mongoose');

function validator (v) {
  return v.length >= 4;
}

var noteSchema = mongoose.Schema({
  noteBody: {type: String, validate: [validator, 'noteBody value has to be greater than 3'] }
});

module.exports = mongoose.model('Note', noteSchema);
