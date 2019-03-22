const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const lists = require('./mock-lists.json')

app.use(cors())
app.use(express.json())
app.use(express.static('assets'));


app.put('/card', function (req, res) {
    const applicantId = req.body.applicant.id
    const oldContainer = lists.find(list => list.applicants.some(applicant => applicant.id === applicantId));
    const applicant = oldContainer.applicants.find(applicant => applicant.id === applicantId)

    // remove from old container
    const entryIndex = oldContainer.applicants.indexOf(applicant)
    oldContainer.applicants.splice(entryIndex, 1)
    console.log(oldContainer.applicants)

    // add to new container
    const newContainer = lists.find(list => list.id === req.body.container)
    applicant.list = newContainer.id
    newContainer.applicants.splice(req.body.index, 0, applicant);
    res.send()
})

app.get('/lists', function (req, res) {
    res.send(lists)
})

app.listen(port)