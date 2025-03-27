"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { clearProducts } from "@/store/features/productSlice";
import AddressForm, { AddressFormProps } from "@/components/cart/address-form";
import PaymentMethod from "@/components/cart/payment-method";

export default function CheckoutPage() {
  const [paymentControl, setPaymentControl] = React.useState(false);
  const [payemntSuccess, setPayemntSuccess] = React.useState<boolean | null>(null);
  const [addressError, setAddressError] = React.useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
    phone: 0,
    email: "",
  });
  const [address, setAddress] = React.useState<AddressFormProps | null>(null);
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    // Tarayıcı ortamını kontrol et
    if (typeof window !== "undefined") {
      const savedAddress = localStorage.getItem("address");

      if (savedAddress) {
        setAddress(JSON.parse(savedAddress));
      }
    }
  }, []);

  const handleAddressClear = () => {
    localStorage.removeItem("address");
    setAddress(null);
  };

  const handlePayment = () => {
    // Adres kontrolü
    if (
      !address ||
      !address.name ||
      !address.lastName ||
      !address.address ||
      !address.city ||
      !address.phone ||
      !address.email
    ) {
      setAddressError(true);
      setPaymentControl(true);
      setPayemntSuccess(null);

      return;
    }

    setAddressError(false);
    setPaymentControl(true);
    setPayemntSuccess(null);

    // Ödeme işlemi 7 saniye sürsün
    setTimeout(() => {
      // Başarılı olma olasılığını %95 yapıyorum
      const isSuccessful = Math.random() < 0.95;

      setPayemntSuccess(isSuccessful);
      localStorage.removeItem("cartState");
      dispatch(clearProducts());
    }, 7000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setAddress(formData as AddressFormProps);
    localStorage.setItem("address", JSON.stringify(formData));
  };

  const handleDeleteAddress = () => {
    localStorage.removeItem("address");
    setAddress(null);
  };

  const handleRetry = () => {
    setPaymentControl(false);
    setAddressError(false);
    setPayemntSuccess(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AddressForm
          address={address}
          errors={errors}
          formData={formData}
          setErrors={setErrors}
          onDeleteAddress={handleDeleteAddress}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <PaymentMethod
          addressError={addressError}
          paymentControl={paymentControl}
          paymentSuccess={payemntSuccess}
          onClearAddress={handleAddressClear}
          onPayment={handlePayment}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}
