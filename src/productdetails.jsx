export default function ProductDetail({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.subtitle}</p>
      <p>Price: ₹{product.price}</p>
      <img src={product.image} alt={product.name} width="300" />
    </div>
  );
}
