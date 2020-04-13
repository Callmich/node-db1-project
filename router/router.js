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
    const acctData = req.body
    db("accounts")
    .insert(acctData, 'id')
    .then(newId =>{
        const id = newId[0];
        db("accounts")
        .where({ id })
        .first()
        .then(newAcct =>{
            res.status(200).json(newAcct)
        })
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({error: "Server Error creating new account"})
    })
})

router.patch("/:id", (req, res)=>{
    const changes = req.body;
    const { id } = req.params;

    db("accounts")
    .where({ id })
    .update(changes)
    .then(number => {
        if (number > 0){
            res.status(200).json({message: "Update successful"})
        } else{
            res.status(404).json({message: `The account with ID ${req.params.id} does not exist`})
        }
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({error: "Server error updating the account"})
    })
})

router.delete("/:id", (req, res)=>{
    db("accounts")
    .where("id", req.params.id)
    .del()
    .then(delAcct =>{
        if(delAcct){
            console.log(delAcct)
            res.status(200).json({message: "Account Deleted"})
        } else{
            res.status(404).json({message: `The account ${req.params.id} does not exist`})
        }

    })
    .catch(error =>{
        res.status(500).json({message: "Server error while deleting"})
    })
})

module.exports = router;