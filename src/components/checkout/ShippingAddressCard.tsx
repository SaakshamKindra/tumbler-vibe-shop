
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

type Props = {
  formData: any;
  formErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const ShippingAddressCard: React.FC<Props> = ({
  formData, formErrors, handleChange, handleSelectChange, setFormData
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Shipping Address</CardTitle>
      <CardDescription>
        Enter the address where you want your order delivered.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={formErrors.firstName ? "border-red-500" : ""}
          />
          {formErrors.firstName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={formErrors.lastName ? "border-red-500" : ""}
          />
          {formErrors.lastName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="address1">Street Address</Label>
        <Input
          id="address1"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          className={formErrors.address1 ? "border-red-500" : ""}
        />
        {formErrors.address1 && (
          <p className="text-red-500 text-sm mt-1">{formErrors.address1}</p>
        )}
      </div>
      <div className="mt-4">
        <Label htmlFor="address2">Apartment, Suite, etc. (optional)</Label>
        <Input
          id="address2"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={formErrors.city ? "border-red-500" : ""}
          />
          {formErrors.city && (
            <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
          )}
        </div>
        <div>
          <Label htmlFor="state">State/Province</Label>
          <Select 
            value={formData.state} 
            onValueChange={(value) => handleSelectChange('state', value)}
          >
            <SelectTrigger id="state" className={formErrors.state ? "border-red-500" : ""}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formErrors.state && (
            <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
          )}
        </div>
        <div>
          <Label htmlFor="zipCode">PIN Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            maxLength={6}
            className={formErrors.zipCode ? "border-red-500" : ""}
          />
          {formErrors.zipCode && (
            <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value="India"
            disabled
            className="bg-gray-50"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder=""
            className={formErrors.phone ? "border-red-500" : ""}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Checkbox 
          id="saveAddress" 
          checked={formData.saveAddress} 
          onCheckedChange={(checked) => {
            setFormData((prev: any) => ({
              ...prev,
              saveAddress: checked === true
            }));
          }}
        />
        <Label htmlFor="saveAddress" className="text-sm">
          Save this address for future orders
        </Label>
      </div>
    </CardContent>
  </Card>
);

export default ShippingAddressCard;
