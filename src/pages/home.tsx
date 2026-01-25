import { Link } from "react-router-dom";
import { FaAnglesDown, FaHeadset } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import videoCover from "../assets/videos/cover.mp4"; 
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import CommonSlider from "../components/common-slider";
import toast from "react-hot-toast";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { banners, clients } from "../utils/data";
import CategoriesSection from "./categories";

const services = [
  {
    icon: <TbTruckDelivery />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $200",
  },
  {
    icon: <LuShieldCheck />,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 SUPPORT",
    description: "Get support 24/7",
  },
];

const Home = () => {
    const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  const coverMessage =
    "Fashion isn't just clothes; it's a vibrant language. Silhouettes and textures speak volumes, a conversation starter with every bold print. It's a way to tell our story, a confidence booster, or a playful exploration. From elegance to rebellion, fashion lets us navigate the world in style.".split(
      " "
    );

  return (
    <>
      <div className="home">
        <CategoriesSection />
        <section className="hero-slider">
          <CommonSlider
            items={banners}
            itemsPerSlide={1}
            renderItem={(banner) => (
              <div className="banner-slide" key={banner.id}>
                <img src={banner.src} alt={banner.alt} />
                {banner.text && (
                  <div className="banner-text">
                    <h1>{banner.text.title}</h1>
                    <p>{banner.text.subtitle}</p>
                    {banner.text.cta && (
                      <Link to={banner.text.link} className="hero-btn">
                        {banner.text.cta}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
            containerClassName="common-slider-container hero-slider hero-mode"
            itemClassName="slider-item hero-slider-item"
            showIndicators
            showNavButtons={false}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </section>

        <h1>
          Latest Products
          <Link to="/search" className="findmore">
            More
          </Link>
        </h1>
        <main>
          {isLoading ? (
            <>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} style={{ height: "25rem" }}>
                  <Skeleton width="18.75rem" length={1} height="20rem" />
                  <Skeleton width="18.75rem" length={2} height="1.95rem" />
                </div>
              ))}
            </>
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
              />
            ))
          )}
        </main>
      </div>

      <article className="cover-video-container">
        <div className="cover-video-overlay"></div>
        <video autoPlay loop muted src={videoCover} />
        <div className="cover-video-content">
          <h2>Fashion</h2>
          {coverMessage.map((el, i) => (
            <span key={i}>{el} </span>
          ))}
        </div>
        <span>
          <FaAnglesDown />
        </span>
      </article>

      <article className="our-clients">
        <div>
          <h2>Our Tech Stack & Partners</h2>
          <CommonSlider
            items={clients}
            itemsPerSlide={6}
            renderItem={(client) => (
              <div className="client-item">
                <img src={client.src} alt={client.alt} />
              </div>
            )}
            showIndicators={true}
            showNavButtons={true}
            containerClassName="common-slider-container clients-slider"
            itemClassName="slider-item client-slider-item"
          />
          <p>Trusted By 100+ Companies in 30+ countries</p>
        </div>
      </article>

      <hr
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          border: "none",
          height: "1px",
        }}
      />

      <article className="our-services">
        <ul>
          {services.map((service, i) => (
            <li key={i}>
              <div>{service.icon}</div>
              <section>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </section>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default Home;
