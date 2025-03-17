import express, { Request, Response } from "express";

import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const client = new PrismaClient();

app.post("/signup", async (req: Request, res: Response) => {
  let { username, password } = req.body;
  try {
    let result = await client.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    res.json({
      userId: result.id,
    });
  } catch (e) {
    res.json({
      message: "Something went wrong!",
    });
  }
});
app.post("/add", async (req: Request, res: Response) => {
    let {title,userId}=req.body

    try{
        let result=await client.todo.create({
            data:{
                title,
                userId:Number(userId)
            }
        })
        res.json({
            message:'Todo Added Successfully! '
        })
    }catch(e){
        res.json({
            message:'Something went wrong'
        })
    }
});

app.get('/todos',async(req:Request,res:Response)=>{
    let todos=await client.todo.findMany({
        select:{
            title:true,
            
        }
    })
    res.json({
        todos
    })
})

app.post('/update/:id',async(req:Request,res:Response)=>{
    let{title}=req.body
    
    try{
        let result=await client.todo.update({
            where:{
                id:parseInt(req.params.id)
            },
            data:{
                title
            }
        })
        res.json({
            message:'Updated'
        })
    }catch(e){
        res.json({
            message:'Something went wring!'
        })
    }
})



app.listen(3000);
