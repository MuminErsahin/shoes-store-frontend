const BASE_URL = 'https://your-railway-app-url.railway.app/api/v1';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? { 'Authorization': `Basic ${user.token}` } : {};
};

export const api = {
    // Products
    getProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    getUsers: async () => {
        const response = await fetch(`${BASE_URL}/users`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    getDashboardStats: async () => {
        try {
            const [products, orders] = await Promise.all([
              api.getProducts(),
              api.getOrders()
            ]);

            return {
              totalProducts: products.length,
              totalOrders: orders?.length || 0,
              recentOrders: orders?.slice(0, 5) || [],
              totalUsers: '-'
            };
          } catch (err) {
            console.error('Dashboard stats error:', err);
            throw new Error('Failed to fetch dashboard statistics');
          }
    },

    getProductById: async (id) => {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    createProduct: async (productData) => {
        try {
            console.log('Sending to backend:', JSON.stringify(productData, null, 2));
            const response = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error(errorText);
            }

            return response.json();
        } catch (err) {
            console.error('Create product error:', err);
            throw err;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            console.log('Update response:', response); 

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText); 
                throw new Error(errorText || 'Failed to update product');
            }

            return response.json().catch(() => ({})); 
        } catch (err) {
            console.error('Update error:', err); 
            throw err;
        }
    },

    deleteProduct: async (id) => {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return true;
    },

    // Categories
    getCategories: async () => {
        const response = await fetch(`${BASE_URL}/categories`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
    },

    getProductsByCategory: async (categoryId) => {
        const response = await fetch(`${BASE_URL}/categories/${categoryId}/products`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch products by category');
        return response.json();
    },

    // Orders
    getOrders: async () => {
        const response = await fetch(`${BASE_URL}/orders`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    createOrder: async (orderData) => {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },

    // Search
    searchProducts: async (query) => {
        const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to search products');
        return response.json();
    },

    // Brands
    getBrands: async () => {
        const response = await fetch(`${BASE_URL}/brands`, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch brands');
        return response.json();
    }
};

export default api;