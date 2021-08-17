const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")('sk_test_51JJLwgL5riUHAwMdqMzF90016RVEHUeGf5dvI9OWmMn6mTBncJe47S3r30fSdwYkwbXgWxdoMfrZvDzgNQu5nXvH00z3ub53Q9')

//  API

//  -app config
const app = express();

//  -Middlewares
app.use(cors({origin : true}));
app.use(express.json());

// -API routes
app.get("/", (request, response) => response.status(200).send('Hello world'))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log('payment request recieved boom!! for this amount >>>' , total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    })

    // ok - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// -Listen command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://localhost:5001/challenge-92c0d/us-central1/api