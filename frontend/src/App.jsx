import Login from "./Login";
import Signup from "./Signup";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "./Cart";
import Success from "./Success";
import { toast } from "react-toastify";
import Wishlist from "./Wishlist";
import Admin from "./Admin";
import {
  FaHome, FaHeart, FaShoppingCart,
  FaMoon, FaSun, FaSignOutAlt,
  FaUser, FaUserShield
} from "react-icons/fa";

const ProtectedRoute = ({ user, authLoading, children }) => {
  if (authLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
function App() {
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
  const savedWishlist =
    localStorage.getItem("wishlist");

  return savedWishlist
    ? JSON.parse(savedWishlist)
    : [];
});
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartCount, setCartCount] = useState(() => {
  return Number(localStorage.getItem("cartCount")) || 0;
});
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
const [user, setUser] = useState(null);
const [authLoading, setAuthLoading] = useState(true);
useEffect(() => {
  const savedUser = JSON.parse(
    localStorage.getItem("user")
  );
  if (savedUser) {
    setUser(savedUser);
  }
  setAuthLoading(false);
}, []);

 const filteredBooks = books
  .filter((book) => {

    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      book.category === category;

    return matchesSearch && matchesCategory;
  })

  .sort((a, b) => {

    if (sortType === "low") {
      return a.price - b.price;
    }

    if (sortType === "high") {
      return b.price - a.price;
    }

    if (sortType === "rating") {
      return b.rating - a.rating;
    }

    if (sortType === "az") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  useEffect(() => {
  getBooks();
}, []);

useEffect(() => {
  localStorage.setItem("darkMode", darkMode);
}, [darkMode]);
useEffect(() => {
  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
}, [wishlist]);
useEffect(() => {
  localStorage.setItem(
    "cartCount",
    cartCount
  );
}, [cartCount]);

  const getBooks = async () => {
    try {
      const res = await axios.get("https://e-shelf-backend.onrender.com/api/books")
      setBooks(res.data);
      setLoading(false);
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

      toast.success("Added to Cart ✅");
      setCartCount(cartCount + 1);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add ❌");
    }
  };
  

const addToWishlist = (book) => {

  const alreadyExists = wishlist.find(
    (item) => item._id === book._id
  );

  if (alreadyExists) {
    toast.info("Already in Wishlist ❤️");
    return;
  }

  setWishlist([...wishlist, book]);

  toast.success("Added to Wishlist ❤️");
};

const removeFromWishlist = (id) => {
  const updatedWishlist = wishlist.filter(
    (item) => item._id !== id
  );

  setWishlist(updatedWishlist);

  toast.info("Removed from Wishlist");
};
const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  setUser(null);

  toast.success("Logged Out ");
};


 return (
  <div
    className={
      darkMode
        ? "bg-dark text-light min-vh-100"
        : "bg-light text-dark min-vh-100"
    }
  >
    {/* NAVBAR */}
<nav

  className={`navbar navbar-expand-lg px-4 ${
    darkMode ? "navbar-dark bg-black" : "navbar-dark bg-dark"
  }`}
>

  <div className="container-fluid">

    {/* LOGO */}
    <Link className="navbar-brand fw-bold fs-3" to="/">
      E-Shelf 📚
    </Link>

    {/* MOBILE MENU BUTTON */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* NAV ITEMS */}
    <div className="collapse navbar-collapse" id="navbarNav">

      <div className="ms-auto d-flex align-items-center gap-3 flex-wrap">

  {/* SEARCH BAR */}
  <input
    type="text"
    placeholder="Search books..."
    className="form-control"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "250px",
      borderRadius: "10px",
    }}
  />

 <div
  title={darkMode ? "Light Mode" : "Dark Mode"}
  onClick={() => setDarkMode(!darkMode)}
  style={{ cursor: "pointer" }}
>
  {darkMode ? (
    <FaSun size={22} color="white" />
  ) : (
    <FaMoon size={22} color="white" />
  )}
