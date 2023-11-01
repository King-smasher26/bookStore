const express = require('express');
const bookModel = require('../models/bookModel')
const router = express.Router();


router.get('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const book = await bookModel.findById(id);
        return res.status(200).json(book)
    }catch(e){
        return res.status(400).send(e)
    }
})
router.get('/',async (req,res)=>{
    try{
        const books = await bookModel.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        })
    }catch(e){
        console.log(e);
        res.status(500).send({message:e.message})
    }
})
router.post('/',async (req,res)=>{

    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(400).send('enter all values')
            }

                
                async function createbook(){
                    try{
                        const mybook = new bookModel({title:req.body.title,author:req.body.author,publishYear:req.body.publishYear}) 
                        await mybook.save();
                        console.log(mybook)
                    }catch(e){
                        console.log(e)
                    }
                }
            createbook()
            return res.status(200).send(`book created`)
    }catch(e){
        console.log(e)
        return res.status(400).send(e)
    }
})
 

// route to update a book

router.put('/:id',async (req,res)=>{
    try{
        if(!req.body.title||
            !req.body.author||
            !req.body.publishYear){
                return res.status(400).send('enter all values')
            }
            
            const {id} = req.params;
            const result = await bookModel.findByIdAndUpdate(id,req.body);
            console.log('entered console rn')
            if(!result){
                return res.status(400).send('Book not found')
            }
            return res.status(200).send('Book updated successfully')
            
        }catch(e){
            console.log(e);
            res.status(500).send({message:e.message})
        }
    })
    
    // route to delete a book
    
    router.delete('/:id',async (req,res)=>{
        try{
                
                const {id}=req.params;
                const result = await bookModel.findByIdAndDelete(id);
                if(!result){
                    return res.status(400).send('Book not found')
                    
                }
                return res.status(200).send('Book Deleted successfully')
                
    }catch(e){
        console.log(e)
        res.status(500).send({message:e.message})

    }
})

module.exports = router;