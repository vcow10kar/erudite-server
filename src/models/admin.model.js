const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
        firstName: {type: String, trim: true, required: true},
        lastName: {type: String, trim: true, required: true},
    },
    emailId: {type: String, trim: true, required: true},
    password: {type: String, trim: true, required: true}
}, {
    versionKey: false,
    timestamps: true
});

adminSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

adminSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

const Admin = new mongoose.model('admin', adminSchema);
module.exports = Admin;