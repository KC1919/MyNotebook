const express=require("express");
const NoteModel=require("../models/Notes");


const notesRouter=express.Router();

notesRouter.get("/",getNotes).post("/add").delete("delete");


async function getNotes(req,res) {
    try {
        console.log("Fetching notes");
        res.send("notes fetched succesfully")
    } catch (error) {
        console.log(error);
        res.sedn("failed to fetch notes")
    }
}


module.exports=notesRouter;