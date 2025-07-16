import React, { useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import FormComp from "@/components/FormComp";
import { checkoutSchema, fields, initialValues } from "./components/data";
import { OrderSummaryCard } from "./components/OrderSummeryCard";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PaystackPop from "@paystack/inline-js";
import { createOrder, payOrder, verifyPayment } from "../../store/orderSlice";
import { clearCart } from "@/store/cartSlice";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [billingDetails, setBillingDetails] = useState(initialValues);
  const [isProcessing, setIsProcessing] = useState(false);

  const sub_total = useSelector((state) => state.cart.totalAmount);
  const shippingFees = sub_total * 0.05;
  const tax = sub_total * 0.1;
  const total = sub_total + shippingFees + tax;

  const headers = {
    title: "Checkout",
    currentPage: "checkout",
    description: "",
  };

  // Step 1: Handle form submit - create order and start payment
  const handleFormSubmit = async (formData) => {
    setBillingDetails(formData);
    setIsProcessing(true);

    try {
      console.log("CArt",cart)
      // 1. Create order (unpaid)
     const orderPayload = {
  orderItems: cart.map((item) => ({
    product: item._id,
    qty: item.quantity, 
    ...item,
    
    // ✅ rename to match backend expectation
  })),
  shippingAddress: formData,
  paymentMethod: "paystack",
};


      const createdOrder = await dispatch(createOrder(orderPayload)).unwrap();


      // 2. Initialize Paystack payment on backend to get reference
      const payPayload = {
        order: createdOrder._id,
        callback_url: `${window.location.origin}/payment-success`, // your frontend success page
      };

      const payInit = await dispatch(payOrder(payPayload)).unwrap();

      if (!payInit || !payInit.transaction || !payInit.transaction.data) {
        throw new Error("Failed to initialize payment");
      }

      const paystackReference = payInit.transaction.data.reference;

      // 3. Start Paystack inline payment with the backend reference
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_xxx",
        email: user.email,
        amount: Math.round(total * 100), // in kobo
        currency: "ZAR",
        reference: paystackReference,
        metadata: {
          orderId: createdOrder._id,
          billingDetails: formData,
          cart,
        },
        onSuccess: async (transaction) => {
          toast.success("Payment successful!");

          try {
            // 4. Verify payment with backend
            const verifyRes = await dispatch(verifyPayment(transaction.reference)).unwrap();

            if (!verifyRes || verifyRes.status !== "success") {
              throw new Error("Payment verification failed");
            }

            toast.success("Order payment verified and completed!");
            // After Sucessful payment and Verification ,clear cart
            dispatch(clearCart())
            navigate("/orders")

            


          } catch (err) {
            toast.error("Payment succeeded but verification failed.");
            console.error(err);
          } finally {
            setIsProcessing(false);
          }
        },
        onCancel: () => {
          toast.info("Payment popup closed.");
          setIsProcessing(false);
        },
        onError: (error) => {
          toast.error("Payment failed: " + error.message);
          setIsProcessing(false);
        },
      });
    } catch (error) {
      toast.error("Checkout failed: " + error.message);
      setIsProcessing(false);
    }
  };

  // Trigger form submission from external button
  const handlePlaceOrderClick = () => {
    if (formRef.current && formRef.current.submitForm) {
      formRef.current.submitForm();
    } else {
      toast.error("Form is not ready.");
    }
  };

 return (
  <div>
    <PageHeader header={headers} />

    <div className="flex flex-col md:flex-row gap-12 mt-10 px-4 md:px-10 lg:px-20">
      
      {/* Billing Section */}
      <div className="w-full md:w-1/2">
        <h6 className="mb-4  text-md md:text-lg font-semibold">Billing Details</h6>
        <div className="bg-[#F9FBFC] p-6 md:p-10 rounded-md shadow-sm">
          <FormComp
            ref={formRef}
            schema={checkoutSchema}
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            hideButton={true}
          />
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-full md:w-1/2">
        <h6 className="mb-4 text-lg font-semibold">Products</h6>
        <div className="bg-[#F9FBFC] p-6 md:p-10 rounded-md shadow-sm">
          {cart.map((item) => (
            <OrderSummaryCard key={item._id} orderItem={item} />
          ))}

          <div className="pt-6 border-t mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Shipping fees</span>
              <span className="font-medium">ETB {shippingFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-medium">ETB {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t text-lg font-bold">
              <span>Total</span>
              <span>ETB {total.toFixed(2)}</span>
            </div>

            <div className="pt-6">
              <Button
                onClick={handlePlaceOrderClick}
                disabled={isProcessing}
                className="w-full h-12 bg-blue-primary disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Place Order & Pay"}
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);

};

export default Checkout;
