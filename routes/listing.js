const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// new route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});


// index route
// create route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[Image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// show route
// update route
// delete route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing))
    .put(isLoggedIn, isOwner, upload.single('listing[Image]'),
        validateListing, wrapAsync(listingController.updateListing)
    );


// edit route
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;