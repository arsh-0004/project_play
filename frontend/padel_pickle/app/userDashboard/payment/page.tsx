"use client";

export default function PayButton() {

  const handlePayment = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 500,
        productName: "Test Product",
      }),
    });

    const data = await res.json();

    if (data.success && data.url) {
      window.location.href = data.url;
    } else {
      alert(data.message || "Payment failed");
    }
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
}