import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    size: '',
    color: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      size: '',
      color: ''
    });
    onFilter({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Size</label>
          <input
            type="text"
            name="size"
            value={filters.size}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter size"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Color</label>
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter color"
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

ProductFilter.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default ProductFilter;