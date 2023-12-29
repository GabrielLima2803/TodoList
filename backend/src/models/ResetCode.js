const mongoose = require('mongoose')

const ResetCode = mongoose.model('ResetCode', {
    email: String,
    code: String,
    expiration: Date
  });

  
  module.exports = ResetCode;