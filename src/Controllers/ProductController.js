const productModel = require('../Models/ProductModel')
module.exports ={
    insertOne: async (req,res) =>
  {
        try{
            if(existingProduct){
                return res.status(400).json({message: 'codigo duplicado'})
            }
            else{const result = await productModel.create(req.body)
                res.status(201).json({
                    message:'produto adcionado com sucesso!',
                    content:result
                })}}
            
        catch(error){            
            res.status(400).json({
                message:'Produto duplicado!',
                content:error
            })
        }
},
    findOne: async (req,res) => {
        try{
            const result = await productModel.findOne({code: req.params.code})
            const {_id,__v,...rest}= result.toObject()
            res.status(200).json({
            message:'produto encontrado com sucesso!',
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

    }
}
