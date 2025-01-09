import AppError from "../utils/error.util.js"
import {razorpay} from '../server.js'
import crypto from 'crypto'
import Payment from '../models/payment.model.js'
import User from "../models/user.model.js"

export const getRazorPayApiKey = async(req, res, next)=>{
   try {
    res.status(200).json({
      success:true,
      message:'Razorpay Api key',
      key:process.env.RAZORPAY_KEY_ID
  })
   } catch (error) {
    return next(new AppError(error.message, 500))
   }

}

export const buySubscription = async(req, res, next)=>{
  
      try {
        const  {id} = req.user
      const user = await User.findById(id)
      console.log("subscription user", user);
      
      if(!user){
        return next(
           new AppError('Unauthorized, please login', 500)
        )
      }

      if(user.role === 'ADMIN'){
       return next( new AppError('ADMIN cannot purchase a subscription', 400))
      }

      const subscription = await razorpay.subscriptions.create({
        plan_id:process.env.RAZORPAY_PLAN_ID,
        customer_notify: 1,
        total_count: 12,
      })
      console.log("RAZORPAY_PLAN_ID:", process.env.RAZORPAY_PLAN_ID);
      
      user.subscription.id = subscription.id
      user.subscription.status = subscription.status

      await user.save()
      res.status(200).json({
        success:true,
        message:'Subscribed successfully',
        subscription_id:subscription.id
      })
      } catch (error) {
        console.error('Razorpay Subscription Creation Error:', error);
        return next(new AppError(error.message, 500))
      }
}

export const verifySubscription = async(req, res, next)=>{
   try {
    const {id} = req.user
    const {razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body

    const user = await User.findById(id)
    if(!user){
        return next(
           new AppError('Unauthorized, please login', 500)
        )
      }
      const subscriptionId = user.subscription.id
      const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex')
   if(generatedSignature !== razorpay_signature){
    return next( new AppError('Payment not verified, please try again', 400))
   }

   await Payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id

   })
   user.subscription.status = 'active'
   await user.save()

   res.status(200).json({
    success:true,
    message:'Payment verified  successfully'

   })
   } catch (error) {
    return next(new AppError(error.message, 500))
   }
}

export const cancelSubscription = async(req, res, next)=>{
  try {
    const  {id} = req.user
  const user = await User.findById(id)
  if(!user){
    return next(
       new AppError('Unauthorized, please login', 500)
    )
  }

  if(user.role === 'ADMIN'){
   return next( new AppError('ADMIN cannot purchase a subscription', 400))
  }
  const subscriptionId = user.subscription.id

  const subscription = await razorpay.subscriptions.cancel(subscriptionId)
  user.subscription.status = subscription.status
  await user.save()
  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}

export const allPayment= async(req, res, next)=>{
   try {
    const {count} = req.query
    const subscriptions = await razorpay.subscriptions.all({
      count:count || 10,
    })
    res.status(200).json({
      success:true,
      message:"All payments",
      subscriptions
    })
   } catch (error) {
    return next(new AppError(error.message, 500))
   }
}