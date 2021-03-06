const multer = require("multer");
const pdfFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("application/pdf") 
    ) {
      cb(null, true);
    } else {
      cb("Please upload only PDF file.", false);
    }
  };
  var storage = multer.diskStorage({
    // storage file
    
    destination: (req, file, cb) => {
      cb(null, __basedir + "/public/Customer/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
      cb(null, `${file.originalname}`);
    },
  });
  let uploadFile = multer({ storage: storage, fileFilter: pdfFilter });
  module.exports = uploadFile  