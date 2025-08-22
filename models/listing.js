const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,

    // image: {
    //     filename: {
    //         type: String,
    //     },
    //     url: {
    //         type: String,

    //         default:
    //             "https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg",
    //         set: (v) =>
    //             v === ""
    //                 ? "https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg"
    //                 : v,
    //     },
    // },
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
