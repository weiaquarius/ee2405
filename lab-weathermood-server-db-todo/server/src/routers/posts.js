const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const postModel = require('../model/posts.js');
const voteModel = require('../model/votes.js');
const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/posts', function(req, res, next) {
    const {searchText, start} = req.query;
    postModel.list(searchText, start).then(posts => {
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/posts', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(mood, text).then(post => {
        res.json(post);
    }).catch(next);
});

// Vote
router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
    const {id, mood} = req.params;
    if (!id || !mood) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    voteModel.create(id, mood).then(post => {
        res.json(post);
    }).catch(next);
});

// TodoList
router.get('/todos', function(req, res, next){
    const {searchText, start} = req.query;
    let unaccomplishedOnly;
    if (req.query.unaccomplishedOnly === 'true')
        unaccomplishedOnly = true;
    else
        unaccomplishedOnly = false;
    todoModel.listTodos(unaccomplishedOnly,searchText,start).then(todos => {
        res.json(todos);
    }).catch(next);
});

// CreatTodo
router.post('/todos',function(req, res, next){
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.createTodo(mood, text).then(todo => {
        res.json(todo);
    }).catch(next);
})

// Accomplish
router.post('/todos/:id', function(req, res, next){
    const {id} = req.params;
    if(!id){
        const err = new Error('Todo ID is required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplishTodo(id).then(todo => {
        res.json(todo);
    }).catch(next);
})

module.exports = router;
