// src/components/categories-section.tsx
import { useCategoriesQuery } from "../redux/api/productAPI";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const { data } = useCategoriesQuery("");
  const navigate = useNavigate();
  const latestCategories = data?.categories.slice(0, 6) || [];
  const handleCategoryClick = (category: string) => {
    const query = category ? `?category=${category}` : "";
    navigate(`/search${query}`);
  };

  return (
    <section className="categories-section">
      <div className="category-card" onClick={() => handleCategoryClick("")}>
        ALL
      </div>
      {latestCategories.map((cat) => (
        <div
          key={cat}
          className="category-card"
          onClick={() => handleCategoryClick(cat)}
        >
          {cat.toUpperCase()}
        </div>
      ))}
    </section>
  );
};

export default CategoriesSection;
