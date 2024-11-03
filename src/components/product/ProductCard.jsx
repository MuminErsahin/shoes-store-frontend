import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.photo || "/placeholder.svg"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <div className="space-x-2">
            <Link
              to={`/product/${product.id}`}
              className="inline-block bg-gray-100 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
            >
              Details
            </Link>
            <button
              onClick={() => addItem(product)}
              className="inline-block bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.string
  }).isRequired
};

export default ProductCard;