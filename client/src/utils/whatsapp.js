export const sendWhatsAppMessage = (cartItems, totalPrice) => {

  const phoneNumber = "916363120602"; // 👈 add country code

  let message = "🛒 New Chicken Order\n\n";

  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  message += `\n💰 Total: ₹${totalPrice}`;

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
};