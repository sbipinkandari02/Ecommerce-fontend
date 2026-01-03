import { FaExpandAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type ProductsProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const DUMMY_IMAGE =
  "assets/images/dummy-product-image-300x300.jpg";

const ProductCard = ({
  productId,
  price,
  name,
  photos,
  stock,
  handler,
}: ProductsProps) => {
  const imageUrl =
    photos?.length > 0 && photos[0]?.url
      ? transformImage(photos[0].url, 400)
      : DUMMY_IMAGE;

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = DUMMY_IMAGE;
        }}
      />

      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          disabled={stock < 1}
          onClick={() =>
            handler({
              productId,
              price,
              name,
              photo: photos?.[0]?.url || DUMMY_IMAGE,
              stock,
              quantity: 1,
            })
          }
        >
          <FaPlus />
        </button>

        <Link to={`/product/${productId}`}>
          <FaExpandAlt />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
