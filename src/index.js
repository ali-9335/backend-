

const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const collection = require("./config.js");
const socketIO = require('socket.io');

const app = express();
const server = require('http').Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup",async(req,res)=>{
    const data={
        name: req.body.username,
        password: req.body.password
    }
 //check is the user already exist
 const existuser=await collection.findOne({name: data.name});
 if(existuser){
    res.send("User already exist Please choose different username.");
 }
 else{
    const saltRounds=10;
    const hashpass=await bcrypt.hash(data.password,saltRounds);
    data.password=hashpass;
    const userdata=await collection.insertMany(data);
    console.log(userdata);
 }
});

app.post("/login", async(req,res)=>{
    try{
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username not found.");
        }
        const passMatch = await bcrypt.compare(req.body.password, check.password);
        if (passMatch) {
            res.sendFile(path.join(__dirname, 'game.html'));
        } else {
            res.send("Wrong password.");
        }
    } catch (error) {
        console.error(error);
        res.send("Error occurred while logging in.");
    }
});

io.on('connection', (socket) => {
    console.log("A user has connected to the server");

    socket.on('name', (msg) => {
        io.emit('name', msg);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
