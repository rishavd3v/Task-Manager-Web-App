const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    description: String,
    date: Date
});


module.exports = mongoose.model("task",taskSchema);