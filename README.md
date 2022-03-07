# shop-api
Allow CRUD operations on a retail shop products database and also enable adding products to a wishlist.

## Deployment
API: <a href="https://www.heroku.com">Heroku.com<a/> <br>
Database: <a href="https://www.mongodb.com/atlas/database">Mongodb cloud<a/> <br>
  
## Testing
Use <a href="https://www.postman.com/">PostMan<a/> to test e.g <br>

GET all products saved. https://shop-api-01.herokuapp.com/product <br>
<img src="https://github.com/nmsteve/shop-api/blob/main/img/get-shop.PNG">
 
ADD(POST) Products to the database. https://shop-api-01.herokuapp.com/product <br>
<img src="https://github.com/nmsteve/shop-api/blob/main/img/post-shop.PNG">

## Running locally
1.Download and install nodejs and npm: <br>
 For Windows and Mac use https://nodejs.org/en/download/ <br>
 For Ubuntu use this guide https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04 <br>
2.Open the terminal/cmd and run:*git clone https://github.com/nmsteve/shop-api.git* <br>
3.Install <a href="https://docs.mongodb.com/manual/administration/install-community/"> MongoDB Community Edition server <a/> and follow the guide to have Mongodb running locally. <br>
5.In server.js replace the URL in mongoose.connect {} with mongodb://localhost/shop
