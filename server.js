var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(
  
  `mongodb+srv://mwaura:${process.env.PASS}@cluster0.1utxg.mongodb.net/shop?retryWrites=true&w=majority`,
 //"mongodb://localhost/shop",
  
  
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("`open", function () {
  console.log("Connected successfully");
});

var Product = require('./model/product');
var WishList = require('./model/wishlist');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(request, response) {
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, savedProduct) {
       if (err) {
           response.status(500).send({error:"Could not save product"});
       } else {
           response.send(savedProduct);
       }
    });
});

app.get('/product', function(request, response) {

    Product.find({},function(err, products) {
        if (err) {
            response.status(500).send({error: "Could not fetch products"});
        } else {
            response.send(products);
        }
    });
});

app.get('/wishlist', function(request, response) {
   WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists) {
       if (err) {
           response.status(500).send({error:"Could not fetch wishlists"});
       } else {
           response.status(200).send(wishLists);
       }
   })
});

app.post('/wishlist', function(request, response) {
    var wishList = new WishList();
    wishList.title = request.body.title;

    wishList.save(function(err, newWishList) {
       if (err) {
           response.status(500).send({error: "Could not create wishlist"});
       } else {
           response.send(newWishList);
       }
    });
});

app.put('/wishlist/product/add', function(request, response) {
   Product.findOne({_id: request.body.productId}, function(err, product) {
       if (err) {
           response.status(500).send({error:"Could not add item to wishlist"});
       } else {
           WishList.updateOne({_id:request.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList) {
               if (err) {
                   response.status(500).send({error:"Could not add item to wishlist"});
               } else {
                   response.send("Successfully added to wishlist");
               }
           });
       }
   })
});

port = process.env.PORT|| 3005

app.listen(port, function() {
    console.log("Swag Shop API running on port 3005...");
});
