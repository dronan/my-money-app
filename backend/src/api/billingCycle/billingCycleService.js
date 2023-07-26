const BillingCycle = require('./billingCycle')

// create the methods REST
BillingCycle.methods(['get', 'post', 'put', 'delete'])

// udpate the options of the methods
BillingCycle.updateOptions({ new: true, runValidators: true })

// define a route for get method retriving all the documents in the collection, or returning an error if it happens
BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {
        if(!err) {
            res.json(docs)
        } else {
            res.status(500).json({errors: [error]})
        }
    })
})

module.exports = BillingCycle