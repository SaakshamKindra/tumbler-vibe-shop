
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const ContactInformationCard: React.FC<Props> = ({ email, onChange, error }) => (
  <Card>
    <CardHeader>
      <CardTitle>Contact Information</CardTitle>
      <CardDescription>
        We'll use this information to contact you about your order.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={onChange}
            className={error ? "border-red-500" : ""}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ContactInformationCard;
