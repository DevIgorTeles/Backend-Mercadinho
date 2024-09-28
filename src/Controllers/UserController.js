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
                message:'Usuário duplicado!',
                content:error
            })
        }
},
findOne: async (req, res) => {
    try {
        const result = await userModel.findOne({ code: req.params.code });
        if (!result) {
            return res.status(404).json({
                message: 'Usuário não encontrado!',
            });
        }
        const { _id, __v, ...rest } = result.toObject();
        res.status(200).json({
            message: 'Usuário encontrado com sucesso!',
            content: rest
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao encontrar o usuário!',
            content: error.message
        });
    }
},
    deleteOne: async (req, res) => {
        try {
            const result = await userModel.deleteOne({ code: req.params.code });
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: 'Usuário não encontrado!',
                });
            }
            res.status(200).json({
                message: 'Usuário removido com sucesso!',
                content: result
            });
        } catch (error) {
            res.status(400).json({ message: 'Usuário não pode ser removido', content: error.message });
        }
    },
    findAll: async (req, res) => {
        try {
            const result = await userModel.find({});
            res.status(200).json({ message: 'Usuários encontrados', content: result });
        } catch (error) {
            res.status(404).json({ message: 'Não há usuários', content: error.message });
        }
    },
    updateOne: async (req,res)=>{
        try {
            const { code } = req.params;
            const updatedUser = await userModel.findOneAndUpdate({ code }, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado para atualização' });
            }
            res.status(200).json({ message: 'Usuário atualizado com sucesso!', content: updatedUser });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar usuário', content: error.message });
        }

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
