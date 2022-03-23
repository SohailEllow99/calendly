require('dotenv').config();
const fetch = require('node-fetch');
const tokenValidator = require("./tokenValidator");


module.exports.createWebhookSubscription = async(req,res)=>
{
    console.log("createWebhookSubscription() called");
    console.log("Body : ",req.body);
    const URL = 'https://api.calendly.com/webhook_subscriptions';
    const HEADERS = {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`
    };
    const BODY = {
        url: req.body.url,
        events: req.body.events,
        organization: "https://api.calendly.com/organizations/3b4b3aa6-a599-4708-a939-3891e5762d77",
        user: "https://api.calendly.com/users/4aa99d38-4d73-4acc-bcae-a820a6aab8e6",
        scope: req.body.scope,
        signing_key: process.env.WEBHOOK_SIGNING_KEY
    }
    console.log("created body : ",BODY)

    let result = await fetch(URL,{
        method:'POST',
        mode:'CORS',
        body:JSON.stringify(BODY),
        headers:HEADERS,
        json:true,
    }).then(response=>response.json())
    .then(data=>{
        console.log("Data : ",data);
        return data;
    }).catch(err => console.error('error:' + err));
    console.log("Result",result);
    return res.json(result)
}

module.exports.listWebhookSubscriptions = async(req,res)=>{
    console.log("listWebhookSubscriptions() called");
    const URL = 'https://stoplight.io/mocks/calendly/api-docs/395/webhook_subscriptions?scope=user';

    let result = await fetch(URL,{
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`
        }
    }).then(response=>response.json())
    .then(data=>{
        console.log("Data : ",data);
        return data;
    }).catch(err => console.error('error:' + err));
    console.log("Result",result);
    return res.json(result)
}

module.exports.inviteeCreated = async(req,res)=>{
    try {
        
        console.log("Invitee cancelled");
        console.log("Headers : ",req.headers);
        const calendlyWebhookSignature = req.headers["calendly-webhook-signature"];
        // calendlyWebhookSignature = JSON.parse(calendlyWebhookSignature);
        console.log("CWS : ",calendlyWebhookSignature);
        // calendlyWebhookSignature[v1] = `${calendlyWebhookSignature['v1']}gvcdgvcdgvd`
        // calendlyWebhookSignature = JSON.stringify(calendlyWebhookSignature);
        console.log("CWS : ",calendlyWebhookSignature);
        console.log("Body : ",req.body);
        const verifySignature = await tokenValidator.webhookSignatureValidator(calendlyWebhookSignature,req.body);
        console.log("Result : ",verifySignature);
        
        res.status(200).json({messaage:"success"});
    } catch (error) {
        console.log(`Catched exploited`);
    }
}