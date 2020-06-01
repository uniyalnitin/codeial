const Contact = require("../models/contact");

module.exports.home = function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log(err);
      return;
    }
    return res.send(contacts);
  });
};
