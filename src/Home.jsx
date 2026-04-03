export default function Home({ products }) {
  return (
    <div>
      <h1>Home Page</h1>
      {products.map(p => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>{p.subtitle}</p>
          <img src={p.image} alt={p.name} width="200" />
        </div>
      ))}
    </div>
  );
}
