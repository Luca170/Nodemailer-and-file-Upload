const express = require("express")
const nodemailer = require("nodemailer")
const fileUpload = require("express-fileupload")
const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.json())
app.use(
    fileUpload({limits: { fileSize: 50 * 1024 * 1024 }})
  );
app.use(express.urlencoded({extended:true}))
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '********@gmail.com',
      pass: '******'
    }
  });
  
  var mailOptions = {
    from: '*******@gmail.com',
    to: '******@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  app.get("/", (req,res) => {
      res.render("home.ejs")
  })
app.post("/fileupload", async (req,res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let img = req.files.img;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            img.mv('./uploads/' + img.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name:img.name,
                    mimetype:img.mimetype,
                    size:img.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})
app.listen(8000)