import React, { useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import FormComp from "@/components/FormComp";
import { checkoutSchema, fields, initialValues } from "./components/data";
import { OrderSummaryCard } from "./components/OrderSummeryCard";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PaystackPop from "@paystack/inline-js"; // ✅ Correct import

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const formRef = useRef(null);

  const [billingDetails, setBillingDetails] = useState(initialValues);
  const [isProcessing, setIsProcessing] = useState(false);

  const sub_total = useSelector((state) => state.cart.totalAmount);
  const shippingFees = sub_total * 0.05;
  const tax = sub_total * 0.1;
  const total = sub_total + shippingFees + tax;
const email=user?.email;
  const headers = {
    title: "Checkout",
    currentPage: "checkout",
    description: "",
  };

  const handleFormSubmit = (formData) => {
    setBillingDetails(formData);
    startPaystackPayment(formData);
  };

  const startPaystackPayment = (billingData) => {
   

    setIsProcessing(true);

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_xxx",
      email: user.email,
      amount: Math.round(total * 100), // Convert to kobo
      currency: "ZAR", // Must be supported (NGN, GHS, USD, etc.)
      reference: `LIYU_${Date.now()}`,
      metadata: {
        cart,
        billingDetails: billingData,
      },
      onSuccess: (transaction) => {
        toast.success("Payment successful!");

        // Save order to backend
        const orderData = {
          reference: transaction.reference,
          user: user?.email || billingData.email,
          items: cart,
          billingDetails: billingData,
          subtotal: sub_total,
          shippingFees,
          tax,
          total,
          paymentMethod: "paystack",
          paymentStatus: "completed",
          status: "paid",
          createdAt: new Date().toISOString(),
        };

        fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to save order");
            return res.json();
          })
          .then(() => toast.success("Order placed successfully!"))
          .catch(() => toast.error("Payment succeeded but order failed."))
          .finally(() => setIsProcessing(false));
      },
      onCancel: () => {
        toast.info("Payment popup was closed.");
        setIsProcessing(false);
      },
      onError: (error) => {
        console.error("Payment error:", error.message);
        toast.error("Payment failed: " + error.message);
        setIsProcessing(false);
      },
    });
  };

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
      <div className="flex gap-12 md:mt-[40px] px-[39px]">
        <div className="w-full md:w-[782px]">
          <h6 className="mb-8">Billing Details</h6>
          <div className="bg-[#F9FBFC] px-[59px] pt-[61px] pb-[85px]">
            <FormComp
              ref={formRef}
              schema={checkoutSchema}
              fields={fields}
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
              hideButton={true} // 🔁 Hide Submit button, trigger via Place Order
            />
          </div>
        </div>

        <div className="w-1/2">
          <h6 className="pb-8">Products</h6>
          <div className="bg-[#F9FBFC] pt-12 px-12">
            {cart.map((item) => (
              <OrderSummaryCard key={item._id} orderItem={item} />
            ))}

            <div className="p-4 border-t mt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Shipping fees</span>
                <span className="font-medium">ETB {shippingFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
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
