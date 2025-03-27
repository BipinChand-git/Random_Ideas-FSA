const express = require('express');

const router = express.Router();

const Idea = require('../models/Idea');    //To bring our model


// To get all ideas-
router.get('/',  async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({success: true, data : ideas});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success : false, error : 'Something Went Wrong'});
    }
});

// To get single idea-
// Here we use query params it start from colon(:), in this case /:id-
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({success : true, data : idea});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success : false, error : 'Something Went Wrong!'});
    }
});

// To add an idea--

router.post('/', async (req, res) => {
    const idea = new Idea({        //Instance of Idea Model
        text : req.body.text,
        tag : req.body.tag,
        username : req.body.username,
    });

    try {
        const savedIdea = await idea.save();
        res.json({success : true, data : savedIdea});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success : false, error : 'Something Went Wrong!'});
    }
});


// To Update an idea we can use put request-
router.put('/:id', async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(     //takes three arguments
            req.params.id,
            {
                $set : {
                    text : req.body.text,
                    tag : req.body.tag,
                }
            },
            {new : true}
        );
        res.json({success : true, data : updatedIdea});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success : false, error : 'Something Went Wrong!'});
    }
});

// Now to delete an idea using DELETE request-
router.delete('/:id', async (req, res) => {
    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({success : true, data : {} });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({success : false , error : 'Something Went Wrong!'});
    }
});

module.exports = router;

// SO Now this is our fully working REST API, where we have perform CRUD operations With Database.
