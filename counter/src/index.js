const express = require('express')
const redis = require('redis')

const PORT = process.env.PORT || 8989
const REDIS_URL = process.env.REDIS_URL || 'localhost'

const app = express()

const client = redis.createClient({url: REDIS_URL});

app.get('/counter/:id', async (req, res) => {
    const {id} = req.params
    await client.get(id, (err, rep) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json({
                'rep': rep
            })
        }
    })
})

app.post('/counter/:id/incr', async (req, res) => {
    const {id} = req.params
    await client.incr(id, (err, rep) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.status(200).end();
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`server port: ${PORT}`)
})