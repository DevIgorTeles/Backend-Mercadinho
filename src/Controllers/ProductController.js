const productModel = require('../Models/ProductModel');

module.exports = {
    // Adicionar um novo produto
    insertOne: async (req, res) => {
        try {
            const { code, name, price, description, image } = req.body;

            // Verifica se o produto com o mesmo código já existe
            const existingProduct = await productModel.findOne({ code });
            if (existingProduct) {
                return res.status(400).json({ message: 'Código duplicado' });
            }

            // Cria o novo produto com os campos fornecidos
            const newProduct = new productModel({ code, name, price, description, image });
            const result = await newProduct.save();

            res.status(201).json({
                message: 'Produto adicionado com sucesso!',
                content: result
            });
        } catch (error) {
            res.status(400).json({
                message: 'Erro ao adicionar produto',
                content: error.message
            });
        }
    },

    // Encontrar um produto por código
    findOne: async (req, res) => {
        try {
            const { code } = req.params;
            const result = await productModel.findOne({ code });

            if (result) {
                const { _id, __v, ...rest } = result.toObject();
                res.status(200).json({
                    message: 'Produto encontrado com sucesso!',
                    content: rest
                });
            } else {
                res.status(404).json({
                    message: 'Produto não encontrado!'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao buscar o produto',
                content: error.message
            });
        }
    },

    // Remover um produto por código
    deleteOne: async (req, res) => {
        try {
            const { code } = req.params;
            const result = await productModel.deleteOne({ code });

            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: 'Produto removido com sucesso!',
                    content: result
                });
            } else {
                res.status(404).json({
                    message: 'Produto não encontrado!'
                });
            }
        } catch (error) {
            res.status(400).json({
                message: 'Produto não pode ser removido',
                content: error.message
            });
        }
    },

    // Encontrar todos os produtos
    findAll: async (req, res) => {
        try {
            const result = await productModel.find({});
            res.status(200).json({
                message: 'Produtos encontrados',
                content: result
            });
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao buscar produtos',
                content: error.message
            });
        }
    },

    // Atualizar um produto por código
    updateOne: async (req, res) => {
        try {
            const { code } = req.params;
            const updateData = req.body;

            // Evita a atualização do campo 'code' para manter a unicidade
            if (updateData.code && updateData.code !== code) {
                const existingProduct = await productModel.findOne({ code: updateData.code });
                if (existingProduct) {
                    return res.status(400).json({ message: 'Código duplicado' });
                }
            }

            const updatedProduct = await productModel.findOneAndUpdate({ code }, updateData, { new: true });

            if (updatedProduct) {
                res.status(200).json({
                    message: 'Produto atualizado com sucesso!',
                    content: updatedProduct
                });
            } else {
                res.status(404).json({
                    message: 'Produto não encontrado!'
                });
            }
        } catch (error) {
            res.status(400).json({
                message: 'Erro ao atualizar produto',
                content: error.message
            });
        }
    },

    // Adicionar uma promoção a um produto
    addPromotion: async (req, res) => {
        try {
            const { code } = req.params;
            const { promotionPrice } = req.body;

            // Validação do preço promocional
            if (promotionPrice === undefined || promotionPrice === null || isNaN(promotionPrice)) {
                return res.status(400).json({ message: 'Preço promocional inválido' });
            }

            const product = await productModel.findOne({ code });

            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado!' });
            }

            // Atualiza o preço promocional
            product.promotionPrice = promotionPrice;
            await product.save();

            res.status(200).json({
                message: 'Promoção adicionada com sucesso!',
                content: product
            });
        } catch (error) {
            res.status(400).json({
                message: 'Erro ao adicionar promoção',
                content: error.message
            });
        }
    },

    // Remover a promoção de um produto
    removePromotion: async (req, res) => {
        try {
            const { code } = req.params;
            const product = await productModel.findOne({ code });

            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado!' });
            }

            if (!product.promotionPrice) {
                return res.status(400).json({ message: 'Este produto não possui promoção ativa.' });
            }

            // Remove o preço promocional
            product.promotionPrice = undefined;
            await product.save();

            res.status(200).json({
                message: 'Promoção removida com sucesso!',
                content: product
            });
        } catch (error) {
            res.status(400).json({
                message: 'Erro ao remover promoção',
                content: error.message
            });
        }
    }
};
