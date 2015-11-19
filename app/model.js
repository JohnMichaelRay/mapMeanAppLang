var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User SChema
var UserSchema = new Schema({
    username: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: String, required: true},
    lang: {type: String, required: true},
    location: {type: String, required: true},
    verified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at){
        this.created_at = now
    }
});

// indexes
UserSchema.index({location: '2dspere'});
//exports
module.exports = mongoose.model('', UserSchema);