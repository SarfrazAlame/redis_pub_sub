import express from "express"
import { createClient } from "redis"

const app = express()

const client = createClient()
client.connect()

app.post("/submit", async (req, res) => {
    const { problemId, code, language, userId } = req.body
    // push this to a database prisam.submission.create()
    console.log("hii")
    try {
        await client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }))
        return res.json({
            message: "Submission received!"
        })
    } catch (error) {
        return res.json({
            message:"Submission failed"
        })
    }
})

app.listen(3000)