const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middlewares/logger');

app.use(express.json());
app.use(express.urlencoded({extended:true})); //key1=value1$key2=value2
app.use(express.static('public'));

app.use(morgan('tiny'));
app.use(logger);

require('dotenv').config()

const students = [
    {id: 1, name: "Rohan"},
    {id: 2, name: "Pooja"},
    {id: 3, name: "Jino"},
    {id: 4, name: "Himanshu"},
]

/**
 * @author Setu Modi
 * To get all students
 */
app.get('/api/student', (req, res) => {
    res.send(students);
});

/**
 * @author Setu Modi
 * To get perticular student data by id
 */
app.get('/api/student/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Id is not available');
    res.send(student);
});

/**
 * @author Setu Modi
 * To create a new student
 */
app.post('/api/student', (req, res) => {
    // Input field validation
    // const result = validateInput(req.body);
    console.log(req.body);
    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const student = {
        id: students.length + 1,
        name: req.body.name
    };

    students.push(student);
    res.send(student);
});

/**
 * @author Setu Modi
 * To update a student by id
 */
app.put('/api/student/:id', (req, res) => {
    // check id
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Id is not available');

    // Input field validation
    const { error } = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // update student
    student.name = req.body.name;
    res.send(student);
});

/**
 * @author Setu Modi
 * To delete a student by id
 */
app.delete('/api/student/:id', (req, res) => {
    // check id
    const student = students.find(s => s.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Id is not available');

    // delete data
    const index = students.indexOf
    
    (student);
    students.splice(index,1);

    res.send(student);
});

/**
 * @author Setu Modi
 * @param {*} result
 * Common function for input field validation 
 */
function validateInput(result) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(result, schema);
}


let port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server has been started on port ${port}`));
