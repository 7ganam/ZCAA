const authRouter = require('express').Router();
const passport = require('passport');
const cors = require('./cors');




// The middleware receives the data from Google and runs the function on Strategy config
// callback route for google to redirect to
// hand control to passport to use code to grab profile info // the call back function defined in the passport strategy will be called ( it should setup user in database and add user object to the req )
authRouter.route('/google/redirect')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, passport.authenticate('google'), (req, res) => {
        res.send(req.user);
    });

// passport.authenticate middleware is used here to authenticate the request
//this will tell google to ask user for concent ... if ture google will call the redirct api entry ( defined in the google dev concol and in the passport stratgye setup file)
authRouter.route('/google')
    .options(cors.cors, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, passport.authenticate('google', {
        scope: ['profile'] // Used to specify the required data
    }));



module.exports = authRouter;