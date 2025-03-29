import Gadget from "../models/gadget.model.js";
import {generateSuccessProbability,generateCodename} from '../util.js';

export const getGadgets = async(req,res)=>{
    try{
        const {status}=req.query;
        const gadgets=status?await Gadget.findAll({where:{status}}):await Gadget.findAll();
        // res.status(200).json({
        //     success:true,
        //     message:'Gadgets fetched successfully',
        //     successProbability:generateSuccessProbability(),
        //     data:gadgets
        // }) 
        res.staus(200).json({
            success:true,
            message:'Gadgets fetched successfully',
            data:gadgets.map(g => ({ ...g.toJSON(), successProbability: `${generateSuccessProbability()}%` }))});
    }
    catch(err){
        console.log('Error in getGadgets',err);
        res.status(500).send('Internal server error');
    }
}

export const createGadget = async(req,res)=>{
    try{
        const {id,name,status}=req.body;
        const existingGadget=await Gadget.findOne({where:{name}});
        if(existingGadget)
        {
            return res.status(400).json({
                success:false,
                message:'Gadget with this name already exists'
            })
        }
        const gadget=await Gadget.create({id,name,status});
        res.status(201).json({
            success:true,
            message:'Gadget created successfully',
            codename:generateCodename(),
            data:gadget
        })
    }
    catch(err){
        console.log('Error in createGadget',err);
        res.status(500).send('Internal server error');
    }
}

export const updateGadget = async(req,res)=>{
    try{
        const {name,status}=req.body;
        const {id}=req.params;
        const gadget = await Gadget.findOne({where:{id}});
        if(!gadget)
        {
            return res.status(400).json({
                success:false,
                message:'Gadget not found'
            })
        }
        await Gadget.update({name,status},{where:{id}});
        res.status(200).json({
            success:true,
            message:'Gadget updated successfully',
        })
    }
    catch(err){
        console.log('Error in updateGadget',err);
        res.status(500).send('Internal server error');
    }
}

export const deleteGadget = async(req,res)=>{
    try{
        const {id}=req.params;
        const gadget = await Gadget.findOne({where:{id}});
        if(!gadget)
        {
            return res.status(400).json({
                success:false,
                message:'Gadget not found'
            })
        }
        await Gadget.update({status:'Decommissioned' },{where:{id}});
        res.status(200).json({
            success:true,
            message:'Gadget decmomissioned successfully',
        })
    }
    catch(err){
        console.log('Error in deleteGadget',err);
        res.status(500).send('Internal server error');
    }
}

export const getGadget=async(req,res)=>{
    try{
        const {id}=req.params;
        const gadget=await Gadget.findOne({where:{id}});
        if(!gadget)
        {
            return res.status(400).json({
                success:false,
                message:'Gadget not found'
            })
        }
        res.status(200).json({
            success:true,
            message:'Gadget fetched successfully',
            data:gadget
        })
    }
    catch(err){
        console.log('error in getGadget',err);
        res.status(500).send('Internal server error');
    }
}

export const selfDestructGadget = async (req, res) => {
    try {
      const { id } = req.params;
  
      const gadget = await Gadget.findOne({ where: { id } });
      if (!gadget) {
        return res.status(400).json({
          success: false,
          message: "Gadget not found",
        });
      }
  
      const confirmationCode = Math.floor(1000 + Math.random() * 9000);

      await Gadget.update({ status: "Destroyed" }, { where: { id } });
      res.status(200).json({
        success: true,
        message: `Gadget self-destructed successfully with confirmation code ${confirmationCode}`,
        data: confirmationCode,
      });
    } catch (err) {
      console.log("Error in selfDestructGadget", err);
      res.status(500).send("Internal server error");
    }
  };