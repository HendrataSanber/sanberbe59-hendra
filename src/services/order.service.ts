/**
 * src/services/order.service.ts
 */

import OrdersModel, { Order } from "../models/orders.model";
import ProductsModel from "../models/products.model";
import mongoose from 'mongoose';
import UserModel from "../models/user.model";
import { populate } from "dotenv";
import strict from "assert/strict";

export const create = async (payload: Order,userId:string): Promise<Order> => {
  payload.createdBy = new mongoose.Types.ObjectId(userId);

  const result = await OrdersModel.create(payload);
  for (const item of payload.orderItems) {
    const product = await ProductsModel.findById(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} tidak ditemukan`);
    }
    if (item.quantity > product.qty) {
      throw new Error(`TIdak ada stok ${item.name}`);
    }
    product.qty -= item.quantity;
    console.log(product);
    await product.save();
  }
  return result;
};
export const findAll = async (
  query: any,
  limit: number = 10,
  page: number = 1
  ): Promise<Order[]> => {
    const result =await OrdersModel.find(query)
    .limit(limit)
    .skip((page -1)* limit)
    .sort({createdAt:-1})
    .populate("createdBy","user");
    return result;
  };
export const findOne = async (id: string): Promise<Order | null> => {
  const result = await OrdersModel.findById({ createdBy:id });
  return result;
};
