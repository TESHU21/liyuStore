import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function OrderSummaryCard({
  orderItem,
  shippingFees,
  tax,
  total,
  onPlaceOrder,
  selectedPaymentMethod,
  onPaymentMethodChange,
}) {
  return (
    <div className="w-full ">
      {/* Header */}
      <div className=" flex items-center py-4 justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={orderItem.imageUrl}
              alt={orderItem.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {orderItem.quantity}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{orderItem.name}</h3>
            <p className="text-sm text-gray-500">Brand: {orderItem.brand}</p>
            <p className="text-sm text-gray-500">${orderItem.price.toFixed(2)}</p>
          </div>
        </div>
        <span className="text-lg font-semibold">
          ${(orderItem.price * orderItem.quantity).toFixed(2)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 border-t mt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Shipping</span>
          <span className="font-medium">${shippingFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Shipping fees</span>
          <span className="font-medium">${shippingFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Tax:</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-4 border-t text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Payment method */}
        <div className="pt-4">
          <h3 className="text-md font-semibold mb-2">Select Method</h3>
          <RadioGroup
            defaultValue={selectedPaymentMethod}
            onValueChange={onPaymentMethodChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal-credit-card" id="r1" />
              <Label htmlFor="r1">Paypal or credit card</Label>
            </div>
            {/* Additional payment methods can go here */}
          </RadioGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button onClick={onPlaceOrder} className="w-full h-12 bg-blue-primary ">
          Place order
        </Button>
      </div>
    </div>
  );
}
