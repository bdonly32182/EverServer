const passport = require('passport')
const upload = require('../Middlewares/UploadPdf');
module.exports=(app)=>{
    const auth = passport.authenticate('jwt',{session:false});
    const customer = require('../Controllers/Customer.Controller');
    app.post('/api/create/customer',auth,upload.single('file'),customer.CreateCustomer);
    app.get('/api/list/customer',auth,customer.ListCustomers);
    app.get('/api/customer/:id',auth,customer.FetchCustomer);
    app.delete('/api/customer/:id',auth,customer.DeleteCustomer);
    app.put('/api/update/customer/:updateID',auth,customer.UpdateCustomer);
    // for admin
    app.put('/api/customer/:id',auth,customer.ChangeStatus);
    app.get('/api/admin/customer',auth,customer.ListOfAdmin);
    app.get('/api/admin/customers/:targetID',auth,customer.Desriction);
}