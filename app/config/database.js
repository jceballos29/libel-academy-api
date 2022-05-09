const mongoose = require('mongoose');

const mongoDBConnection = () => {
  mongoose.connect(process.env.MONOGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log('Error connecting to MongoDB');
    } else {
      console.log('Connected to MongoDB');
    }
  }
  );
}

module.exports = mongoDBConnection;