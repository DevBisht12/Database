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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.DB_URL
});
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const result = yield client.query(`CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log(result);
});
const insetData = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const insertQuery = "INSERT INTO users (username,email,password)";
        const values = [username, email, password];
        const res = yield client.query(insertQuery, values);
        console.log(res);
    }
    catch (error) {
        console.log('Error during the insertion', error);
    }
    finally {
        yield client.end();
    }
});
insetData('john', 'john@example.com', '123');
const getData = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const query = 'SELECT * FROM users WHERE email =$1';
        const result = yield client.query(query, [email]);
        if (result.rows.length > 0) {
            console.log(result.rows[0]);
        }
        else {
            console.log('No user found');
        }
    }
    catch (error) {
        console.log('Error during the query', error);
    }
    finally {
        yield client.end();
    }
});
// getData('john@example.com')
