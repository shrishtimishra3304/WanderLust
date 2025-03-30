const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

const path = require('path');
const ejsMate = require('ejs-mate');
// 2.connect to mongodb
const MONGOURL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

async function main() {
    await mongoose.connect(MONGOURL);
}

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));


// 1.home route
app.get('/', (req, res) => {
    res.send('Home Route');
});


// 3.// 3. create a new route
// app.get('/testListing', async (req, res) => {
//     // res.send('Listings Route');
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "BY the beach",
//         price: 1200,
//         location: "calangut , goa",
//         // image: "https://unsplash.com/photos /1ZuQKQ6QwQY",
//         country: "India",
//         });
//     await sampleListing.save();
//     console.log("Sample listing saved");
//     res.send("successful testing");
// });

//index-route

app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { listings: allListings });
});

//new route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

    
//show route
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
});

//create route
app.post("/listings", async (req, res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    
    // console.log(listing);
})

//edit route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
});
//update route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});  
//delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

