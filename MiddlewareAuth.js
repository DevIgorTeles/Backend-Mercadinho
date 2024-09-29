const jwtService = require('jsonwebtoken')

module.exports = async (req,res,next)=>{
    const path = req.path
    const method = req.method
    const nonSecurityPaths = ['/login','/about', '/api/products']

    if(nonSecurityPaths.includes(path) || (path === '/api/users' && method === 'POST')){
        return next ()
    }

    const token = req.headers.authorization
        try{
            const result = jwtService.verify(token, process.env.SECRET)
            if(result){
                return next()
            } 
                throw new Error('Usuário sem autorização')

        }catch(error){
            res.status(401).json({message: error.message})
            
        }
    

}