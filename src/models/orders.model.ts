import mongoose, { Types } from "mongoose";
import mail from "../utils/mail";
import UserModel from "./user.model";

export interface Order
{
  grandTotal: number;
  orderItems:[
    {
      name: string;
      productId: Types.ObjectId;
      price: number;
      quantity: number;
    }
  ],
  createdBy: Types.ObjectId;
  updatedAt: string;
  status: "pending"| "completed"|"cancelled",
  _id?: Types.ObjectId;
}

const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    grandTotal: { type: Number, required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        productId: { type: Types.ObjectId, required: true, ref: 'Product' },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    createdBy: { type: Types.ObjectId, required: true, ref: 'User' },
    updatedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

OrdersSchema.post("save", async function (doc,next){
  // const user=doc;
  const user = await mongoose.model('User').findById(doc.createdBy);
  const username = user.username;
  const email = user.email;
  try{
    if(user&&email){
      console.log("Send email to",email);
      console.log("To username",username);
      console.log(doc);
      const content=await mail.render('mail-order.ejs',{
        customerName:username,  
        orderItems: doc.orderItems,
        grandTotal: doc.grandTotal,
        companyName: 'Hendra Co Ltd',
        year: '2024',
        contactEmail: 'hendrajr@zohomail.com'
      })
      console.log(content);
      const result = await mail.send({
        to:email,
        subject:"Create Order Success",
        content,
      });
      console.log("Result",result);
    }
  }
  catch(error){
    console.log(error);
  }

  next();
})

const OrdersModel = mongoose.model<Order>("Orders", OrdersSchema);

export default OrdersModel;
