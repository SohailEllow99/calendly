const router = require('express').Router();
const functions = require("./functions");

router.get('/check',(req,res)=>{
    console.log(`check OK`);
    res.send('Check oK');
});

router.post("/createWebhookSubscription",functions.createWebhookSubscription);
router.post("/listWebhookSubscriptions",functions.listWebhookSubscriptions);
router.post("/inviteeCreated",functions.inviteeCreated);
router.post("/inviteeCancelled",(req,res)=>{
    console.log("Invitee cancelled");
    console.log(req);
    res.status(200).json({messaage:"success"});
});


module.exports = router