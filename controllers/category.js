const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandler')

module.exports.categoryById = (req, res, next, id) =>{
    Category.findById(id).exec((err, category) =>{
        if(err || !category){
            return res.status(400).json({
                error: 'Category does not Exist'
            });
        }
        req.category = category;
        next();
    });
};

module.exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: `${err}`
            })
            
           
        }
        res.json({data});
    })
};

module.exports.read = (req, res ) =>{
    return res.json(req.category);
};

module.exports.update = (req,res) =>{
    const category = req.category
    category.name = req.body.name
    category.save((err, data) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data)
    });
};

module.exports.remove = (req,res) =>{
    const category = req.category
    category.name = req.body.name
    category.remove((err, data) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message : 'Category deleted'
        })
    });
};

module.exports.list = (req,res) =>{
    Category.find().exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data)
    });
};