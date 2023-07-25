import mongoose from 'mongoose';
const OrderSchema = mongoose.Schema({
    items:{type:Object},
    name:String,
    email:String,
    adress:String,
    city:String,
    numberAdress:String,
    phone:String,
    paid:Boolean
   
    
},
 {
  timestamps: true,
});

export default mongoose.models?.Order || mongoose.model('Order', OrderSchema);