const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const ExpressError = require('../utils/expresserror');
const Campground = require('../models/campground');
const review = require('../models/review');
const { is } = require('express/lib/request');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
//local directory
//using MVC

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);


router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    // router.post('/', upload.array('image'), (req, res) => {
    //     console.log(req.body, req.files);
    //     res.send("It Worked")
    //         //we can use array instead of image where we can upload multiple images just give multiple as argument in input in new.ejs and here change image by array
    // })
router.get('/:id', catchAsync(campgrounds.showPage));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;