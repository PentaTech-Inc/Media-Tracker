const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    mediaID: { type: String, required: true, unique: true },
    mediaType: { type: String, required: true, unique: true },
    comments: [{ type: String }]
});

MediaSchema.pre('save', function (next) {
    // Check if document is new
    if (this.isNew) {
        // Saving reference to this because of changing scopes
        const document = this;

    } else {
        next();
    }
});


module.exports = mongoose.model('Media', MediaSchema);