// src/app/api/orders.js
import authOptions from "@/config/authOptions";
import { isAdmin } from "@/utils/authUtils";
import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    // Ensure MongoDB connection is established
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Get session and user information
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    // Parse the request URL
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    if (_id) {
      const order = await Order.findById(_id);
      if (order) {
        return new Response(JSON.stringify(order), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        return new Response("Order not found", { status: 404 });
      }
    }

    // Return all orders if user is admin
    if (admin) {
      const orders = await Order.find();
      return new Response(JSON.stringify(orders), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Return user-specific orders
    if (userEmail) {
      const userOrders = await Order.find({ userEmail });
      return new Response(JSON.stringify(userOrders), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Handle cases where user is not authorized
    return new Response("Unauthorized", { status: 401 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
