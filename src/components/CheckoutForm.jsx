/* eslint-disable react/prop-types */

const CheckoutForm = ({ cart }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order submitted successfully!");
  };

  return (
    <div className="mt-4">
      <h3>Checkout</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Order
        </button>
      </form>
      <h4 className="mt-3">Items in your cart:</h4>
      <ul className="list-group mt-3">
        {cart.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.title} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutForm;
