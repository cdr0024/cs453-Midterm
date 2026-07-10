import express from "express";
import validateTask from "../middleware/validateTask.js";

const router = express.Router();
let nextId = 3;

const tasks = [
    { id: 1, title: "Complete CS 453 Midterm", course: "CS453", completed: false},
    { id: 2, title: "Complete Checkpoint 1", course: "CS453", completed: true}
];

//GET all tasks
router.get("/", (req, res) => {
    res.json(tasks);
});

//GET one task
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({
            error: "cannot find task"
        });
    }
    res.json(task);
});

//POST new task
router.post("/", validateTask, (req, res) => {
    const {title, course, completed} = req.body;

    const newTask = {
        id: nextId++,
        title,
        course, 
        completed
    };
    tasks.push(newTask);

    res.status(201).json(newTask);
});


//PUT rplace task
router.put("/:id", validateTask, (req, res) => {

    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "cannot find task"
        });
    }
    const {title, course, completed} = req.body;

    task.title = title;
    task.course = course;
    task.completed = completed;
    res.json(task);
});

//PATCH update part of task
router.patch("/:id", validateTask, (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({
            error: "cannot find task"
        });
    }

    const { title, course, completed} = req.body;
    if (title !== undefined) {
        task.title = title;
    }
    if (course !== undefined) {
        task.course = course;
    }
    if (completed !== undefined) {
        task.completed = completed;
    }

    res. json(task);
});

//DELETE a task
router.delete("/:id", (req, res) => {
    const id = Number (req.params.id);
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "cannot find task"
        });
    }
    tasks.splice(index, 1);
    res.status(204).send();
});

export default router;