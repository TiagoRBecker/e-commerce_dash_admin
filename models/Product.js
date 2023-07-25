import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
  name: {type:String, required:true},
  descript: String,
  brand: String,
  price: {type: Number, required: true},
  img: [{type:String}],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  properties: {type:Object},
},
 {
  timestamps: true,
});

export const Product = models?.Product || model('Product', ProductSchema);

