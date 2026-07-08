const BASE_URL = "http://localhost:3000";

async function runClient() {
    //call /helath
    console.log("Checking health...");
    let response = await fetch(`${BASE_URL}/health`);
    let data = await response.json();
    console.log(data);

    //create a task
    console.log("\nCreating task...");

    response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Complete API client",
            status: "todo"
        })
    });
    const newTask = await response.json();
    console.log(newTask);

    const taskId = newTask.id;

    //get all tasks
    console.log("\nGetting all tasks...");
    response = await fetch(`${BASE_URL}/api/tasks`);
    data = await response.json();

    console.log(data);

    //get one task
    console.log("\nGetting one task...");

    response = await fetch(`${BASE_URL}/api/tasks/${taskId}`);
    data = await response.json();
    console.log(data);


    //Update a task
    console.log("\nUpdating task...");
    response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "done"
        })
    });
    data = await response.json();
    console.log(data);

    //delete a task

    console.log("\nDeleting task...");
    response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE"
    });
    console.log("Delete status:", response.status);
}

runClient().catch(error => {
    console.error("Client error:", error);
});