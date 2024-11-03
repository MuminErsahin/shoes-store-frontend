import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center py-4 border-b">
      <img 
        src={item.photo || "/placeholder.svg"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1 ml-4">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-gray-500 text-sm">${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 border rounded-md hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 border rounded-md hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <div className="ml-4 min-w-[100px] text-right">
        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 text-sm hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    photo: PropTypes.string
  }).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

const Cart = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link 
              to="/"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                onClick={clearCart}
                className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="flex-1 px-6 py-3 bg-black text-white rounded-md text-sm font-medium text-center hover:bg-gray-800"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;