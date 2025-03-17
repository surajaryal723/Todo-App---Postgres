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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const client = new client_1.PrismaClient();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    try {
        let result = yield client.user.create({
            data: {
                username: username,
                password: password,
            },
        });
        res.json({
            userId: result.id,
        });
    }
    catch (e) {
        res.json({
            message: "Something went wrong!",
        });
    }
}));
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title, userId } = req.body;
    try {
        let result = yield client.todo.create({
            data: {
                title,
                userId: Number(userId)
            }
        });
        res.json({
            message: 'Todo Added Successfully! '
        });
    }
    catch (e) {
        res.json({
            message: 'Something went wrong'
        });
    }
}));
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield client.todo.findMany({
        select: {
            title: true,
        }
    });
    res.json({
        todos
    });
}));
app.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title } = req.body;
    try {
        let result = yield client.todo.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title
            }
        });
        res.json({
            message: 'Updated'
        });
    }
    catch (e) {
        res.json({
            message: 'Something went wring!'
        });
    }
}));
app.listen(3000);
