import axios from "axios";

const button = document.createElement("button");
button.innerText = "Pay Now";
button.style.padding = "12px 20px";
button.style.fontSize = "18px";
button.style.cursor = "pointer";

document.body.appendChild(button);

button.onclick = async () => {
  try {

    // Create order from backend
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: 500,
      }
    );

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.amount,
      currency: data.currency,
      name: "E-Shelf",
      description: "Book Purchase",
      order_id: data.id,

      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {
    console.log(error);
    alert("Payment Failed");
  }
};