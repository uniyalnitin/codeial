const Contact = require("../models/contact");

module.exports.userProfile = function (req, res) {
  return res.send("User Profile");
};

module.exports.userPost = function (req, res) {
  name = req.body.name;
  phone = req.body.phone;
  Contact.create(
    {
      name: name,
      phone: phone,
    },
    function (err) {
      if (err) {
        console.error.bind(console, "Cannot create Contact");
        return;
      }
      console.log("Successfully created new contact");
      return res.send("back");
    }
  );
};
