const Customer = require('mongoose').model("Customer");
const Log = require('mongoose').model("Log");
const User = require('mongoose').model("User")
const PDFDocument = require('pdfkit')
const fs = require('fs')
const path  = require('path')
const CreateCustomer = async(req,res)=>{
    const {Role,_id,Fname,Lname} = req.user
    if (Role === "user") {
        const doc = new PDFDocument({
            Title: `ข้อมูลลูกค้า ${req.body.PersNo}`,
            Author: `${req.body.Fname} ${req.body.Lname}`,
            autoFirstPage: true,
            size:[595, 841],
            margin:50
        });

            let haveCustomer = await Customer.findOne({PersNo:req.body.PersNo});
            if(haveCustomer) return res.status(401).send()
// Saving the pdf file in root directory.
            const pipFilePath = path.join( __basedir + "/public/", `${req.body.PersNo}.pdf`);
            doc.pipe(fs.createWriteStream(pipFilePath));
            
            // Adding functionality
            doc
            .font('asset/fonts/Sarabun-BoldItalic.ttf')
            .fontSize(30)
            .text('ข้อมูลลูกค้า', {align: `center`}).moveDown(1.5);
            doc.text(`PersID : ${req.body.PersNo}`).fontSize(25).font(`asset/fonts/Sarabun-Regular.ttf`).moveDown(0.5)
            doc.text(`Name : ${req.body.Fname} ${req.body.Lname}`).fontSize(30).font(`asset/fonts/Sarabun-Regular.ttf`).moveDown(0.5)
            doc.text(`Address : ${req.body.Address}`).fontSize(30).font(`asset/fonts/Sarabun-Regular.ttf`).moveDown(1)
           

            doc.end();
            const customer = new Customer({...req.body,UserId:_id,pathPDF:`/${req.body.PersNo}.pdf`});
            await customer.save()
            let log = new Log({CustomerId:customer._id,UserId:_id,Description:"สร้างลูกค้า" , NameCustomer:`${req.body.Fname} ${req.body.Lname}`,NameUser:`${Fname} ${Lname}`})
            await log.save()
        return res.status(200).send()
    }
    return res.status(403).send();
}

const ListCustomers = async(req,res)=>{
    const {Role,_id} = req.user
    if (Role === "user") {
        let customer = await Customer.find({$and:[{Status:req.query.Status},{UserId:_id}]});
        return res.status(200).send(customer)
    }
    return res.status(403).send();
}
const FetchCustomer = async(req,res) => {
    const {Role,_id} = req.user
    const target = req.params.id
    if (Role === "user") {
        const customer = await Customer.findOne({$and:[{_id:target},{UserId:_id}]})
        console.log(customer);
        return res.status(200).send(customer)
    }
    return res.status(403).send()
}

const ChangeStatus = async(req,res) => {
    const {Role,_id} = req.user
    const target = req.params.id
    if (Role === "admin") {
      await  Customer.updateOne({_id:target},req.body)
      return res.status(200).send()
    }
    return res.status(403).send()
}
const DeleteCustomer = async(req,res) => {
    const {Role} = req.user
    const target = req.params.id
    if (Role === "user") {
        await Customer.deleteOne({_id:target});
        return res.status(204).send();
    }
    return res.status(403).send();
}
const UpdateCustomer = async(req,res) => {
    const {Role,_id,Fname,Lname} = req.user
    const target = req.params.updateID
    if (Role === "user") {
        const doc = new PDFDocument({
            Title: `ข้อมูลลูกค้า ${req.body.PersNo}`,
            Author: `${req.body.Fname} ${req.body.Lname}`,
            autoFirstPage: true,
            size:[595, 841],
            margin:50
        });
        const pipFilePath = path.join( __basedir + "/public/", `${req.body.PersNo}.pdf`);
        doc.pipe(fs.createWriteStream(pipFilePath));
        
        // Adding functionality
        doc
        .font('asset/fonts/Sarabun-BoldItalic.ttf')
        .fontSize(30)
        .text('ข้อมูลลูกค้า', {align: `center`}).moveDown(1.5);
        doc.text(`PersID : ${req.body.PersNo}`).fontSize(25).font(`asset/fonts/Sarabun-Regular.ttf`).moveDown(0.5)
        doc.text(`Name : ${req.body.Fname} ${req.body.Lname}`).fontSize(30).font(`asset/fonts/Sarabun-Regular.ttf`).moveDown(0.5)
        doc.text(`Address : ${req.body.Address}`).fontSize(30).font(`asset/fonts/Sarabun-Regular.ttf`).moveDown(1)
       

        doc.end();
        await Customer.updateOne({_id:target},{...req.body,pathPDF:`/${req.body.PersNo}.pdf`});
        let logs = new Log({CustomerId:target,UserId:_id,Description:"แก้ไขข้อมูลลูกค้า", NameCustomer:`${req.body.Fname} ${req.body.Lname}`,NameUser:`${Fname} ${Lname}`})
        await logs.save();
        return res.status(203).send();
    }
    return res.status(403).send();
}
const ListOfAdmin = async(req,res)=>{
    const {Role,_id} = req.user
  
    if (Role === "admin") {
        const customers = await Customer.find({});
        return res.status(200).send(customers)
    }
    return res.status(403).send();
}
const Desriction = async(req,res)=>{
    const {Role} = req.user
    const target = req.params.targetID
    if (Role === "admin") {
        const customer = await Customer.findOne({_id:target});
        const user = await User.findOne({_id:customer.UserId})
        return res.status(200).send({customer,user})
    }
    return res.status(403).send();
}
module.exports = {
    CreateCustomer,
    ListCustomers,
    FetchCustomer,
    ChangeStatus,
    DeleteCustomer,
    UpdateCustomer,
    ListOfAdmin,
    Desriction
}