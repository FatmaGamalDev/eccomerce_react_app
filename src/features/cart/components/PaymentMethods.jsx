import React from "react";

import visa from '../../../Assets/payment/visa.webp';
import maestro from '../../../Assets/payment/maestro.webp';
import paypal from '../../../Assets/payment/paypal.webp';
import pay from '../../../Assets/payment/pay.webp';
import jcb from '../../../Assets/payment/JCB.webp';
import cash from '../../../Assets/payment/cash.png';

const paymentLogos = [
  { src: visa, alt: "Visa" },
  { src: maestro, alt: "MasterCard" },
  { src: paypal, alt: "PayPal" },
  { src: pay, alt: "Apple Pay" },
  { src: jcb, alt: "JCB" },
  { src: cash, alt: "cash" },
];
function PaymentMethods() {
  return (
    <div className="flex flex-col items-center gap-2 mt-4 ">
      <h6 className="text-sm font-semibold text-gray-600 uppercase">
        We Accept
      </h6>
      <div className="flex flex-wrap gap-2">
        {paymentLogos.map((logo, index) => (
          <img key={index} src={logo.src} alt={logo.alt} className="h-8" />
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
