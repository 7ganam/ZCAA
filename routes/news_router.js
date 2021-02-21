let express = require('express');
let news_router = express.Router();
let upload = require('../config/multer.config.js');


const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const NewsPosts = require('../models/newsPosts');


const cors = require('./cors');


const awsWorker = require('../controllers/aws.controller.js');

news_router.post('/image_upload', upload.single("image"), awsWorker.doUpload);

news_router.route('/new_post')
    .post(
        cors.corsWithOptions
        ,
        async (req, res, next) => { //setting course to database middleware 
            let recieved_newsposts;
            try {
                recieved_newsposts =
                {
                    meta_values: req.body.meta_values,
                    EditorData: req.body.EditorData,
                }
                console.log(recieved_newsposts)
            }
            catch (dev_error) {
                let prod_error = new Error("failed to register news posts")
                prod_error.status = "500";
                // return next(prod_error)
                return next(dev_error)
            }

            try {
                let created_newsposts = await NewsPosts.create(recieved_newsposts);
                console.log(' created_newsposts ', created_newsposts);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(created_newsposts._id);
            }
            catch (dev_error) {
                let prod_error = new Error("failed to register course")
                prod_error.status = "500";
                return next(dev_error)
                // return next(prod_error)
            }

        })


news_router.route('/news_posts')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        NewsPosts.find({})
            .then((newsposts) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newsposts);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

news_router.route('/news_posts/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .delete(cors.corsWithOptions,
        (req, res, next) => {
            NewsPosts.findByIdAndRemove(req.params.dishId)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => { return next(err) });
        });


module.exports = news_router;