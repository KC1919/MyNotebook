const express = require("express");
const Note = require("../models/Note");
const verify = require("../middlewares/verify");
const {
    body,
    validationResult
} = require("express-validator");


const notesRouter = express.Router();

//Route 1: To add a new note
notesRouter.post("/addNote", [
    //validating the details in the middleware
    body("title", "title cannot be left blank").isLength({
        min: 5
    }),
    body("description", "description should be minimum of length 5").isLength({
        min: 5,
    }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({message:"Error in input",error:errors.array()});
    }
    try {
        //destructuring the body, and getting details of the note
        const {
            title,
            description,
            tag
        } = req.body;

        //creating the note
        const note = await Note.create({
            user: req.userId,
            title: title,
            description: description,
            tag: tag
        });

        const savedNote = await note.save(); //saving the note in the database
        return res.json(savedNote);
        // return res.status(200).json({
        //     message: "Note added successfully",
        //     note: note
        // });
    } catch (error) { //if some error occurs, then we return it to the user
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }

})


//Route 2: To fetch all the notes of a logged in user
notesRouter.get("/fetchNotes", async (req, res) => {
    try {
        //findding the note with the user id in the database
        const result = await Note.find({
            // user: "61480f605932661f7b47c3ba"
        });

        // console.log(result);
        if (result.length === 0) {
            return res.status(200).json({
                message: "You dont have any notes yet",
                result: result
            });
        } else {
            return res.status(200).json({
                message: "Notes fetched successfully",
                result: result
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "failed to fetch notes",
            error: error
        });
    }
});


//Route 3: To update a note
notesRouter.put("/update/:id", async (req, res) => {

    try {
        //extracting the note details to be updated
        const {
            title,
            description,
            tag
        } = req.body;

        //finding the note by the given id
        let note = await Note.findById(req.params.id);

        //if the note is not found
        if (note === null) {
            //return the error to the user
            return res.status(404).json({
                message: "Not found"
            });
        }

        //if the note is present 
        else {
            const newNote = {}; //make a new note with the details to be updated

            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;

            //verify the user who is trying to update, whether he/she is the actual owner
            // if (note.user.toString() === req.userId) {
                //if verified, finding the note by id and updating it with the new details
                updatedNote = await Note.findByIdAndUpdate(req.params.id, {
                    $set: newNote
                }, {
                    new: true
                });
                if(updatedNote){
                    console.log(updatedNote);
                console.log("Note updated");
                return res.status(200).json({
                    message: "Note updated successfully"
                });
            }
            // } else {
                return res.status(401).json({
                    message: "Cannot update, unauthorized!"
                });
            // }
        }

    } catch (error) {
        return res.status(500).json({
            message: "Cannot update, internal server error",
            error: error.message
        });
    }
});

//Route 4: To delete a note
notesRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id; //extracting the note id to be deleted

        let note = await Note.findById(id); //finding the note to be deleted by the given id

        //if not not found return the error
        if (note === null) {
            return res.status(404).json({
                message: "Not found"
            });
        }
        //if the note is found
        else {
            //verify the user trying to deleted is the actural owner of the note
            // if (note.user.toString() === req.userId) { //if verified
                const deleted = await Note.findByIdAndDelete(id); //deleting the note by the  id
                return res.status(200).json({
                    message: "Note deleted successfully"
                });
            // }else{
                return res.status(401).json({message:"Unauthorized access"});
            // }
        }
    } catch (error) {
        res.status(500).json({
            message: "Note cannot be deleted, internal server error",
            error: error
        });
    }
});


module.exports = notesRouter;