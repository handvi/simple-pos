/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Cart = ({ cart, totalPrice }) => {
    return (
      <div>
        <h3>Shopping Cart</h3>
        {cart.length > 0 ? (
          <div>
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.title} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <h4 className="mt-3">
              Total: IDR {totalPrice().toLocaleString()}
            </h4>
            <Link to="/checkout" className="btn btn-success mt-3">
              Proceed to Checkout
            </Link>
          </div>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    );
  };
  
export default Cart;
