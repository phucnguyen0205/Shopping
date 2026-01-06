import Link from "next/link";

export default function CartPage() {
  return (
    <div>
      <h1>Cart Page</h1>

      <Link href="/shop/products">Go to Products</Link>
    </div>
  );
}
