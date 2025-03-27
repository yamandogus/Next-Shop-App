"use client";

import React, { useState, ChangeEvent, FocusEvent } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";

interface PaymentMethodProps {
  paymentControl: boolean;
  paymentSuccess: boolean | null;
  addressError: boolean;
  onPayment: () => void;
  onRetry: () => void;
  onClearAddress: () => void;
}

export default function PaymentMethod({
  paymentControl,
  paymentSuccess,
  addressError,
  onPayment,
  onRetry,
  onClearAddress,
}: PaymentMethodProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(value);
  };

  return (
    <div className="border-t md:border-t-0 pt-10 md:pt-0 mt-10 md:mt-0">
      <h2 className="text-center text-2xl font-bold mb-4">Ödeme Seçenekleri</h2>
      <div>
        <div className="flex flex-col gap-4">
          <Tabs aria-label="Tabs colors" color={"success"} radius="full">
            <Tab key="credit-card" title="Kredi Kartı">
              <h4 className="text-lg font-bold mb-2">Ödeme Şekli Kredi Kartı Ödemeli</h4>
              {!paymentControl ? (
                <Form className="w-full" onSubmit={onPayment}>
                  <div className="flex flex-col justify-center items-center gap-4">
                    {addressError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full mb-4">
                        <p className="font-bold">Hata!</p>
                        <p>Lütfen önce adres bilgilerinizi ekleyin.</p>
                      </div>
                    )}
                    <Card className="w-full md:w-5/6 bg-gray-50 dark:bg-gray-900">
                      <CardBody className="p-4 gap-6">
                        <Input
                          isRequired
                          inputMode="numeric"
                          labelPlacement="outside"
                          maxLength={19}
                          name="card"
                          placeholder="Kart numarası"
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                        />
                        <div className="flex flex-row gap-4">
                          <Input
                            isRequired
                            labelPlacement="outside"
                            name="name"
                            placeholder="Kart sahibi adı"
                            type="text"
                            pattern="[A-Za-zğüşıöçĞÜŞİÖÇ\s]+"
                          />
                          <Input
                            isRequired
                            labelPlacement="outside"
                            name="surname"
                            placeholder="Kart sahibi soyadı"
                            type="text"
                            pattern="[A-Za-zğüşıöçĞÜŞİÖÇ\s]+"
                          />
                        </div>
                        <div className="flex flex-row gap-4">
                          <Input
                            isRequired
                            labelPlacement="outside"
                            name="date"
                            placeholder="Son kullanma tarihi (AA/YY)"
                            type="text"
                            maxLength={5}
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                          />
                          <Input
                            required
                            inputMode="numeric"
                            maxLength={3}
                            name="cvc"
                            placeholder="CVC"
                            type="text"
                            value={cvc}
                            onChange={handleCvcChange}
                          />
                        </div>
                      </CardBody>
                    </Card>

                    <div className="flex justify-center mt-4 w-full">
                      <Button
                        className="text-white font-bold w-full md:w-1/2"
                        color="success"
                        size="sm"
                        type="submit"
                      >
                        Seçilen Ödeme Şeklini Onayla
                      </Button>
                    </div>
                  </div>
                </Form>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  {addressError && (
                    <>
                      <iframe
                        title="Adres Hatası Animasyonu"
                        height={200}
                        width={200}
                        src="https://lottie.host/embed/18aeb844-0759-49d5-97b9-4380cdf39aea/XHjGFluLRG.lottie"
                      ></iframe>
                      <p className="text-gray-600 dark:text-gray-300 my-4">
                        Adres bilgileriniz eksik. Lütfen önce adres bilgilerinizi ekleyin.
                      </p>
                      <Button
                        className="text-white font-bold w-full md:w-1/2"
                        color="success"
                        size="sm"
                        onPress={onRetry}
                      >
                        Tekrar Deneyin
                      </Button>
                    </>
                  )}

                  {!addressError && paymentSuccess === null && (
                    <>
                      <iframe
                        title="Ödeme İşlemi Animasyonu"
                        height={200}
                        width={200}
                        src="https://lottie.host/embed/cc2e55e4-6b7c-4145-a7f4-6f0b50ae2138/CX07qgFKCn.lottie"
                      ></iframe>
                      <p className="text-gray-600 dark:text-gray-300 my-4">
                        Ödeme işleminiz gerçekleştiriliyor...
                      </p>
                    </>
                  )}

                  {!addressError && paymentSuccess === false && (
                    <>
                      <iframe
                        title="Ödeme Başarısız Animasyonu"
                        height={200}
                        width={200}
                        src="https://lottie.host/embed/18aeb844-0759-49d5-97b9-4380cdf39aea/XHjGFluLRG.lottie"
                      ></iframe>
                      <p className="text-gray-600 dark:text-gray-300 my-4">
                        Ödeme işleminiz başarısız oldu.
                      </p>
                      <Button
                        className="text-white font-bold w-full md:w-1/2"
                        color="success"
                        size="sm"
                        onPress={onRetry}
                      >
                        Tekrar Deneyin
                      </Button>
                    </>
                  )}

                  {!addressError && paymentSuccess === true && (
                    <>
                      <iframe
                        title="Ödeme Başarılı Animasyonu"
                        height={200}
                        width={200}
                        src="https://lottie.host/embed/6b0b00db-8ae6-45e3-993a-52aad9f1d68e/5M1MexEXOy.lottie"
                      />
                      <p className="text-gray-600 dark:text-gray-300 my-4">
                        Ödemeniz başarıyla tamamlandı.
                      </p>
                      <Button
                        as={Link}
                        className="text-white font-bold w-full md:w-1/2"
                        color="success"
                        href="/"
                        size="sm"
                        onPress={() => {
                          setTimeout(() => {
                            onClearAddress();
                          }, 3000);
                        }}
                      >
                        Ana Sayfaya Dön
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Tab>
            <Tab key="cash" title="Kapıda Nakit">
              <div>
                <h4 className="text-lg font-bold mb-2">Ödeme Şekli Nakit Ödemeli</h4>
                {!paymentControl ? (
                  <>
                    <p className="text-gray-600 dark:text-gray-300 my-4">
                      - Kapıda nakit ödeme, siparişinizi teslim alırken ödemenizi nakit olarak
                      yapmanızı sağlar.
                      <br />
                      - Lütfen sipariş tutarını eksiksiz ve mümkünse tam para ile hazırlayınız.
                      <br />
                      - Kargo görevlisinin yanında paketinizi kontrol ederek teslim alınız. Hasarlı
                      veya eksik ürünler için teslim tutanağı tutturmayı unutmayınız.
                      <br />
                      - Kapıda ödeme seçeneği bazı bölgelerde veya belirli ürünler için geçerli
                      olmayabilir. Lütfen sipariş verirken kontrol ediniz.
                      <br />- Ürün iade ve değişim işlemlerinde, kargo firmasının belirlediği
                      kurallar geçerli olacaktır.
                    </p>

                    <div className="flex justify-center mt-4 w-full">
                      <Button color="success" size="sm" className="w-3/6" onPress={onPayment}>
                        Siparişi Onayla
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center p-4">
                    {addressError && (
                      <>
                        <p className="text-red-500 font-bold mb-2">Hata!</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Adres bilgileriniz eksik. Lütfen önce adres bilgilerinizi ekleyin.
                        </p>
                        <Button
                          className="text-white font-bold w-full md:w-1/2"
                          color="success"
                          size="sm"
                          onClick={onRetry}
                        >
                          Tekrar Deneyin
                        </Button>
                      </>
                    )}

                    {!addressError && paymentSuccess === null && (
                      <p className="text-gray-600 dark:text-gray-300 my-4 text-center">
                        Siparişiniz alınıyor, lütfen bekleyin...
                      </p>
                    )}

                    {!addressError && paymentSuccess === false && (
                      <>
                        <p className="text-red-500 font-bold mb-2">Hata!</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Siparişiniz alınamadı. Lütfen tekrar deneyin.
                        </p>
                        <Button
                          className="text-white font-bold w-full md:w-1/2"
                          color="success"
                          size="sm"
                          onPress={onRetry}
                        >
                          Tekrar Deneyin
                        </Button>
                      </>
                    )}

                    {!addressError && paymentSuccess === true && (
                      <>
                        <p className="text-green-500 font-bold mb-2">Başarılı!</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Siparişiniz başarıyla alındı. Teşekkür ederiz!
                        </p>
                        <Button
                          as={Link}
                          className="text-white font-bold w-full md:w-1/2"
                          color="success"
                          href="/"
                          size="sm"
                          onClick={onClearAddress}
                        >
                          Ana Sayfaya Dön
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Tab>
            <Tab key="bank-transfer" title="Kapıda Kredi Kartı">
              <div>
                <h4 className="text-lg font-bold mb-2">Ödeme Şekli Kapıda Kredi Kartı Ödemeli</h4>
                {!paymentControl ? (
                  <>
                    <p className="text-gray-600 dark:text-gray-300 my-4">
                      - Kapıda kredi kartı ile ödeme, siparişinizi teslim alırken kredi veya banka
                      kartınızla ödeme yapmanızı sağlar.
                      <br />
                      - Kargo görevlisinin yanında pos cihazının çalıştığını ve ödemenizin başarıyla
                      gerçekleştiğini kontrol ediniz.
                      <br />
                      - Kapıda ödeme bazı bölgelerde ve belirli sipariş tutarları için geçerli
                      olmayabilir. Sipariş verirken bu bilgiyi kontrol ediniz.
                      <br />- Ürün değişim ve iade işlemleriniz, ödeme yaptığınız kart üzerinden
                      gerçekleştirilecektir.
                    </p>
                    <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                      Geçerli Kredi Kartları
                    </span>
                    <ul className="list-disc list-inside mb-4">
                      <li key={1} className="text-gray-600 dark:text-gray-300">
                        MasterCard
                      </li>
                      <li key={2} className="text-gray-600 dark:text-gray-300">
                        Visa
                      </li>
                      <li key={3} className="text-gray-600 dark:text-gray-300">
                        American Express (Amex)
                      </li>
                    </ul>

                    <div className="flex justify-center mt-4 w-full">
                      <Button color="success" size="sm" className="w-3/6" onClick={onPayment}>
                        Siparişi Onayla
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center p-4">
                    {addressError && (
                      <>
                        <p className="text-red-500 font-bold mb-2">Hata!</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Adres bilgileriniz eksik. Lütfen önce adres bilgilerinizi ekleyin.
                        </p>
                        <Button
                          className="text-white font-bold w-full md:w-1/2"
                          color="success"
                          size="sm"
                          onClick={onRetry}
                        >
                          Tekrar Deneyin
                        </Button>
                      </>
                    )}

                    {!addressError && paymentSuccess === null && (
                      <p className="text-gray-600 dark:text-gray-300 my-4 text-center">
                        Siparişiniz alınıyor, lütfen bekleyin...
                      </p>
                    )}

                    {!addressError && paymentSuccess === false && (
                      <>
                        <p className="text-red-500 font-bold mb-2">Hata!</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Siparişiniz alınamadı. Lütfen tekrar deneyin.
                        </p>
                        <Button
                          className="text-white font-bold w-full md:w-1/2"
                          color="success"
                          size="sm"
                          onClick={onRetry}
                        >
                          Tekrar Deneyin
                        </Button>
                      </>
                    )}

                    {!addressError && paymentSuccess === true && (
                      <>
                        <p className="text-green-500 font-bold mb-2">Başarılı!</p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          Siparişiniz başarıyla alındı. Teşekkür ederiz!
                        </p>
                        <Button
                          as={Link}
                          className="text-white font-bold w-full md:w-1/2"
                          color="success"
                          href="/"
                          size="sm"
                          onClick={onClearAddress}
                        >
                          Ana Sayfaya Dön
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
