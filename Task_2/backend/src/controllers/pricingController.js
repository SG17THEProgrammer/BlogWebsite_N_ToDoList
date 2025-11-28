const User = require("../models/userSchema");
const Blogs = require("../models/blogSchema");
const {stripe}  = require("../utils/stripe")

const getAllPlans = async(req,res)=>{
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
        success_url: "http://localhost:5000/profile",
        cancel_url: "http://localhost:5000/error",
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


  const getPlan = async(req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({email});
        // console.log(user.stripeCustomerId);
      
        const subscriptions = await stripe.subscriptions.list(
          {
            customer: user?.stripeCustomerId,
            status: "all",
            expand: ["data.default_payment_method"],
          },
          {
            apiKey: process.env.STRIPE_SECRET_KEY,
          }
        );
        // console.log(subscriptions  ,  process.env.STRIPE_SECRET_KEY);
        if (!subscriptions.data.length) return res.json({plan:"Free" , article : await Blogs.find({ access: "Free" })});
        
        const plan = subscriptions.data[0].plan.nickname;
        
        // if (plan === "Free") {
        //   const articles = await Blogs.find({ access: "Free" });
        //   return res.json({plan:plan , article : articles});
        // }


         if (plan === "Basic") {
          const articles = await Blogs.find( {access: { $in: ["Basic", "Free"]}});

          return res.json({plan:plan , article : articles});

        } 
        
        else if (plan === "Standard") {
          const articles = await Blogs.find({
            access: { $in: ["Free","Basic", "Standard"] },
          });
          return res.json({plan:plan , article : articles});

        } 
        
        else {
          const articles = await Blogs.find({});
          return res.json({plan:plan , article : articles});
        }

    } catch (error) {
        console.log(error)
    }
  }
  
module.exports ={getAllPlans,createSession,getPlan}