import { useCallback, useContext, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../axiosInstance.js";
import { AuthContext } from "../../context/authContext";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useProducts } from "../../context/productsContext.js";

type Props = {};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = ({ routes }: Props) => {
  const { products, loadProducts } = useProducts();
  const { productCategory } = useParams();
  const [searchParams] = useSearchParams();

  // console.log("searchParams",searchParams.get("price"));

  // const { productCategory } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // let finalProducts = products;

    const price = searchParams.get("price");

    // if (productCategory) {
    //   finalProducts = products.filter((x) => x.category === productCategory);
    // }

    const finalProducts = products.filter((x) => {
      if (productCategory && price) {
        const priceArr = price.split(",");
        return (
          x.category === productCategory &&
          priceArr[0] < x.price &&
          priceArr[1] > x.price
        );
      }
      if (productCategory) {
        return x.category === productCategory;
      }
      if (price) {
        const priceArr = price.split(",");
        return priceArr[0] < x.price && priceArr[1] > x.price;
      }
      // if(productCategory && price)  {

      //   const priceArr = price.split(',')
      //   return x.category === productCategory &&  priceArr[0] < x.price && priceArr[1] > x.price
      // }
      return true;
    });

    setFilteredProducts(finalProducts);
  }, [products, productCategory, searchParams]);

  console.log(productCategory);

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {filteredProducts.map((product) => (
        <div key={product.id} className="group relative">
          <Link to={`product/${product.id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700 line-clamp-1">
                  {product.title}
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
              </div>

              <p className="text-sm font-medium text-gray-900">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(product.price)}
              </p>
            </div>
            <div className="mt-2">
              <h4 className="sr-only">Reviews</h4>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating.rate > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating.rate} out of 5 stars</p>
                <a
                  href="#"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {product.rating.count} reviews
                </a>
              </div>
            </div>
          </Link>
          <button
            type="button"
            className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
