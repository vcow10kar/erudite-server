const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    name: {
        firstName: {type: String, trim: true, required: true},
        lastName: {type: String, trim: true, required: true}
    },
    city: {type: String, trim: true, required: true},
    age: {type: Number, trim: true, required: true, min: 10, max: 120},
    education: {type: String, trim: true, required: true},
    gender: {type: String, trim: true, required: true},
    contactNo: {type: Number, trim: true, required: true, min: 1000000000, max: 9999999999},
    batchNo: {type: String, trim: true, required: true, minlength: 4, maxlength:8},
    emailId: {type: String, trim: true, required: true},
    password: {type: String, trim: true, required: true}
}, {
    versionKey: false,
    timestamps: true
});

studentSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

studentSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

const Student = new mongoose.model('student', studentSchema);
module.exports = Student;