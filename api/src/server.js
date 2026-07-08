import express from "express";
import tasksRouter from "./routes/task.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";


export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(logger);

    app.get("/health", (req, res) => {
        res.json({ status: "ok"});
    });

    app.use("/api/tasks", tasksRouter);

    app.use((req, res) => {
        res.status(404).json({
            error: "Not found"
        });
    });
    app.use(errorHandler);

    return app;
}

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Course Task Tracker API listening on port ${PORT}`);
});