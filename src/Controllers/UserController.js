const userModel = require('../Models/UserModel')
const jwtService = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports ={
    insertOne: async (req,res) =>
        
  {
        try{
            const hash = await bcrypt.hash(req.body.password,Number(process.env.ROUNDS))
            const user = req.body
            user.password = hash
            const result = await userModel.create(user)
                res.status(201).json({
                    message:'Usuário adcionado com sucesso!',
                    content:result})
                
                } catch(error){            
            res.status(400).json({
                message:'Produto duplicado!',
                content:error
            })
        }
},
    findOne: async (req,res) => {
        try{
            const result = await usertModel.findOne({code: req.params.code})
            const {_id,__v,...rest}= result.toObject()
            res.status(200).json({
            message:'Usuário encontrado com sucesso!',
            content:rest
        })}catch(error){
            res.status(200).json({
                message:'produto não encontrado!',
            })
        }},
    deleteOne:async (req,res)=>{
        try{
            const result = await ProductModel.deleteOne({code:req.params.code})
            res.status(200).json({
                message:'produto removido com sucesso!',
                content: result
            })

        }catch(error){
            res.status(400).json({message:`Produto não pode ser removido`})

        }

    },
    findAll: async(req,res)=>{
        try{
            const result = await productModel.find({})
            res.status(200).json({message:'Produtos encotrados', content: result})

        }catch(error){
            res.status(404).json({message:'Não há produtos'})
        }
    },
    updateOne:(req,res)=>{

    },
    login: async (req,res)=>{
        
            try{
                const userResult = await userModel.findOne({email: req.body.email})
                const {__v,_id,...user} = userResult.toObject()
                const result = await bcrypt.compare(req.body.password, user.password)
                if(result){
                    const token = await jwtService.sign(user,process.env.SECRET)
                res.status(200).json({message:'Usuário autenticado com sucesso!',token:token})
                }else{
                    throw new Error('Usuário não encontrado')
                }
            }catch(error){
                res.status(401).json({message:'Usuário não autorizado'})
            }
            
        
    }
}
