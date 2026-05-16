import { Link } from "react-router-dom";

function Success() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        background: "#f8f9fa",
      }}
    >
      <div
        className="card shadow-lg border-0 text-center p-5"
        style={{
          borderRadius: "20px",
          maxWidth: "500px",
          width: "100%",
        }}
      >

        {/* SUCCESS ICON */}
        <div
          className="mx-auto mb-4 d-flex justify-content-center align-items-center"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#198754",
            color: "white",
            fontSize: "50px",
          }}
        >
          ✓
        </div>

        {/* TITLE */}
        <h1 className="fw-bold mb-3 text-success">
          Payment Successful
        </h1>

        {/* MESSAGE */}
        <p className="text-muted mb-4">
          Your order has been placed successfully.
          Thank you for shopping with E-Shelf 📚
        </p>

        {/* BUTTON */}
        <Link to="/">
          <button className="btn btn-dark px-4 py-2">
            Continue Shopping
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Success;