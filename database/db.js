import { Sequelize } from "sequelize";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../env.js";

export const sequelize = new Sequelize({
    dialect:'postgres',
    host:DB_HOST,
    username:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    logging:false
})

export const syncDatabase=async()=>{
    try{
        await sequelize.sync({alter:true});
        console.log('Database synced successfully');
    }
    catch(err)
    {
        console.log('Error in syncing database',err)
    }
}
