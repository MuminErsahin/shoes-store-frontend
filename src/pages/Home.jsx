import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/product/ProductCard";
import ProductFilter from "../components/product/ProductFilter";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { sliderImages } from "../SlideBarData/sliderImages";

const Home = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilter = (filters) => {
    let result = [...products];

    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    if (filters.size) {
      result = result.filter(p => p.size === filters.size);
    }
    if (filters.color) {
      result = result.filter(p => 
        p.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    setFilteredProducts(result);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }


    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="relative w-full">
                    <Swiper
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        effect="fade"
                        loop={true}
                        speed={1000}
                        modules={[Pagination, Autoplay, EffectFade]}
                        className="w-full"
                        breakpoints={{
                            
                            320: {
                                height: 300
                            },
                          
                            768: {
                                height: 400
                            },
                         
                            1024: {
                                height: '100vh'
                            }
                        }}
                    >
                        {sliderImages.map((slide, index) => (
                            <SwiperSlide key={index} className="relative">
                                <div className="h-full w-full">
                                    <img 
                                        src={slide.url} 
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                                        <div className="container mx-auto px-4">
                                            <div className="max-w-2xl mx-auto md:mx-0">
                                                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-white">
                                                    {slide.title}
                                                </h1>
                                                <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-8 text-white">
                                                    {slide.description}
                                                </p>
                                                <a
                                                    href="#products"
                                                    className="inline-block bg-white text-black px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-md font-semibold hover:bg-gray-100 transition-colors"
                                                >
                                                    Shop Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

           
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Featured Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-lg md:text-xl font-semibold">Sports Collection</h3>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-lg md:text-xl font-semibold">Classic Collection</h3>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center">
                            <h3 className="text-lg md:text-xl font-semibold">Casual Collection</h3>
                        </div>
                    </div>
                </div>

                <div id="products" className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64">
                            <ProductFilter onFilter={handleFilter} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Featured Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-gray-100 py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Stay Updated</h2>
                            <p className="mb-4 md:mb-6 text-sm md:text-base">
                                Subscribe to our newsletter for the latest updates and exclusive offers.
                            </p>
                            <div className="flex max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 md:px-4 py-2 rounded-l-md text-sm md:text-base"
                                />
                                <button className="bg-black text-white px-4 md:px-6 py-2 rounded-r-md text-sm md:text-base hover:bg-gray-800 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;