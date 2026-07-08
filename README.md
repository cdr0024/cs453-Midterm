# CS 453 Midterm Course Task Tracker API  

Description: A simple express API for managing tasks. It supports creating, updating and deleting tasks  
Development: This project was developed in VS code on Windows 11 

---  

# Install  

Within the `api` folder install npm:  

```bash  
npm install  
```  

The project uses:  
- Express for creating the API  
- Vitest and Supertest for testing the API  

---  

# Running the server  

To start the server, run:  

```bash  
node src/server.js  
```  

The server will start on:  

```text  
http://localhost:3000  
```  

---  

# Running the client  

The client shows the API functions:  
- Checking API health  
- creating a task  
- listing all task  
- getting task by id  
- updating a task  
- deleting a task  

Go to the client folder and run:  
```bash  
node client.js  
```  

You should see this output after running:  

```text  
Checking health...  
{ status: 'ok' }  

Creating task...  
{ id: 3, title: 'Complete API client', status: 'todo' }

Getting all tasks...
[
  { id: 1, title: 'Complete CS 453 Midterm', status: 'todo' },
  { id: 2, title: 'Complete Checkpoint 1', status: 'done' },
  { id: 3, title: 'Complete API client', status: 'todo' }
]

Getting one task...
{ id: 3, title: 'Complete API client', status: 'todo' }

Updating task...
{ id: 3, title: 'Complete API client', status: 'done' }

Deleting task...
Delete status: 204  
```  

---  

# Running Tests  

To run test:  

```bash  
npm test  
```  
---  

# API routes  

| Method | Route | Description |  
| --- | --- | --- |   
| GET | `/health` | Checks health of server |  
| GET | `/api/tasks` | Returns all tasks |  
| GET | `/api/tasks/:id` | Returns a single task |  
| POST | `/api/tasks` | Create a new task |  
| PUT | `/api/tasks/:id` | Replaces a task |  
| PATCH | `/api/tasks/:id` | Update a part of a task |  
| DELETE | `/api/tasks/:id` | Delete a task |  

---  

# Example curl commands  

## Get health  

```powershell  
curl.exe http://localhost:3000/health  
```  

Response:  

```json  
{
    "status": "ok"
}  
```  

---  

## Get all tasks  

```powershell  
curl.exe http://localhost:3000/api/tasks  
```  

Response:  

```json  
[
    {"id":1,"title":"Complete CS 453 Midterm","status":"todo"},
    {"id":2,"title":"Complete Checkpoint 1","status":"done"}
]  
```  

---  

## Get task by id  

```powershell  
curl.exe http://localhost:3000/api/tasks/1  
```  

Response:  

```json  
{
    "id":1,"title":"Complete CS 453 Midterm","status":"todo"
}  
```  

---

## Create a task  

The curl example below use Powershell syntax. I had to use `--%` to prevent powershell from modifying the JSON body

```powershell  
curl.exe --% -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" --data-raw "{\"title\":\"Complete CS 453 Homework\",\"status\":\"todo\"}"  
```  

Response:  

```json  
{
    "id":3,"title":"Complete CS 453 Homework","status":"todo"
}  
```  
  
---

## Replace a task  

The curl example below use Powershell syntax. I had to use `--%` to prevent powershell from modifying the JSON body  

```powershell
curl.exe --% -X PUT http://localhost:3000/api/tasks/3 -H "Content-Type: application/json" --data-raw "{\"title\":\"Updated Task\",\"status\":\"done\"}"  
```  
Response:  

```json
{"id":3,"title":"Updated Task","status":"done"}  
```
  
---

## Update a Task  

The curl example below use Powershell syntax. I had to use `--%` to prevent powershell from modifying the JSON body  

```powershell
curl.exe --% -X PATCH http://localhost:3000/api/tasks/1 -H "Content-Type: application/json" --data-raw "{\"status\":\"done\"}"  
```  

Response:  

```json
{"id":1,"title":"Complete CS 453 Midterm","status":"done"}  
```  

---  

## Delete a task  

```powershell  
curl.exe -X DELETE http://localhost:3000/api/tasks/3
```  

---  

# File structure  

```text  
api
|
|-- src
|   |
|   |-- server.js
|   |
|   |-- routes
|   |   |-- task.js
|   |
|   |-- middleware
|       |-- logger.js
|       |-- validateTask.js
|       |-- errorHandler.js
|
|-- client
|   |-- client.js
|
|-- test
|   |-- tasks.test.js
|
|-- openapi.yaml
|
|-- package.json  
|
|-- package-lock.json
```