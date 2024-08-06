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
const insetData= async(username:string,email:string,password:string)=>{
    
    try {

        await client.connect()
        const insertQuery ="INSERT INTO users (username,email,password)"
        const values=[username,email,password];
        const res= await client.query(insertQuery,values)
        console.log(res)
    } catch (error) {
        console.log('Error during the insertion',error)
    }finally{
        await client.end()
    }
}

insetData('john','john@example.com','123')


const getData= async(email:string)=>{
    try {
        await client.connect()
        const query='SELECT * FROM users WHERE email =$1'
        const result= await client.query(query,[email])

        if(result.rows.length>0){
            console.log(result.rows[0])
        }else{
            console.log('No user found')
        }
    } catch (error) {
        console.log('Error during the query',error)
    } finally{
        await client.end()
    }
}

// getData('john@example.com')