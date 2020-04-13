const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router();

router.get("/", (req, res)=>{
    db.select('*').from('accounts')
    .then(accounts=>{
        res.status(200).json(accounts)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({error: error.message})
    })
})

router.get("/:id", (req, res)=>{
    db('accounts')
    .where('id', req.params.id)
    .first()
    .then(account =>{
        if (account){
          res.status(200).json(account)
        } else{
            res.status(404).json({message: `The account with ID ${req.params.id} does not exist`})
        }
        
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({error: "The server could not retrieve this account"})
    })
})

router.post("/", (req, res)=>{

})

router.patch("/:id", (req, res)=>{

})

router.delete("/:id", (req, res)=>{

})

module.exports = router;