//Require Mongoose
var mongoose = require('mongoose');


var QuizQuestionSchema = new mongoose.Schema({
  web_url: String,
  postDate: Date,
  headline: String,
  text_body: String,
  correct_answer_url: String,
  num_correct: Number,
  num_attempted: Number,
  options: []
});


// Virtual for quizQuestion's URL
QuizQuestionSchema
.virtual('url')
.get(function () {
  return '/models/quiz_question/' + this._id;
});

//Creating a model from schema we've just made, and exporting it to be used elsewhere
module.exports = mongoose.model('QuizQuestion', QuizQuestionSchema);
