import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

import { getServerSession } from 'next-auth/next';
import { Order } from "../../models/Order";
import { MenuItem } from "@/app/models/MenuItem";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    console.log(req.headers);
    const {cartProducts, address}= await req.json();
    const session= await getServerSession(authOptions);
    const userEmail= session?.user?.email;

    const orderDoc= await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false,
    });

    const stripeLineItems=[];
    for (const cartProduct of cartProducts){
        
        const productInfo= await MenuItem.findById(cartProduct._id);
        let productPrice= productInfo.basePrice;
        if(cartProduct.filling){
        const filling=productInfo.fillings.find(filling => filling._id.toString() === cartProduct.filling._id.toString());
        productPrice +=filling.price;
        }
        if(cartProduct.breadTypes?.length > 0) {
            for(const cartProductBreadType of cartProduct.breadTypes){
                const productBreads = productInfo.breadType;
                const breadTypeInfo=productBreads.find(breadType => 
                    breadType._id.toString() === cartProductBreadType._id.toString());
                    productPrice += breadTypeInfo.price;
            }
        }
        const productName= cartProduct.name;


        stripeLineItems.push({
            quantity:1,
            price_data:{
                currency: 'USD',
                product_data:{
                    name: productName,
                },
                unit_amount: productPrice *100,
            },
        });
    }


    const stripeSession=await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString()},
        payment_intent_data:{
            metadata:{orderId:orderDoc._id.toString()},
        },
        shipping_options:[
            {
                shipping_rate_data:{
                    display_name:'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount:{amount: 500, currency: 'USD'},
                },
            }
        ],
    });
    return Response.json(stripeSession.url);
}