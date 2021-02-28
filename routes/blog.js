// Routes for frontend, meaning the actual blog a visior sees without any edit functionality

let express = require('express');
let router = express.Router();

const Post = require('../models/Post');
const Category = require('../models/Category');
const StaticContent = require('../models/StaticContent');

// All routes under /
router.get('/', async (req, res) =>  {
    try
    {
       //  const doc_allposts = await Post.giveAllCleanedSortedByDate();
        let doc_allposts = await Post.find({}).sort({date: 'descending'}).populate('category').lean();
        if (doc_allposts == undefined) throw new Error("No posts found, sorry.");
        let doc_allcats = await Category.find({}).sort({date: 'descending'}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_allposts); 
            console.log(doc_allcats);
            res.render('index', {post: doc_allposts, navlink: doc_allcats, isHome: true});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('index', { errors:[{text: 'There is a problem with loading the posts, sorry.'}], isHome: true});
    }
});

// router.get('/post', (req, res) => res.send('Post: Specific Post in Full Display'));
router.get('/post/:postID', async (req, res) => {
    try
    {
        console.log(req.params.postID);
        let doc_post = await Post.findById(req.params.postID).sort({date: 'descending'}).populate('category').lean();
        if (doc_post == undefined) throw new Error("No post found, sorry.");
        let doc_allcats = await Category.find({}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_post); 
            res.render('post', {post: doc_post, navlink: doc_allcats, activeNavlink: doc_post.category.name, isHome: false});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('post', { errors:[{text: 'There is a problem with loading the post, sorry.'}], isHome: false});
    }
});
router.get('/cat/:catID', async (req, res) => {
    try
    {
        console.log(req.params.catID);
        let doc_currentCat = await Category.findById(req.params.catID).lean();
        let doc_allposts = await Post.find({category: {_id: req.params.catID}}).sort({date: 'descending'}).populate('category').lean();
        if (doc_allposts == undefined) throw new Error("No posts of this category found, sorry.");
        let doc_allcats = await Category.find({}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_allposts); 
            console.log("Current Cat:", doc_currentCat.name);
            res.render('index', {post: doc_allposts, navlink: doc_allcats, activeNavlink: doc_currentCat.name, isHome: false});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('index', { errors:[{text: 'There is a problem with loading the posts of the category, sorry.'}], isHome: false});
    }
});

router.get('/contact', async (req, res) => {
    const contactID = "603a5bee77a3b64d6ccbac6d";
    try
    {
        let doc_static = await StaticContent.findById(contactID).lean();
        if (doc_static == undefined) throw new Error("No post found, sorry.");
        let doc_allcats = await Category.find({}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_static); 
            res.render('static', {static: doc_static, navlink: doc_allcats, isHome: true});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('static', { errors:[{text: 'There is a problem with loading the post, sorry.'}], isHome: true});
    }
});
router.get('/about', async (req, res) => {
    const aboutID = "603a5bee77a3b64d6ccbac6c";
    try
    {
        let doc_static = await StaticContent.findById(aboutID).lean();
        if (doc_static == undefined) throw new Error("No post found, sorry.");
        let doc_allcats = await Category.find({}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_static); 
            res.render('static', {static: doc_static, navlink: doc_allcats, isHome: true});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('static', { errors:[{text: 'There is a problem with loading the post, sorry.'}], isHome: true});
    }
});
router.get('/archive', async (req, res) =>  {
    try
    {
       //  const doc_allposts = await Post.giveAllCleanedSortedByDate();
        let doc_allposts = await Post.find({}).sort({date: 'descending'}).populate('category').lean();
        if (doc_allposts == undefined) throw new Error("No posts found, sorry.");
        let doc_allcats = await Category.find({}).sort({date: 'descending'}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_allposts); 
            console.log(doc_allcats);
            res.render('archive', {post: doc_allposts, navlink: doc_allcats, isHome: true});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('archive', { errors:[{text: 'There is a problem with loading the posts, sorry.'}], isHome: true});
    }
});
router.get('/imprint', async (req, res) => {
    const imprintID = "603a5bee77a3b64d6ccbac6b";
    try
    {
        let doc_static = await StaticContent.findById(imprintID).lean();
        if (doc_static == undefined) throw new Error("No post found, sorry.");
        let doc_allcats = await Category.find({}).lean();
        if (doc_allcats == undefined) throw new Error("No categories found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_static); 
            res.render('static', {static: doc_static, navlink: doc_allcats, isHome: true});
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('static', { errors:[{text: 'There is a problem with loading the post, sorry.'}], isHome: true});
    }
});

// Defining what should be accessible when
// requiring the module
module.exports = router;