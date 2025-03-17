
import express, { Request, Response } from "express";

import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());


app.post("/add", async (req: Request, res: Response) => {
 
});

app.get('/todos',async(req:Request,res:Response)=>{
    
})

app.post('/update/:id',async(req:Request,res:Response)=>{
    
})

app.delete('/delete/:id',async(req:Request,res:Response)=>{
    
})


app.listen(3000);
