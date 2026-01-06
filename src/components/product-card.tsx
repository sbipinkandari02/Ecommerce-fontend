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

const ProductCard = ({
  productId,
  price,
  name,
  photos,
  stock,
  handler,
}: ProductsProps) => {
  // HARD GUARD — required data
  if (!photos?.length || !photos[0]?.url) {
    return null; // or render an error placeholder
  }

  const imageUrl = transformImage(photos[0].url, 400);

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />

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
              photo: photos[0].url,
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
