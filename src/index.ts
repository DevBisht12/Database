import {Client} from 'pg'
import dotenv from 'dotenv';


dotenv.config();


const client =new Client({
    connectionString:process.env.DB_URL
})

const createUsersTable=async()=>{
    await client.connect()
    const result= await client.query(
        `CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
    )
    console.log(result)
}

createUsersTable()