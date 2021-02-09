//passport config
//add local strategy if needed

const { User } = require('../models');

module.exports = function(passport) {

    passport.serializeUser((user, done) => done(null, user.id));
    
    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null,user);
        } catch(err) {
            done(err);
        }
    });

};