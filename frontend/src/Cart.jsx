import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

 const getCart = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/cart");
    setCart(res.data);

    // calculate total after fetching
    calculateTotal(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const removeItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/cart/remove/${id}`);
    getCart(); // refresh cart
  } catch (err) {
    console.log(err);
  }
};
const calculateTotal = (items) => {
  const sum = items.reduce((acc, item) => acc + item.price, 0);
  setTotal(sum);
};
const handlePayment = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: total,
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
        alert("Payment Successful 🎉");
         console.log(response);

        navigate("/success");
       
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Payment Failed ❌");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 My Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <img
            src={item.image}
            style={{ width: "100px" }}
          />

          <h3>{item.title}</h3>
          <p>₹ {item.price}</p>

          <button onClick={() => removeItem(item._id)}>
  Remove
</button>
        </div>
      ))}
      <hr />

<h2>🧾 Total Items: {cart.length}</h2>
<h2>💰 Total Price: ₹{total}</h2>
<button
  onClick={handlePayment}
  style={{
    padding: "10px 20px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px"
  }}
>
  Pay Now 💰
</button>
    </div>
  );
}

export default Cart;