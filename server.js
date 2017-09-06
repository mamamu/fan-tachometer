
var express = require('express');
var path = require('path')
var multer = require('multer');
var app = express();

app.use(express.static('public'));
/*
uncomment this if needed
var storage = multer.diskStorage({
	 destination: function(req, file, callback) {    
		callback(null, './uploads')
	},
	filename: function(req, file, callback) {		
		callback(null, "generic filename")
    console.log(req.file.name);
    //file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
*/
app.get("/", function (req, res){
  res.redirect("/file");
})

app.get("/file", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/file', function(req, res) {
	var upload = multer({
    //don't need to store file for this project, just return info
		//storage: storage
	}).single('userFile')
	upload(req, res, function(err) {
    console.log(req.file);
    var filesize=req.file.size;    
		res.json({"size":filesize});
	})
})
 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
