export default function validateTask(req, res, next) {
    const {title, course, completed} = req.body;

    //POST needs title, course and completed
    if (req.method === "POST") {
        if (title === undefined || course === undefined || completed === undefined || typeof completed !== "boolean") {
            return res.status(400).json({
                error: "title, course or completed is missing"
            });
        }
    }
    //PATCH needs a field to update

    if (req.method === "PATCH") {
        if (title == undefined && course === undefined && completed === undefined) {
            return res.status(400).json({
                error: "One field required to update"
            });
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400),json({
                error: "completed field must be boolean"
            });
        }
    }

    //PUT needs all fields
    if (req.method === "PUT") {
        if (title === undefined || course === undefined || completed === undefined || typeof completed !== "boolean") {
            return res.status(400).json({
                error: "title, course, and completed required"
            });
        }
    }

    next();
}