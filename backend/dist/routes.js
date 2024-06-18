"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma.todo.findMany();
        if (!todos) {
            return res.status(404).json({
                msg: "No todos found!",
            });
        }
        res.status(200).json({
            msg: "Todos found!",
            todos,
        });
    }
    catch (e) {
        console.error(e);
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(411).json({
                msg: "Give valid todo",
            });
        }
        const result = yield prisma.todo.create({
            data: {
                title,
                content,
            },
        });
        res.status(200).json({
            msg: "Todo created successfully",
            result,
        });
    }
    catch (e) {
        console.error(e);
    }
}));
router.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                msg: "Todo not found!",
            });
        }
        yield prisma.todo.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            msg: "Todo deleted successfully!",
        });
    }
    catch (e) {
        console.error(e);
    }
}));
router.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        const existingTodo = yield prisma.todo.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!existingTodo) {
            return res.status(404).json({
                msg: "Todo not found!!",
            });
        }
        yield prisma.todo.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                content,
            },
        });
        res.status(200).json({
            msg: "Todo updated successfully!!",
        });
    }
    catch (e) {
        console.error(e);
    }
}));
exports.default = router;
