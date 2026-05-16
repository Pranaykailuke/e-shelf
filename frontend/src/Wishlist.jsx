function Wishlist({ wishlist, removeFromWishlist }) {
  return (
    <div className="container mt-4">

      <h1 className="fw-bold mb-4">
        ❤️ My Wishlist
      </h1>

      <div className="row g-4">

        {wishlist.length === 0 ? (
          <h4>No wishlist items yet 😢</h4>
        ) : (
          wishlist.map((book) => (

            <div
              className="col-md-4 col-lg-3"
              key={book._id}
            >

              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >

                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                  style={{
                    height: "280px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="fw-bold">
                    {book.title}
                  </h5>

                  <h5 className="text-success">
                    ₹ {book.price}
                  </h5>

                  <button
                    onClick={() => removeFromWishlist(book._id)}
                    className="btn btn-danger mt-auto"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Wishlist;