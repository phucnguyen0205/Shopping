import Link from "next/link";

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

export default function ProductsPage() {
  return (
    <div>
      <h1>Product List</h1>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>
              {p.name} - ${p.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
