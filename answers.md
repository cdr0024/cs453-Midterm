Description: Answers for questions and concepts as specified by Midterm document.

---

# PART 1 - Conceptional Foundations

---

## 1.) Sockets vs. HTTP

### Explain the difference between a raw TCP socket server and an HTTP server. Your answer should include: what a socket provides, what HTTP adds on top, why most web APIs do not directly expose raw socket protocols.  
Answer:  
A raw TCP socket server lets a client and server send and recieve data through creating sockets without set rules on how the data should be represented. You create your own ways to send and recieve messages. An HTTP server builds on the use of TCP by use of the request/response model and using a standard for communication. It includes using GET requests, headers and status codes. It provides more of a common standard protocol rather than having to make your own.

## 2.) Request/Response

### Describe the request/response pattern. Then explain how it appears in: a TCP command server, an HTTP API, an Express route handler.  
Answer:  
The request/response pattern is as follows: Client sends a request, Server processes the request, Server sends a response (referenced from week 1 slides). A TCP command server utlizies simple sockets and custom commands like ECHO as requests. An HTTP API sends requests like GET and teh server returns a structured JSON response that includes headers and status codes. An Express route handler is a step above that makes routing and JSON handling easier by use of route handlers, automatic JSON request body parsing, simple JSON resonses with res.json() and status codes with res.status().

## 3.) Statelessness

### Explain what it means for an API to be stateless. Give one advantage and one disadvantage of stateless design  
Answer:  
An API is stateless when each request contains the needed context. The server doesn't remember anything from previous requests. All the state is stored in the resources in your storage medium such as a database, cache or file system. Stateless APIs make it easier to scale since any server can handle any request. However, each requests has to send all the needed information which can make requests bigger and a bit tedious.

## 4.) HTTP Status Codes

### For each situation, choose an appropriate HTTP status code and briefly justify it  

| Situation                                        | Status Code                                                                                                                                                                                                    |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| a new resource was successfully created          | The appropiate HTTP status code would be 201. This is the `Created` status code that would tell a client that a new resource was created successfully.                                                         |
| The client requested an item that does not exist | The appropiate HTTP status code would be 404. This is the `Not Found` status code provided when a server cannot find the reource requested. There is debate over this status code as mentioned in our lecture. |
| The client sent JSON missing a required field    | The appropiate HTTP status code would be 400. This is the `Bad Request` code signaling incorrect data                                                                                                          |
| The server had an unexpected error               | -The appropiate HTTP status code would be 500. This code means `Internal Server Error` that signals something went wrong that was not caused by the client and was not expected to happen.                     |
| A successful request returns JSON data           | The appropiate HTTP status code would be 200. This is th `OK` status code signaling that the client request and response data was a successful exchange.                                                       |

---

# PART 2 - API Design

---

## 1.) Resource URIs  
### List URIs for getting all tasks, getting one task, creating a task, replacing a task, updating a task and deleting a task 

| Resource                                        | URI                                                                                                                                                                                                    |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getting all tasks          | GET /tasks                                                         |
| getting one task by id | GET /tasks/:id |
| creating a task    | POST /tasks                                                                                                          |
| replacing a task               | PUT /tasks/:id                     |
| partially updating a task           | PATCH /tasks/:id                                                       |  
| deleting a task      | DELETE /tasks/:id            |  

## 2.) Method Semantcis  
### For each route ifentify the HTTP method and explain whether it is safe, idempotent or neither

| Route | Method | Safe, idempotent, neither | explain |
| --- | --- | --- | --- |
| /tasks | GET | safe and idempotent | Reads without changing the data so making the request multiple times gives same result |
| /tasks/:id | GET | safe and idempotent | Reads without changing the data so making the request multiple times gives same result |  
| /tasks | POST | neither | Creates a new task, changes server state and repeating would create multiple tasks |
| /tasks/:id | PUT | idempotent | CHanges state by replacing task. Sending multiple times leaves in same state |  
| /tasks/:id | PATCH | not safe, usually not idempotent | Updates part of a task and repeating may not have same outcome |
| /tasks/:id | DELETE | idempotent | changes state by deleting task bu multiple requests after first won't change anything |

## 3.) JSON Representation  
### Provide one valid JSON example for creating a new task.  

```  
{
    "title": "Complete CS 453 Midterm",
    "status": "todo"
}
```
---

# PART 3-6 - Express API implementation, Middleware, Basic Client, OpenAPI

---
### Refer to source code in folder `api` for implementation for parts 3-6

### Part 4 Middleware: Briefly explain why these are middleware concerns instead of being repeated manually inside every route.  
Answer:  
These are middleware concerns because when they apply to multiple routes, you end up repeating a lot of code inside every route handler. Using middleware keeps the code cleaner and makes it easier to update things in one place instead of having to change every route individually. This also just helps when there is a team of people working on seperate things involving the same codebase.


---

# PART 7 - Reflection

---