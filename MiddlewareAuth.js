const jwtService = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const path = req.path;
    const method = req.method;
    const nonSecurityPaths = ['/login', '/about', '/api/products', '/api/users'];

    // Permite POST em /api/users para cadastro de novos usuários
    if (nonSecurityPaths.includes(path) || (path === '/api/users' && method === 'POST')) {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verifica se o token está no formato 'Bearer <token>'
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    const token = parts[1];

    try {
        const result = jwtService.verify(token, process.env.SECRET);
        if (result) {
            req.user = result; // Opcional: adiciona as informações do usuário à requisição
            return next();
        }
        throw new Error('Usuário sem autorização');
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
