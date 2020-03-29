const dotenv = require("dotenv");
dotenv.config();

console.log(`Connecting to db at ${process.env.DB_URL}`);

const mongoose = require('mongoose');
const db_url = process.env.DB_URL || "localhost";
const db_user = process.env.DB_USER || "root";
const db_pass = process.env.DB_PASS || "rootpassword";
const db_name = "test";

/* Connecting to DB 
*/
mongoose.connect(`mongodb://${db_url}`, {useNewUrlParser: true, useUnifiedTopology: true, user: db_user, pass: db_pass});
var db = mongoose.connection;
/* Handle connection status */
db.on('error', function(err) {
    console.log("You fucked up : ", err)
}
);
db.once('open', function() {
    console.log("Connected to DB !");
});

/* Declaring a simple table/schema 
*/
var UserSchema = new mongoose.Schema({
    name: String,
})
var User = mongoose.model("User", UserSchema);

/* Adding an entry 
*/
User.findOne({name: "ratouney"})
.then((res) => {
    if (res == null) {
        const me = new User({name: "ratouney"});
        me.save(function(err, res) {
            console.log('Created test user :', res);
        })
    } else {
        console.log("Test user existst : ", res);
    }
})
.catch((err) => {
    console.log("User doesn't exist, create him");
    const me = new User({name: "ratouney"});
    me.save(function(err, res) {
        console.log("Yo : ", err);
        console.log("Eyy : ", res);
    })
})

const express = require('express')
const app = express()
const port = 3000

/* Default route 
*/
app.get('/', (req, res) => res.send('Hello World!'))

/* Route that returns a user
*/
console.log("Yes, it has the user route !");
app.get('/user', (req, res) => {
    const result = User.find((err, data) => {
        console.log("Error : ", err);
        console.log("Result : ", data);
        res.json(data[0]);
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))