const db = require('../config/connection');
const { User, Post, Comment } = require('../models/');
const userSeeds = require("./users.json");
const postSeeds = require("./posts.json");


db.once('open', async () => {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Post.deleteMany({});
    await Post.create(postSeeds);
    

    console.log("All done!");
    process.exit(0);
});
