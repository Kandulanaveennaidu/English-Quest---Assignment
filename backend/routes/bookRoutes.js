const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const authMiddleware = require('../middlewares/authMiddleware');
const bookRoute = express.Router();


//create book
bookRoute.post('/', authMiddleware,
    asyncHandler(async (req, res) => {
        const userId = req.user._id;

        const book = await Book.create({
            category: req.body.category,
            author: req.body.author,
            title: req.body.title,
            createdBy: userId
        });

        if (book) {
            res.status(200);
            res.send(book);
        } else {
            res.status(500);
            throw new Error('Book creating failed');
        }
    })
);

//fetch books
bookRoute.get('/',
    asyncHandler(async (req, res) => {
        const book = await Book.find({});

        if (book) {
            res.status(200);
            res.send(book);
        } else {
            res.status(500);
            throw new Error('There are no books');
        }
    })
);

//update book
bookRoute.put('/:id', authMiddleware,
    asyncHandler(async (req, res) => {
        const book = await Book.findById(req.params.id);

        if (book) {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
            res.status(200);
            res.send(updatedBook);
        } else {
            res.status(500);
            throw new Error('Book update failed');
        }
    })
);

//delete book
bookRoute.delete('/:id',
    asyncHandler(async (req, res) => {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);

            rew.status(200);
            res.send(book);

        } catch (error) {
            res.json(error);
        }

    })
);

//find a single book
bookRoute.get(
    '/:id',
    asyncHandler(async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            res.status(200);
            res.send(book);
        } catch (error) {
            res.status(500);
            throw new Error('No book found');
        }
    })
);

module.exports = bookRoute;
