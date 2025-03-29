import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Gadget = sequelize.define('Gadget',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM('Available','Deployed',"Destroyed", "Decommissioned"),
        defaultValue:'Available',
    }
})

export default Gadget;