</div>
  {/* HOME BUTTON */}
  <Link to="/" className="text-decoration-none">
   <div title="Home">
  <FaHome size={22} color="white" />
</div>
  </Link>
  <Link to="/admin">
  <div title="Admin Panel">
    <FaUserShield size={22} color="white" />
  </div>
</Link>

{/* WISHLIST */}
<Link to="/wishlist" className="text-decoration-none">
  <div
    className="position-relative"
    title="Wishlist"
  >
    <FaHeart size={22} color="white" />

    <span
      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      style={{ fontSize: "10px" }}
    >
      {wishlist.length}
    </span>
  </div>
</Link>

{/* CART */}
<Link to="/cart" className="text-decoration-none">
  <div
    className="position-relative"
    title="Cart"
  >
    <FaShoppingCart size={22} color="white" />

    <span
      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
      style={{ fontSize: "10px" }}
    >
      {cartCount}
    </span>
  </div>
</Link>

{/* LOGIN / LOGOUT */}
{user ? (

  <div
    title="Logout"
    onClick={handleLogout}
    style={{ cursor: "pointer" }}
  >
    <FaSignOutAlt size={22} color="white" />
  </div>

) : (

  <div className="d-flex gap-3">

    <Link to="/signup">
      <div title="Signup">
        <FaUser size={22} color="white" />
      </div>
    </Link>

  </div>

)}

</div>

    </div>

  </div>

</nav>

      {/* ROUTES */}
      <Routes>

        {/* HOME PAGE */}
        <Route
  path="/"
  element={
    <ProtectedRoute user={user} authLoading={authLoading}>
<div className="container mt-4">

              <div className="d-flex gap-2 flex-wrap mb-4">

  <button
    onClick={() => setCategory("All")}
    className="btn btn-dark"
  >
    All
  </button>

  <button
    onClick={() => setCategory("Fiction")}
    className="btn btn-outline-dark"
  >
    Fiction
  </button>

  <button
    onClick={() => setCategory("Programming")}
    className="btn btn-outline-dark"
  >
    Programming
  </button>

  <button
    onClick={() => setCategory("Finance")}
    className="btn btn-outline-dark"
  >
    Finance
  </button>

  <button
    onClick={() => setCategory("Self Help")}
    className="btn btn-outline-dark"
  >
    Self Help
  </button>

</div>

  <h1 className="mb-4 fw-bold">
    📚 E-Shelf Store
  </h1>
  <select
  className="form-select mb-4"
  style={{ maxWidth: "250px" }}
  value={sortType}
  onChange={(e) => setSortType(e.target.value)}
>

  <option value="">
    Sort Books
  </option>

  <option value="low">
    Price: Low to High
  </option>

  <option value="high">
    Price: High to Low
  </option>

  <option value="rating">
    Top Rated
  </option>

  <option value="az">
    A-Z
  </option>

</select>
 
 {loading ? (

  <div className="text-center mt-5">

    <div
      className="spinner-border text-dark"
      role="status"
    ></div>

    <p className="mt-3 fw-bold">
      Loading Books...
    </p>

  </div>

) : (

  <div className="row g-4">

    {filteredBooks.map((book) => (

      <div className="col-md-4 col-lg-3" key={book._id}>

        <div
        onClick={() => setSelectedBook(book)}
 className={`card h-100 border-0 book-card ${
  darkMode
    ? "bg-dark text-light"
    : "bg-white text-dark"
}`}
  style={{
    borderRadius: "18px",
    overflow: "hidden",
    transition: "0.3s ease",
    boxShadow: darkMode
  ? "0 4px 15px rgba(255,255,255,0.1)"
  : "0 4px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
  }}
>

          {/* IMAGE */}
          <img
            src={book.image}
            className="card-img-top book-image"
            alt={book.title}
            
            style={{
              height: "150px",
              objectFit: "cover",
            }}
          />

          {/* BODY */}
          <div className="card-body d-flex flex-column">

            {/* TITLE */}
            <h5 className="card-title fw-bold">
              {book.title}
            </h5>

            {/* AUTHOR */}
            <p className={darkMode ? "text-light-emphasis mb-1" : "text-muted mb-1"}>
              {book.author}
            </p>

            {/* CATEGORY */}
            <span className="badge bg-secondary mb-2">
              {book.category}
            </span>

            {/* RATING */}
            <p className="text-warning mb-2">

  ⭐ {book.rating}
</p>
            
          {/* DESCRIPTION */}
<p
  className={`small ${
    darkMode ? "text-light-emphasis" : "text-muted"
  }`}
>
  {book.description}
</p>

            {/* PRICE */}
            <h5
  className={`fw-bold ${
    darkMode ? "text-warning" : "text-dark"
  }`}
>
  ₹ {book.price}
</h5>

            {/* BUTTON */}
            <div className="d-flex gap-2 mt-auto">

  <button
    onClick={() => addToCart(book)}
    className="btn btn-dark btn-sm flex-grow-1"
  >
    Add to Cart
  </button>

  <button
    onClick={() => addToWishlist(book)}
    className="btn btn-outline-danger btn-sm"
  >
    ❤️
  </button>

</div>

          </div>

        </div>

      </div>

    ))}

  </div>
)}
</div>
          </ProtectedRoute>
        }
        />

        {/* CART PAGE */}
        <Route path="/cart" element={
  <ProtectedRoute user={user} authLoading={authLoading}>
    <Cart />
  </ProtectedRoute>
} />

