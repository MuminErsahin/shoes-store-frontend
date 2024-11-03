import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../hooks/useCart';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error('Error loading product:', err);
      }
    };

    loadProduct();
  }, [id, getProductById]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.photo || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500">{product.description}</p>

            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.stockQuantity > 0 ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <p className="mt-1">{product.color}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <p className="mt-1">{product.size}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-md"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className={`w-full py-3 px-8 flex items-center justify-center text-white ${
                  product.stockQuantity === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                } rounded-md focus:outline-none`}
              >
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-900">Product Details</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  Brand: {product.brandId}
                </p>
                <p className="text-sm text-gray-500">
                  Stock: {product.stockQuantity} units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;