import React from "react";

const paymentLogos = [
    { src: "/payment/visa.webp", alt: "Visa" },
    { src: "/payment/maestro.webp", alt: "MasterCard" },
    { src: "/payment/paypal.webp", alt: "PayPal" },
    { src: "/payment/pay.webp", alt: "Apple Pay" },
    { src: "/payment/JCB.webp", alt: "JCB" },
    { src: "/payment/cash.png", alt: "cash" },
  ];
function PaymentMethods() {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h6 className="text-sm font-semibold text-gray-600 uppercase">We Accept</h6>
      <div className="flex flex-wrap gap-2">
        {paymentLogos.map((logo, index) => (
          <img key={index} src={logo.src} alt={logo.alt} className="h-8" />
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
