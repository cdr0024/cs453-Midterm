import express from "express";
import validateTask from "../middleware/validateTask.js";

const router = express.Router();
let nextId = 3;

const tasks = [
    { id: 1, title: "Complete CS 453 Midterm", status: "todo"},
    { id: 2, title: "Complete Checkpoint 1", status: "done"}
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
    const {title, status} = req.body;

    const newTask = {
        id: nextId++,
        title, 
        status
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
    const {title, status} = req.body;

    task.title = title;
    task.status = status;
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

    const { title, status} = req.body;
    if (title !== undefined) {
        task.title = title;
    }
    if (status !== undefined) {
        task.status = status;
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