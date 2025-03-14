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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client(process.env.DB_CONNECTION_URL);
pgClient.connect();
app.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const insertQuery = "INSERT INTO todos(title) VALUES($1);";
    try {
        const result = yield pgClient.query(insertQuery, [title]);
        res.json({
            message: "Todo Added Successfully",
        });
    }
    catch (e) {
        res.json({
            message: 'Unable to add todo'
        });
    }
}));
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todos = yield pgClient.query('SELECT * FROM todos;');
        res.json({
            todos: todos.rows
        });
    }
    catch (e) {
        res.json({
            message: 'Not able to fetch todos at the moment!'
        });
    }
}));
app.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgClient.query(`UPDATE todos SET completed='true' WHERE ID='${req.params.id}'`);
        res.json({
            message: 'Todo updated'
        });
    }
    catch (e) {
        res.json('Something went wrong');
    }
}));
app.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pgClient.query(`DELETE FROM todos WHERE ID='${req.params.id}'`);
        res.json({
            message: 'Todo deleted'
        });
    }
    catch (e) {
        res.json('Something went wrong');
    }
}));
app.listen(3000);
