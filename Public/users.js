var mongoose = require('mongoose');
var bcrypt = require('bcrypt');



var promise = mongoose.connect('mongodb://vacinamaster:123456@ds035703.mlab.com:35703/vacinas', {
  useMongoClient: true,
  /* other options */
});

var UserSchema = new mongoose.Schema({
  nome_completo: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true
  },
  username: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true
  },
  password: {
    type: String, 
    required: true,
  },
  passwordConf: {
    type: String, 
    required: true,
  }
});

//hashing a password before saving it to the database

  
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;