const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/mongo-exercises').then(() => console.log('connected to mongo-exercises db...')).catch(err => console.error(err));

const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    price: Number,
    author: String,
    date: { type: Date , default: Date.now()},
    isPublished: Boolean,
    tags: [String]
});

const Course = mongoose.model("Course", courseSchema);

router.get('/', (req, res) => {
    //Todo Exercise 1

    // Course
    //     .find()
    //     .and([{ isPublished: true }, { tags: 'backend' }])
    //     .sort({ name: 1 })
    //     .select({ name: 1 , author: 1 })
    //     .then(result => res.send(result));

    //Todo Exercise 2

    // Course
    //     .find()
    //     .and([{ isPublished: true }, { tags: { $in: ['backend', 'frontend']} }])
    //     .sort({ price: -1 })
    //     .select({ name: 1 , author: 1 })
    //     .then(result => res.send(result));

    //Todo Exercise 3

    Course
        .find({ isPublished: true })
        .or([{ price: { $gte: 15} }, { name: /.*by.*/i }])
        .sort({ name: 1 })
        .select({ name: 1 , author: 1, price: 1 })
        .then(result => res.send(result)).catch(err => console.error(err));
});

router.put('/:id', (req, res) => {
    //Todo Query first

    // Course.findById(new mongoose.Types.ObjectId(req.params.id))
    //     .then(courseData => {
    //     if(!courseData) res.status(404).send('there is no any course with this id');
    //     if(!req?.body?.author || req.body.author.length < 3) {
    //         res.send('invalid name')
    //     }
    //     courseData.author = req.body.author;
    //     const updatedDBCourse = new Course(courseData);
    //     updatedDBCourse.save().then(result => {
    //         res.send(result)
    //     }).catch(err => console.error(err))
    // }).catch(err => console.error(err))

    //Todo Update in DB

    Course.findByIdAndUpdate(req.params.id, {
        $set: {
            author: req.body.author
        }
    }, { new: true }).then(result => res.send(result));
})

module.exports = router;
