import { toast } from "react-toastify";
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
        toast.success("Payment Successful 🎉");
         console.log(response);

        navigate("/success");
       
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    toast.error("Payment Failed ❌");
  }
};

  return (
    <div className="container mt-4">

  <h1 className="fw-bold mb-4">
    🛒 My Cart
  </h1>

  <div className="row">

    {/* LEFT SIDE */}
    <div className="col-lg-8">

      {cart.length === 0 ? (
        <h4>Your cart is empty 😢</h4>
      ) : (
        cart.map((item) => (

          <div
            key={item._id}
            className="card mb-3 shadow-sm border-0"
            style={{ borderRadius: "15px" }}
          >

            <div className="row g-0 align-items-center">

              {/* IMAGE */}
              <div className="col-md-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid rounded-start"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>

              {/* DETAILS */}
              <div className="col-md-9">

                <div className="card-body">

                  <h4 className="fw-bold">
                    {item.title}
                  </h4>

                  <p className="text-muted">
                    Premium Ebook Edition
                  </p>

                  <h5 className="text-success fw-bold">
                    ₹ {item.price}
                  </h5>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="btn btn-danger mt-2"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))
      )}

    </div>

    {/* RIGHT SIDE */}
    <div className="col-lg-4">

      <div
        className="card shadow-sm border-0 p-4"
        style={{ borderRadius: "15px" }}
      >

        <h3 className="fw-bold mb-4">
          Order Summary
        </h3>

        <div className="d-flex justify-content-between mb-3">
          <span>Total Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span>Total Price</span>
          <span>₹ {total}</span>
        </div>

        <hr />

        <button
          onClick={handlePayment}
          className="btn btn-success w-100 py-2 fw-bold"
        >
          Proceed to Pay 💳
        </button>

      </div>

    </div>

  </div>

</div>
);}

export default Cart;