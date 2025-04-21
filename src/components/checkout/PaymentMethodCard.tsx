
import React from "react";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone } from 'lucide-react';

type Props = {
  formData: any;
  formErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  generatePaymentQR: () => string;
};

const PaymentMethodCard: React.FC<Props> = ({
  formData, formErrors, handleChange, handleSelectChange, generatePaymentQR
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Payment Method</CardTitle>
      <CardDescription>
        All transactions are secure and encrypted.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs 
        defaultValue="credit-card" 
        value={formData.paymentMethod}
        onValueChange={(value) => handleSelectChange('paymentMethod', value)}
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="credit-card" className="flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" />
            Credit Card
          </TabsTrigger>
          <TabsTrigger value="upi" className="flex items-center justify-center gap-2">
            <Smartphone className="h-4 w-4" />
            UPI
          </TabsTrigger>
        </TabsList>
        <TabsContent value="credit-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="John Doe"
                className={formErrors.cardName ? "border-red-500" : ""}
              />
              {formErrors.cardName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className={formErrors.cardNumber ? "border-red-500" : ""}
              />
              {formErrors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardExpiry">Expiration Date</Label>
                <Input
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={formErrors.cardExpiry ? "border-red-500" : ""}
                />
                {formErrors.cardExpiry && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cardExpiry}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cardCvc">Security Code</Label>
                <Input
                  id="cardCvc"
                  name="cardCvc"
                  value={formData.cardCvc}
                  onChange={handleChange}
                  placeholder="CVC"
                  className={formErrors.cardCvc ? "border-red-500" : ""}
                />
                {formErrors.cardCvc && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cardCvc}</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="upi">
          <div className="text-center py-4">
            <p className="mb-4">
              Scan this QR for the payment
            </p>
            <div className="bg-white p-4 rounded-lg mx-auto max-w-[200px]">
              <img 
                src={generatePaymentQR()}
                alt="UPI QR Code" 
                className="mx-auto w-full" 
              />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              UPI ID: 7417862@ibl
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export default PaymentMethodCard;
