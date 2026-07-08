export default function validateTask(req, res, next) {
    const {title, status} = req.body;

    //POST needs title and status
    if (req.method == "POST") {
        if (title === undefined || status === undefined) {
            return res.status(400).json({
                error: "title or status is missing"
            });
        }
    }
    //PATCH needs a field to update

    if (req.method === "PATCH") {
        if (title == undefined && status === undefined) {
            return res.status(400).json({
                error: "One field required to update"
            });
        }
    }
    next();
}