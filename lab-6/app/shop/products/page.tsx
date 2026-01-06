import Link from "next/link";

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
];

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/shop/cart">Go to Cart</Link>
    </div>
  );
}
