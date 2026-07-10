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
                course: "CS453",
                completed: false
            })
            .expect(201);

        expect(response.body.title).toBe("Test task");
        expect(response.body.course).toBe("CS453");
        expect(response.body.completed).toBe(false);
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

    test("POST /api/tasks rejects non-boolean for completed", async () => {
        const response = await request(app)
            .post("/api/tasks")
            .send({
                title: "Invalid task",
                course: "CS453",
                completed: "false"
            })
            .expect(400);

        expect(response.body.error).toBeDefined();
    });

    test("GET /api/tasks/:id returns a task", async () => {

        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Get test",
                course: "CS453",
                completed: false
            });

        const id = createResponse.body.id;
        const response = await request(app)
            .get(`/api/tasks/${id}`)
            .expect(200);

        expect(response.body.id).toBe(id);
        expect(response.body.title).toBe("Get test");
    });

    test("GET /api/tasks/:id returns 404 for missing task", async () => {
        await request(app)
            .get("/api/tasks/999")
            .expect(404);
    });

    test("PUT /api/tasks/:id replaces a task", async () => {
        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Old task",
                course: "CS453",
                completed: false
            });

        const id = createResponse.body.id;
        const response = await request(app)
            .put(`/api/tasks/${id}`)
            .send({
                title: "Updated Task",
                course: "CS453",
                completed: true
            })
            .expect(200);

        expect(response.body.title).toBe("Updated Task");
        expect(response.body.course).toBe("CS453")

        expect(response.body.completed).toBe(true);
    });

    test("PATCH /api/tasks/:id updates a task", async () => {

        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Update Test",
                course: "CS453",
                completed: false
            });

        const id = createResponse.body.id;
        const response = await request(app)
            .patch(`/api/tasks/${id}`)
            .send({
                completed: true
            })
            .expect(200);
        expect(response.body.completed).toBe(true);
    });

    test("PATCH /api/tasks/:id rejjects empty update", async () => {
        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Patch test",
                course: "CS453",
                completed: false
            });
        const id = createResponse.body.id;
        const response = await request(app)
            .patch(`/api/tasks/${id}`)
            .send({})
            .expect(400);

        expect(response.body.error).toBeDefined();
    });


    test("DELETE /api/tasks/:id deletes a task", async () => {
        const createResponse = await request(app)
            .post("/api/tasks")
            .send({
                title: "Delete test",
                course: "CS453",
                completed: false
            });

        const id = createResponse.body.id;
        await request(app)
            .delete(`/api/tasks/${id}`)
            .expect(204);
    });


    test("DELETE /api/tasks/:id returns 404 for missing task", async () => {
        await request(app)
            .delete("/api/tasks/999")
            .expect(404);
    });

});