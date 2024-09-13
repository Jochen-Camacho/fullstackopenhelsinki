const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
});

commentSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
