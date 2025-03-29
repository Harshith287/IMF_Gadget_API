import express from "express";
import { syncDatabase } from "./database/db.js";
import { PORT } from "./env.js";
import authRouter from "./routes/auth.route.js";
import gadgetRouter from "./routes/gadget.router.js";

const app = express();
app.use(express.json());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/gadgets',gadgetRouter);

app.get("/",(req,res)=>{
    res.send("Gadget API Development Challenge");
})

app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await syncDatabase();
});

export default app;