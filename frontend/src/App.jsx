import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";
import Success from "./Success";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (book) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        title: book.title,
        price: book.price,
        image: book.image,
      });

      alert("Added to Cart ✅");
    } catch (err) {
      console.log(err);
      alert("Failed to add ❌");
    }
  };

  return (
    <div>

      {/* NAVBAR */}
      <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/cart">
          <button>Cart</button>
        </Link>
      </div>

      {/* ROUTES */}
      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <h1>📚 E-Shelf Store</h1>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                {books.map((book) => (
                  <div
                    key={book._id}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      width: "200px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />

                    <h3>{book.title}</h3>
                    <p>₹ {book.price}</p>

                    <button
                      onClick={() => addToCart(book)}
                      style={{
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* CART PAGE */}
        <Route path="/cart" element={<Cart />} />

        {/* SUCCESS PAGE */}
        <Route path="/success" element={<Success />} />

      </Routes>
    </div>
  );
}

export default App;