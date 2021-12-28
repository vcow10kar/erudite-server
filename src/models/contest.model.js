const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    title: {type: String, trim: true, required: true},
    type: {type: String, trim: true, required: true},
    deadline: {type: Date, trim: true, required: true},
    tags: [{type: String, trim: true, required: true}],
    duration: {type: String, trim: true, required: true},
    marks: {type: String, trim: true, required: true, min:0, max: 100000},
    batchNo: {type: String, trim: true, required: true, minlength: 4, maxlength: 8}
}, {
    versionKey: false,
    timestamps: true
});

const Contest = new mongoose.model('contest', contestSchema);
module.exports = Contest;