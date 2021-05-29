const express = require('express');
const router = express.Router()

const {create,categoryById, read, update, remove, list} = require('../controllers/category')
const {userSignupValidator} = require('../validator/index')
const {requireSignin, isAdmin,isAuth} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.get('/category/:categoryId',read)
router.post('/category/create/:userId'
                
                ,requireSignin
                ,isAuth
                ,isAdmin
                , create
                ,userSignupValidator
                );
router.put('/category/:categoryId/:userId',requireSignin
,isAdmin,isAuth
, userSignupValidator
, update)
router.delete('/category/:categoryId/:userId',requireSignin
,isAdmin,isAuth
, userSignupValidator
, remove)
router.get('/categories',list)

router.param('catergoryId',categoryById)
router.param('userId',userById)


module.exports = router;