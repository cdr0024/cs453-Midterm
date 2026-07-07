Description: Answers for questions and concepts as specified by Midterm document.

*********************************
PART 1
**********************************

1.) Sockets vs. HTTP
Explain the difference between a raw TCP socket server and an HTTP server. Your answer should include: what a socket provides, what HTTP adds on top, why most web APIs do not directly expose raw socket protocols.
    Answer: 
        A raw TCP socket server lets a client and server send and recieve data through creating sockets without set rules on how the data should be represented. You create your own ways to send and recieve messages. An HTTP server builds on the use of TCP by use of the request/response model and using a standard for communication. It includes using GET requests, headers and status codes. It provides more of a common standard protocol rather than having to make your own. 


2.) Request/Response
Describe the request/response pattern. Then explain how it appears in: a TCP command server, an HTTP API, an Express route handler.
    Answer: The request/response pattern is as follows: Client sends a request, Server processes the request, Server sends a response (referenced from week 1 slides). A TCP command server utlizies simple sockets and custom commands like ECHO as requests. An HTTP API sends requests like GET and teh server returns a structured JSON response that includes headers and status codes. An Express route handler is a step above that makes routing and JSON handling easier by use of route handlers, automatic JSON request body parsing, simple JSON resonses with res.json() and status codes with res.status().


3.) Statelessness
Explain what it means for an API to be stateless. Give one advantage and one disadvantage of stateless design
    Answer:
        An API is stateless when each request contains the needed context. The server doesn't remember anything from previous requests. All the state is stored in the resources in your storage medium such as a database, cache or file system. Stateless APIs make it easier to scale since any server can handle any request. However, each requests has to send all the needed information which can make requests bigger and a bit tedious.


4.) HTTP Status Codes
For each situation, choose an appropriate HTTP status code and briefly justify it
    Answer:
        Situation:
            1.) a new resource was successfully created: 
                    -The appropiate HTTP status code would be 201. This is the `Created` status code that would tell a client that a new resource was created successfully.

            2.) The client requested an item that does not exist:
                    -The appropiate HTTP status code would be 404. This is the `Not Found` status code provided when a server cannot find the reource requested. There is debate over this status code as mentioned in our lecture.

            3.) The client sent JSON missing a required field:
                    -The appropiate HTTP status code would be 400. This is the `Bad Request` code signaling incorrect data

            4.) The server had an unexpected error:
                    -The appropiate HTTP status code would be 500. This code means `Internal Server Error` that signals something went wrong that was not caused by the client and was not expected to happen. 

            5.) A successful request returns JSON data:
                    -The appropiate HTTP status code would be 200. This is th `OK` status code signaling that the client request and response data was a successful exchange.


