"use client";

import React from "react";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { FaUser } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaCity } from "react-icons/fa";

export interface AddressFormProps {
  name: string;
  lastName: string;
  address: string;
  district: string;
  city: string;
  phone: number;
  email: string;
}

interface AddressFormComponentProps {
  address: AddressFormProps | null;
  formData: AddressFormProps;
  errors: Record<string, any>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onDeleteAddress: () => void;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export default function AddressForm({
  address,
  errors,
  onInputChange,
  onSubmit,
  onDeleteAddress,
  setErrors,
}: AddressFormComponentProps) {
  const hasValidAddress =
    address &&
    address.name &&
    address.lastName &&
    address.address &&
    address.city &&
    address.phone &&
    address.email;

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-4">Adres Bilgileri</h1>
      {hasValidAddress ? (
        <div className="w-full">
          <div className="relative border-2 border-green-500 p-4 rounded mx-4">
            <span className="flex items-center gap-2">
              <FaUser className="text-green-500" size={20} />: {address.lastName}
            </span>
            <span className="flex items-center gap-2">
              <IoHomeOutline className="text-green-500" size={20} /> : {address.address}
            </span>
            <span className="flex items-center gap-2">
              <FaCity className="text-green-500" size={20} />: {address.district}
            </span>
            <span className="flex items-center gap-2">
              <IoPhonePortraitOutline className="text-green-500" size={20} />: {address.phone}
            </span>
            <span className="flex items-center gap-2">
              <CiMail className="text-green-500" size={20} />: {address.email}
            </span>
            <div className="absolute top-[-10px] right-[-10px]">
              <span>✅</span>
            </div>
            <div className="mt-4">
              <button
                className="bg-red-500 text-sm text-white px-2 py-1 rounded"
                onClick={onDeleteAddress}
              >
                Adres Sil
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)] border-gray-300 dark:border-gray-400">
          <Form className="w-full justify-center items-center space-y-4" validationErrors={errors}>
            <div className="flex flex-col gap-4 max-w-md">
              <div className="w-full flex flex-row gap-4">
                <Input
                  isRequired
                  className="border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Ad giriniz";
                    }
                  }}
                  label="Ad"
                  labelPlacement="outside"
                  name="name"
                  placeholder="Ad giriniz"
                  onChange={onInputChange}
                />
                <Input
                  isRequired
                  className="border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Soyad giriniz";
                    }
                  }}
                  label="Soyad"
                  labelPlacement="outside"
                  name="lastName"
                  placeholder="Soyad giriniz"
                  onChange={onInputChange}
                />
              </div>
              <Input
                isRequired
                className="border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Email giriniz";
                  }
                  if (validationDetails.typeMismatch) {
                    return "Lütfen geçerli bir email adresi giriniz";
                  }
                }}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Email giriniz"
                type="email"
                onChange={onInputChange}
              />

              <Textarea
                isRequired
                className="w-full border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Açık Adres giriniz";
                  }
                }}
                label="Açık Adres"
                name="address"
                placeholder="Açık Adres (e.g. Bina, Daire, Bina No, Daire No)"
                onChange={onInputChange}
              />
              <div className="flex flex-row gap-4 mb-2">
                <Input
                  isRequired
                  className="w-full border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "Şehir giriniz";
                    }
                  }}
                  label="Şehir"
                  labelPlacement="outside"
                  name="city"
                  placeholder="Şehir giriniz"
                  onChange={onInputChange}
                />
                <Input
                  isRequired
                  className="w-full border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                  errorMessage={({ validationDetails }) => {
                    if (validationDetails.valueMissing) {
                      return "İlçe giriniz";
                    }
                  }}
                  label="İlçe"
                  labelPlacement="outside"
                  name="district"
                  placeholder="İlçe giriniz"
                  onChange={onInputChange}
                />
              </div>
              <Input
                isRequired
                className="w-full border-1 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-400 rounded-xl"
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Telefon giriniz";
                  }
                  if (validationDetails.patternMismatch) {
                    return "Geçerli bir telefon numarası giriniz";
                  }
                }}
                label="Telefon"
                labelPlacement="outside"
                name="phone"
                placeholder="Telefon numaranızı giriniz"
                onChange={onInputChange}
              />

              <Checkbox
                isRequired
                classNames={{
                  label: "text-small",
                }}
                color="success"
                name="terms"
                validationBehavior="aria"
                value="true"
                onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
              >
                Gerekli şartları kabul ederim.
              </Checkbox>

              <div className="flex justify-center">
                <Button
                  className="text-white font-bold w-full"
                  color="success"
                  size="sm"
                  onPress={onSubmit}
                >
                  Adresi Kaydet
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
