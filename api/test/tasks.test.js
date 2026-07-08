import {describe, expect, test} from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

describe("Course Task Tracker API", () => {
    const app = createApp();


    test("GET /health returns status ok", async () => {
        const response = await request(app)
            .get("/health")
            .expect(200);
        expect(response.body).toEqual({
            status: "ok"
        });
    });

    test("GET /api/tasks returns all tasks", async () => {
        const response = await request(app)
            .get("/api/tasks")
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });


    test("POST /api/tasks creates a task", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Test task",
                status: "todo"
            })
            .expect(201);

        expect(response.body.title).toBe("Test task");
        expect(response.body.status).toBe("todo");
    });

    test("POST /api/tasks rejects missing fields", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Missing status"
            })
            .expect(400);

        expect(response.body.error).toBeDefined();
    });


    test("GET /api/tasks/:id returns 404 for missing task", async () => {
        await request(app)
            .get("/api/tasks/999")
            .expect(404);
    });

    test("PATCH /api/tasks/:id updates a task", async () => {

        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Update Test",
                status: "todo"
            });

        const id = createResponse.body.id;
        const response = await request(app)
            .patch(`/api/tasks/${id}`)
            .send({
                status: "done"
            })
            .expect(200);
        expect(response.body.status).toBe("done");
    });


    test("DELETE /api/tasks/:id deletes a task", async () => {
        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Delete test",
                status: "todo"
            });

        const id = createResponse.body.id;
        await request(app)
            .delete(`/api/tasks/${id}`)
            .expect(204);
    });

});