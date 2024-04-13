import express from "express"
import { createClient } from "redis"

const app = express()

const client = createClient()
client.connect()

app.post("/submit", (req, res) => {
    const { problemId, userId, code, language } = req.body
    // push this to a database prisam.submission.create()
    client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }))
    res.json({
        message: "Submission received!"
    })
})