const express=require('express');
const app=express();
const path=require('path');
const port=3000;
require('dotenv').config(); 
const nodemailer=require('nodemailer');


app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/sendMail.html'));
app.use("/static", express.static('./static/'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/sendMail.html');
    
  });

app.post('/mail',(req,res)=>{
    const emailTo=req.body.emailTo;
    const subject=req.body.subject;
    const message=req.body.message;

    const transporter = nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
    
      const mailOptions={
        from: {
            name:'Readers Library',
            address:process.env.MAIL_USER
        }, // sender address
        to: emailTo, // list of receivers
        subject: subject,
        html:`<p>${message}</p>`, // Subject line
        text: "Hello subscriber, Please find the new books arrived yesterday. Happy to welcome you...", // plain text body
    
      }
    
      const sendMail =async(transporter,mailOptions)=>{
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email has been sent!')
        } catch (error) {
            console.log(error);
        }
      }
    
      sendMail(transporter,mailOptions);

});


app.listen(3000,()=>{
    console.log('Server starts listening on port no:3000');
})