const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    const user = await User.findOne({email: req.body.email});
    
    if(!user || user.password != req.body.password){
        return res.json(422, {
            message: "Invalid Username or Password!"
        });
    }
    return res.json(200, {
        message: "Successfully SignedIn!",
        data: jwt.sign(user.toJSON(), 'codeial', {expiresIn: "100000"})
    });
}