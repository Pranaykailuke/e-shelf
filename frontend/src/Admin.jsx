import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



function Admin() {

  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    rating: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/books"
      );

      setBooks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addBook = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
  "http://localhost:5000/api/books",
  formData,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

     toast.success("Book Added ✅");
fetchBooks();
setTimeout(() => {
    window.location.href = "/";
}, 1500);

      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
        rating: "",
        image: "",
        description: "",
      });

    } catch (err) {

      console.log(err);

      toast.error("Failed ❌");
    }
  };

const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.delete(
        `http://localhost:5000/api/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Book Deleted 🗑");
      fetchBooks();

    } catch (err) {
      console.log(err);
      toast.error("Delete Failed ❌");
    }
  };

  return (

    <div className="container mt-5">

      <h1 className="fw-bold mb-4">
        Admin Dashboard
      </h1>

      {/* ADD BOOK FORM */}
      <div className="card p-4 shadow mb-5">

        <h3 className="mb-4">
          Add New Book
        </h3>

        <form onSubmit={addBook}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="author"
                placeholder="Author"
                className="form-control"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                step="0.1"
                name="rating"
                placeholder="Rating"
                className="form-control"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <textarea
                name="description"
                placeholder="Description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

          </div>

          <button className="btn btn-dark">
            Add Book
          </button>

        </form>

      </div>

      {/* BOOK LIST */}
      <div className="row g-4">

        {books.map((book) => (

          <div
            className="col-md-4 col-lg-3"
            key={book._id}
          >

            <div className="card h-100 shadow-sm">

             <img
    src={book.image}
    alt={book.title}
    onError={(e) => {
        e.target.src = "https://via.placeholder.com/300x400";
    }}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h5 className="fw-bold">
                  {book.title}
                </h5>

                <p className="text-muted mb-1">
                  {book.author}
                </p>

                <p className="small">
                  {book.category}
                </p>

                <h6>
                  ₹ {book.price}
                </h6>

                <button
                  onClick={() => deleteBook(book._id)}
                  className="btn btn-danger btn-sm mt-2"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Admin;