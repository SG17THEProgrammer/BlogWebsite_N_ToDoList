const User = require("../models/userSchema");
const {stripe}  = require("../utils/stripe")

const getPlans = async(req,res)=>{
    try {
        const prices = await stripe.prices.list({
            apiKey: process.env.STRIPE_SECRET_KEY,
          });
        
          return res.json(prices);
    } catch (error) {
        console.log(error)
    }
}

const createSession = async (req, res) => {
    try {
      const email = req.body.email;
      const priceId = req.body.priceId;
      const user = await User.findOne({ email });
  
      if (!user || !user.stripeCustomerId) {
        return res.status(400).json({ error: 'User or Stripe customer ID not found' });
      }
  
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: "http://localhost:3000/articles",
        cancel_url: "http://localhost:3000/article-plans",
        customer: user.stripeCustomerId,
        // customer_email: email,  
  
        // Enable shipping address collection
        shipping_address_collection: {
          allowed_countries: ['IN'], // Restrict to India
        },
        // Optional: You can use this for displaying default shipping information, but let Stripe handle the address collection
        // shipping: {
        //   name: 'Customer Name',
        //   address: {
        //     line1: 'Street Address',
        //     city: 'City',
        //     state: 'State',
        //     postal_code: 'Postal Code',
        //     country: 'IN',  // India Country Code
        //   },
        // },
      });
  
  
      return res.json(session);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports ={getPlans,createSession}