<Route path="/admin" element={
  <ProtectedRoute user={user} authLoading={authLoading}>
    <Admin />
  </ProtectedRoute>
} />

<Route
  path="/wishlist"
  element={
    <ProtectedRoute user={user} authLoading={authLoading}>
  <Wishlist
    wishlist={wishlist}
    removeFromWishlist={removeFromWishlist}
  />
</ProtectedRoute>
  }
/>
<Route
  path="/login"
  element={<Login setUser={setUser} />}
/>

<Route path="/signup" element={<Signup />} />


        {/* SUCCESS PAGE */}
        <Route path="/success" element={<Success />} />

      </Routes>
{/* BOOK DETAILS MODAL */}
{selectedBook && (

  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{
      backgroundColor: "rgba(0,0,0,0.7)",
    }}
  >

    <div className="modal-dialog modal-lg modal-dialog-centered">

      <div
        className={`modal-content ${
          darkMode
            ? "bg-dark text-light"
            : "bg-white text-dark"
        }`}
        style={{
          borderRadius: "20px",
        }}
      >

        {/* HEADER */}
        <div className="modal-header border-0">

          <h3 className="fw-bold">
            {selectedBook.title}
          </h3>

          <button
            className="btn-close"
            onClick={() => setSelectedBook(null)}
          ></button>

        </div>

        {/* BODY */}
        <div className="modal-body">

          <div className="row">

            {/* IMAGE */}
            <div className="col-md-5">

              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                className="img-fluid rounded"
                style={{
                  height: "400px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />

            </div>

            {/* DETAILS */}
            <div className="col-md-7">

              <p>
                <strong>Author:</strong>{" "}
                {selectedBook.author}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {selectedBook.category}
              </p>

              <p className="text-warning">
                ⭐ {selectedBook.rating}
              </p>

              <p>
                {selectedBook.description}
              </p>

              <h3 className="fw-bold mt-4">
                ₹ {selectedBook.price}
              </h3>

              <button
                onClick={() => addToCart(selectedBook)}
                className="btn btn-success mt-3"
              >
                Add to Cart 🛒
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

)}
      <footer
  className={`text-center py-4 mt-5 ${
    darkMode
      ? "bg-black text-light"
      : "bg-dark text-light"
  }`}
>

  <h5 className="fw-bold">
    E-Shelf 📚
  </h5>

  <p className="mb-1">
    Your Premium Ebook Store
  </p>

  <small>
    © 2026 E-Shelf. All Rights Reserved.
  </small>

</footer>
    </div>
  );
}

export default App;