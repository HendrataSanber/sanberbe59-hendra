/**
 * src/controllers/order.controller.ts
 */
import { Request, Response } from "express";

import {
  create,
  findAll,
  findOne,
} from "../services/order.service";
import { IPaginationQuery } from "../utils/interfaces";
import OrdersModel from "../models/orders.model";

const jwt = require('jsonwebtoken');

export default {
  async create(req: Request, res: Response) {
     /**
     #swagger.tags = ['Orders']
     #swagger.security = [{
      "bearerAuth": []
     }]
     #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/OrderCreateRequest"
      }
     }
     */
    console.log(req.body);
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (!token) return res.status(401).send('Access Denied');

      const verified = jwt.verify(token, process.env.SECRET);
      //console.log(verified);//=>iduser
      const result = await create(req.body,verified);
      res.status(201).json({
        data: result,
        message: "Success create order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create order",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    /**
     #swagger.tags = ['Orders']
     */
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;
      const query = {};
      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i" },
        }); 
      }
      const result = await findAll(query);
      const total = await OrdersModel.countDocuments(query);
      res.status(200).json({
        data: result,
        message: "Success get all orders",
        page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all orders",
      });
    }
  },
  
  async findOne(req: Request, res: Response) {
    /**
     #swagger.tags = ['Orders']
     */
    try {
      const result = await findOne(req.params?.id);

      res.status(200).json({
        data: result,
        message: "Success get one order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one order",
      });
    }
  },
};
