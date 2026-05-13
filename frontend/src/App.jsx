import axios from "axios";

function App() {

  const loadRazorpay = () => {
    return new Promise((resolve) => {

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: 500,
        }
      );

      const options = {
        key: "rzp_test_SomIQBSzy1moHw",
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

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handlePayment}
        style={{
          padding: "15px 30px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default App;