const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/new-space');

module.exports = mongoose.connection;


// ,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }