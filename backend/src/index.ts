import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { Client } from "pg";
const app = express();

app.use(express.json());

const pgClient = new Client(process.env.DB_CONNECTION_URL);

pgClient.connect();

app.post("/add", async (req: Request, res: Response) => {
  const { title } = req.body;
  const insertQuery =
    "INSERT INTO todos(title) VALUES($1);"

try{
    const result=await pgClient.query(insertQuery,[title])
 

    res.json({
      message: "Todo Added Successfully",
    });
}catch(e){
    res.json({
        message:'Unable to add todo'
    })
}
});

app.get('/todos',async(req:Request,res:Response)=>{
    try{
        let todos=await pgClient.query('SELECT * FROM todos;')
        res.json({
            todos:todos.rows
        })
    }catch(e){
        res.json({
            message:'Not able to fetch todos at the moment!'
        })
    }
})

app.post('/update/:id',async(req:Request,res:Response)=>{
    try{
        await pgClient.query(`UPDATE todos SET completed='true' WHERE ID='${req.params.id}'`)
        res.json({
            message:'Todo updated'
        })

    }catch(e){
        res.json('Something went wrong')
    }
})

app.delete('/delete/:id',async(req:Request,res:Response)=>{
    try{
        await pgClient.query(`DELETE FROM todos WHERE ID='${req.params.id}'`)
        res.json({
            message:'Todo deleted'
        })

    }catch(e){
        res.json('Something went wrong')
    }
})


app.listen(3000);
