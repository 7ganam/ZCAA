require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('../models/users');
const userRouter = express.Router();
const cors = require('./cors');
var _ = require('lodash');



userRouter.use(bodyParser.json());
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const jwt = require('jsonwebtoken');



const verify_google_email = (req, res, next) => { // verifies the email used to sign in is a zc email and adds the user object to req
  console.log(1)
  // console.log(req.body)
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.OAUTH2ClIENT);
  async function verify() {
    const use_google_oauth = false // google cloud verification takes a long time suddenly .. they might have a problem on their servers .. disaple it for development and rely on client side verification.

    let payload = {}
    let userid = ""
    let g_picture = ""
    let zc_email = ""

    if (use_google_oauth) {
      const ticket = await client.verifyIdToken({
        idToken: req.body.google_data.tokenObj.id_token,
        audience: process.env.OAUTH2ClIENTAUDIENCE,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      payload = ticket.getPayload();
      userid = payload['sub'];
      g_picture = payload.picture;
      zc_email = payload.email;
      if (!_.has(payload, 'hd')) {
        const prod_error = new Error('google says this email isnt a zewail city email.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (_.has(payload, 'hd') && payload.hd != 'zewailcity.edu.eg') {
        const prod_error = new Error('google says this email isnt a zewail city email 2.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (!payload.email_verified) {
        const prod_error = new Error('google says this email isnt verified.');
        prod_error.status = "500"
        return next(prod_error)
      }
    }
    else {
      payload = req.body.google_data;
      userid = payload.profileObj.googleId;
      g_picture = payload.profileObj.imageUrl;
      zc_email = payload.profileObj.email;
      console.log('userid', userid)
      console.log('g_picture', g_picture)
    }
    console.log(1.1)
    req.user = {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,
      first_name: req.body.form_state.first_name,
      first_name: req.body.form_state.first_name,
      last_name: req.body.form_state.last_name,
      email: req.body.form_state.email,
      exp_field: req.body.form_state.exp_field,
      new_exp_field: req.body.form_state.new_exp_field,
      residency: req.body.form_state.residency,
      content: req.body.form_state.content,
      phone: req.body.form_state.phone,
      birth_day: req.body.form_state.birth_day,
      birth_year: req.body.form_state.birth_year,
      address: req.body.form_state.address,
      zc_id: req.body.form_state.zc_id,
      grad_year: req.body.form_state.grad_year,
      major: req.body.form_state.major,
      minor: req.body.form_state.minor,
      other_undergraduate_data: req.body.form_state.other_undergraduate_data,
      universities: _.without(req.body.form_state.universities, undefined, null, ""),
      entities: _.without(req.body.form_state.entities, undefined, null, ""),
    }
    next();
  }
  verify().catch(console.error);

}




const attach_login_user = (req, res, next) => { // verifies the email used to sign in is a zc email and adds the user object to req
  console.log(1)
  // console.log(req.body)
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client(process.env.OAUTH2ClIENT);
  async function verify() {
    const use_google_oauth = false // google cloud verification takes a long time suddenly .. they might have a problem on their servers .. disaple it for development and rely on client side verification.

    let payload = {}
    let userid = ""
    let g_picture = ""
    let zc_email = ""

    if (use_google_oauth) {
      const ticket = await client.verifyIdToken({
        idToken: req.body.google_data.tokenObj.id_token,
        audience: process.env.OAUTH2ClIENTAUDIENCE,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      payload = ticket.getPayload();
      userid = payload['sub'];
      g_picture = payload.picture;
      zc_email = payload.email;
      if (!_.has(payload, 'hd')) {
        const prod_error = new Error('google says this email isnt a zewail city email.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (_.has(payload, 'hd') && payload.hd != 'zewailcity.edu.eg') {
        const prod_error = new Error('google says this email isnt a zewail city email 2.');
        prod_error.status = "500"
        return next(prod_error)
      }
      else if (!payload.email_verified) {
        const prod_error = new Error('google says this email isnt verified.');
        prod_error.status = "500"
        return next(prod_error)
      }
    }
    else {
      payload = req.body.google_data;
      userid = payload.profileObj.googleId;
      g_picture = payload.profileObj.imageUrl;
      zc_email = payload.profileObj.email;

    }
    console.log(1.1)
    req.user = {
      g_userid: userid,
      g_picture: g_picture,
      zc_email: zc_email,
      g_name: payload.name,

    }
    next();
  }
  verify().catch(console.error);

}



userRouter.route('/signup')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .post(cors.corsWithOptions, verify_google_email,
    async (req, res, next) => {
      // console.log("8888888888888888888888888888888888888888888888")
      // console.log("req.user", req.user)
      // add the json object to the database
      console.log(2)


      // -------------------- LOOK DATABASE FOR THE USER ------------------------
      try {
        user_search_result = await Users.find({ zc_email: req.user.zc_email })

      }
      catch (dev_err) {
        const prod_error = new Error('error whiling searching for user');
        prod_error.status = "500"
        return next(dev_err)
        // return next(prod_error)
      };


      console.log(3)


      if (user_search_result.length < 1 || user_search_result == undefined) { // case no user found registerd already // if the user didn't sign before register it and return succes message

        // CREATE THE USER----------------------
        let created_user;
        try {
          created_user = await Users.create(req.user)
        }
        catch (dev_err) {
          const prod_error = new Error('signing up failed, please try later.');
          prod_error.status = "500"
          return next(dev_err)
          // return next(prod_error)
        };
        console.log("created_user", created_user)


        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 10000;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
          token = jwt.sign(
            { user: created_user },
            TOKEN_SECRET_KEY,
            { expiresIn: expiration_time_in_hours + 'h' }
          );
        } catch (dev_err) {
          const prod_error = new Error('signing up failed, please try later.');
          prod_error.status = "500"
          return next(dev_err)
          // return next(prod_error)
        }

        // SEND TOKEN AND USER RESPONSE----------------------
        res
          .status(201)
          .json({
            message: 'success',
            expirateion_date_string: expirateion_date_string,
            user: created_user,
            token: token
          });
      }
      else { // case we found user already applied before

        console.log(4)


        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 10000;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
          token = jwt.sign(
            { user: user_search_result },
            TOKEN_SECRET_KEY,
            { expiresIn: expiration_time_in_hours + 'h' }
          );
        } catch (dev_err) {
          const prod_error = new Error('signing up failed, please try later.');
          prod_error.status = "500"
          return next(dev_err)
          // return next(prod_error)
        }

        // SEND TOKEN AND USER RESPONSE----------------------
        console.log(5)

        res
          .status(201)
          .json({
            message: 'already_applied_before',
            expirateion_date_string: expirateion_date_string,
            user: user_search_result[0],
            token: token
          });
      }

    });




userRouter.route('/login') //TODO:  add false log in 
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .post(cors.corsWithOptions, attach_login_user,
    async (req, res, next) => {
      const { email, password } = req.body;

      // seach database for the same email
      let existingUser;
      try {
        existingUser = await Users.findOne({ zc_email: req.user.zc_email });
        console.log({ existingUser })
      } catch (dev_err) {
        const prod_error = new Error('Loggin in failed, please try again later.')
        prod_error.status = "500"
        return next(prod_error);
      }


      if (!existingUser) {
        return res
          .status(442)
          .json({
            message: 'Failed to login, you are not a member.',
          });
      }
      else {
        // GENERATE TOKEN----------------------
        let token;
        let expiration_time_in_hours = 10000;//TODO: make the token expiration in the front end  ... i will leave this huge number as is now
        let expiration_date = new Date(new Date().getTime() + expiration_time_in_hours * 60 * 60 * 1000);
        let expirateion_date_string = expiration_date.toISOString();
        try {
          token = jwt.sign(
            { user: existingUser },
            TOKEN_SECRET_KEY,
            { expiresIn: expiration_time_in_hours + 'h' }
          );
        } catch (dev_err) {
          const prod_error = new Error('logging in failed, please try later.');
          prod_error.status = "500"
          return next(dev_err)
          // return next(prod_error)
        }

        // SEND TOKEN AND USER RESPONSE----------------------
        console.log(5)

        res
          .status(201)
          .json({
            message: 'success',
            expirateion_date_string: expirateion_date_string,
            user: existingUser,
            token: token
          });
      }





    });



module.exports = userRouter;

function auth(req, res, next) {
  console.log("************************************************************");
}