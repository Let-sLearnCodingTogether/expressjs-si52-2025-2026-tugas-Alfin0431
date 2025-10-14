import express from "express";

const web = express.Router();

web.get("/", (req, res) => {
    res.render("index");
});

export default web;