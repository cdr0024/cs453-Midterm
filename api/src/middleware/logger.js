export default function logger(req, res, next) {
    const startTime = Date.now();
    res.on("finish", () => {
        const timeTaken = Date.now() - startTime;
        console.log(
            `${req.method} ${req.path} ${res.statusCode} - ${timeTaken}ms`
        );
    });

    next();
}