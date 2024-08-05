import { authOptions} from "@/app/api/auth/[...nextauth]/route";
import { isAdmin } from "@/utils/authHelpers";
import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URL);

    // Get the session
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    // Parse URL parameters
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
      }
      return new Response(JSON.stringify(order), { status: 200 });
    }

    if (admin) {
      const orders = await Order.find();
      return new Response(JSON.stringify(orders), { status: 200 });
    }

    if (userEmail) {
      const orders = await Order.find({ userEmail });
      return new Response(JSON.stringify(orders), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
