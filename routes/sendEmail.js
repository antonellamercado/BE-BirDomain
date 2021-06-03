const { Router } = require("express");
const nodemailer = require('nodejs-nodemailer-outlook');
const router = Router();

router.post("/send-email", async (req, res) => {
    const { message, userEmail, token } = req.body;

    //cambiar al FRONT HEROKU

    contentHTML = `
        <h4>${message}</h4>
        <a href="http://bird-domain.herokuapp.com/ChangePass/${token}">Cambiar Clave</a>
    `;

    /*const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // use SSL
        auth:{
            user:'birdmastertucuman@outlook.com',
            pass:'BirdDomain77'
        }
    });
    const mailOptions= {
        from: "'Bird Domain'<birdmastertucuman@gmail.com>",
        to:`${userEmail}`,
        subject: 'Recuperar Contraseña',
        html: contentHTML
    }
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);  
        } else {     
            console.log('Email sent: ' + info.response);  
        }   
   });
    console.log('Mensaje enviado')
    res.send('recibido');*/
    nodemailer.sendEmail({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: "birdmastertucuman@outlook.com",
            pass: "BirdDomain77"
        },
        from: 'birdmastertucuman@outlook.com',
        to: `${userEmail}`,
        subject: 'Recuperar Contraseña',
        html: contentHTML,
        
        
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    }
    
    
    );
});

module.exports = router;