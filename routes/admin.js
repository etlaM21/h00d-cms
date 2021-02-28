// Routes for backend, meaning the admin page where changes can be made

let express = require('express');
let router = express.Router();

const Post = require('../models/Post');
const Category = require('../models/Category');
const StaticContent = require('../models/StaticContent');

// All routes under /admin
router.get('/', (req, res) => res.redirect('/admin/edit'));
// Add posts
router.get('/add', async (req, res) =>  {
    try
    {
        const doc_cats = await Category.find({}).lean();
        console.log(doc_cats);

        if (doc_cats == undefined) throw new Error("No categories found, sorry.");
        else res.render('admin-addpost', {categories: doc_cats, layout: 'backend.handlebars'});
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('admin-categories', { errors:[{text: 'There is a problem with loading the categories, sorry.'}], categories: {}, layout: 'backend.handlebars'});
    }
});

router.post('/add', async (req, res) => {

    console.log("POSTing in /admin/add!");

    console.log(req.body);
    // Get the html elements by the id category from the html body
    let { title, content, excerpt, image, date, category } = req.body;


    let errors = [];
    // Error checks
    if ((!title) || (title.length < 2)) {
        errors.push({ text: 'Your title is too short ... you needs at least 3 characters.' });
    }
    if ((!content) || (content.length < 99)) {
        errors.push({ text: 'Your text is too short ... you needs at least 100 characters.' });
    }
    if ((!excerpt) || (excerpt.length < 49)) {
        errors.push({ text: 'Your text excerpt is too short ... you needs at least 50 characters.' });
    }
    if ((!image) || (image.length < 4)) {
        errors.push({ text: 'Your image url is too short ... you needs at least 5 characters.' });
    }
    if ((!date)) {
        errors.push({ text: 'You needs to enter a date for the post.' });
    }
    if ((!category)) {
        errors.push({ text: 'You needs to have a category for the post.' });
    }

    try {

        // User input errors occurred
        if (errors.length > 0)
        {
            res.render('admin-addpost', { errors, layout: 'backend.handlebars' });
        } 
        // No user input errors, let's save 
        // the input to the database
        else {
            const doc_new = new Post({
                title: title,
                text: content,
                excerpt: excerpt,
                imgurl: image,
                date: date,
                category: category
            });

            await doc_new.save();
            console.log('New post saved in database:', doc_new.title);
            // res.redirect('/admin/categories');
            res.render('admin-addpost', {errors: [{ text: 'New post saved: ' + doc_new.title}], layout: 'backend.handlebars' });
        }
    }
    catch(err) {
        console.error(err.message);
        res.render('admin-addpost', {errors: [{ text: 'There is a problem with saving the post, sorry.'}], layout: 'backend.handlebars' });
    }
});
// res.render('admin-addpost', {layout: 'backend.handlebars'}));
router.get('/edit', async (req, res) =>  {
    try
    {
       //  const doc_allposts = await Post.giveAllCleanedSortedByDate();
        let doc_allposts = await Post.find({}).sort({date: 'descending'}).populate('category').lean();
        if (doc_allposts == undefined) throw new Error("No posts found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_allposts); 
            res.render('admin-edit-overview', {post: doc_allposts, layout: 'backend.handlebars' });
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('admin-edit-overview', { errors:[{text: 'There is a problem with loading the posts, sorry.'}], layout: 'backend.handlebars' });
    }
});

router.get('/edit/:postID', async (req, res) => {
    try
    {
        console.log(req.params.postID);
        let doc_post = await Post.findById(req.params.postID).sort({date: 'descending'}).populate('category').lean();
        if (doc_post == undefined) throw new Error("No post found, sorry.");
        const doc_cats = await Category.find({}).lean();
        console.log(doc_cats);
        if (doc_cats == undefined) throw new Error("No categories found, sorry.");

        else {
            console.log("Rendering");
            console.log(doc_post); 
            res.render('admin-edit-post', {post: doc_post, categories: doc_cats, layout: 'backend.handlebars' });
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('admin-edit-post', { errors:[{text: 'There is a problem with loading the post, sorry.'}], layout: 'backend.handlebars' });
    }
});

router.post('/edit', async (req, res) => {

    console.log("POSTing in /admin/edit!");

    console.log(req.body);
    // Get the html elements by the id category from the html body
    let { title, content, excerpt, image, date, category, id } = req.body;


    let errors = [];
    // Error checks
    if ((!id) || (id.length < 2)) {
        errors.push({ text: 'No ID given!' });
    }
    if ((!title) || (title.length < 2)) {
        errors.push({ text: 'Your title is too short ... you needs at least 3 characters.' });
    }
    if ((!content) || (content.length < 99)) {
        errors.push({ text: 'Your text is too short ... you needs at least 100 characters.' });
    }
    if ((!excerpt) || (excerpt.length < 49)) {
        errors.push({ text: 'Your text excerpt is too short ... you needs at least 50 characters.' });
    }
    if ((!image) || (image.length < 4)) {
        errors.push({ text: 'Your image url is too short ... you needs at least 5 characters.' });
    }
    if ((!date)) {
        errors.push({ text: 'You needs to enter a date for the post.' });
    }
    if ((!category)) {
        errors.push({ text: 'You needs to have a category for the post.' });
    }

    try {

        // User input errors occurred
        if (errors.length > 0)
        {
            res.render('admin-edit-overview', { errors, layout: 'backend.handlebars' });
        } 
        // No user input errors, let's save 
        // the input to the database
        else {
            await Post.updateOne({ _id: id }, 
            {
                title: title,
                text: content,
                excerpt: excerpt,
                imgurl: image,
                date: date,
                category: category
            });

            console.log('Edited post saved in database:', title);
            // res.redirect('/admin/categories');
            res.render('admin-edit-overview', {errors: [{ text: 'Post edited: ' + title}], layout: 'backend.handlebars' });
        }
    }
    catch(err) {
        console.error(err.message);
        res.render('admin-edit-overview', {errors: [{ text: 'There is a problem with saving the post, sorry.'}], layout: 'backend.handlebars' });
    }
});

// Categories
router.get('/categories', async (req, res) =>  {
    try
    {
        // 'name -_id': get the field name and not ("minus" _id) the field _id
        const doc_cats = await Category.find({}, 'name -_id').lean();
        console.log(doc_cats);

        if (doc_cats == undefined) throw new Error("No categories found, sorry.");
        else res.render('admin-categories', {categories: doc_cats, layout: 'backend.handlebars'});
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('admin-categories', { errors:[{text: 'There is a problem with loading the categories, sorry.'}], categories: {}, layout: 'backend.handlebars'});
    }
});
// NEW: the POST add story route, called as action 
// in the form in admin-categories.handlebars upon submit.
router.post('/categories', async (req, res) => {

    console.log("POSTing in /admin/categories!");
    // Get the html elements by the id category from the html body
    let { category } = req.body;

    console.log(req.body);

    let errors = [];
    // Error checks
    if ((!category) || (category.length < 1)) {
        errors.push({ text: 'Your category name is too short ... you needs at least 2 characters.' });
    }

    try {

        // User input errors occurred
        if (errors.length > 0)
        {
            res.render('admin-categories', { errors, layout: 'backend.handlebars' });
        } 
        // No user input errors, let's save 
        // the input to the database
        else {
            const doc_new = new Category({
                name: category
            });

            await doc_new.save();
            console.log('New category saved in database:', doc_new.name);
            // res.redirect('/admin/categories');
            res.render('admin-categories', {errors: [{ text: 'New category saved: ' + doc_new.name}], layout: 'backend.handlebars' });
        }
    }
    catch(err) {
        console.error(err.message);
        res.render('admin-categories', {errors: [{ text: 'There is a problem with saving the category, sorry.'}], layout: 'backend.handlebars' });
    }
});


//Statictexts
router.get('/statictext',  async (req, res) =>  {
    const aboutID = "603a5bee77a3b64d6ccbac6c";
    const contactID = "603a5bee77a3b64d6ccbac6d";
    const imprintID = "603a5bee77a3b64d6ccbac6b";
    try
    {
       //  const doc_allposts = await Post.giveAllCleanedSortedByDate();
        let doc_about = await StaticContent.findById(aboutID).lean();
        let doc_contact = await StaticContent.findById(contactID).lean();
        let doc_imprint = await StaticContent.findById(imprintID).lean();

        if (doc_imprint == undefined || doc_about == undefined || doc_contact == undefined) throw new Error("No posts found, sorry.");
        else {
            console.log("Rendering");
            console.log(doc_imprint); 
            res.render('admin-statictext', {about: doc_about, contact: doc_contact, imprint: doc_imprint, layout: 'backend.handlebars' });
        }    
        
    }
    catch (err) {
        console.error('ERROR: ', err.message);
        res.render('admin-statictext', { errors:[{text: 'There is a problem with loading the posts, sorry.'}], layout: 'backend.handlebars' });
    }
});

router.post('/statictext', async (req, res) => {

    console.log("POSTing in /admin/statictext!");

    console.log(req.body);
    // Get the html elements by the id category from the html body
    let { title, imgurl, content, id } = req.body;


    let errors = [];
    // Error checks
    if ((!id) || (id.length < 2)) {
        errors.push({ text: 'No ID given!' });
    }
    if ((!title) || (title.length < 4)) {
        errors.push({ text: 'Your title is too short ... you needs at least 5 characters.' });
    }
    if ((!content) || (content.length < 99)) {
        errors.push({ text: 'Your text is too short ... you needs at least 100 characters.' });
    }
    if ((!imgurl) || (imgurl.length < 4)) {
        errors.push({ text: 'Your image url is too short ... you needs at least 5 characters.' });
    }

    try {

        // User input errors occurred
        if (errors.length > 0)
        {
            res.render('admin-statictext', { errors, layout: 'backend.handlebars' });
        } 
        // No user input errors, let's save 
        // the input to the database
        else {
            await StaticContent.updateOne({ _id: id }, 
            {
                title: title,
                content: content,
                imgurl: imgurl
            });

            console.log('Edited post saved in database:', title);
            // res.redirect('/admin/categories');
            res.render('admin-statictext', {errors: [{ text: 'Statictext edited: ' + title}], layout: 'backend.handlebars' });
        }
    }
    catch(err) {
        console.error(err.message);
        res.render('admin-edit-overview', {errors: [{ text: 'There is a problem with saving the post, sorry.'}], layout: 'backend.handlebars' });
    }
});




// Defining what should be accessible when
// requiring the module
module.exports = router;