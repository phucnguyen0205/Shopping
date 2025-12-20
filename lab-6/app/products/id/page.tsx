type Props = {
  params: { id: string };
};

const products = [
  { id: "1", name: "Product 1", price: 100, desc: "Description for product 1" },
  { id: "2", name: "Product 2", price: 200, desc: "Description for product 2" },
  { id: "3", name: "Product 3", price: 300, desc: "Description for product 3" },
];

export default function ProductDetailsPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) return <h2>Product not found</h2>;

  return (
    <div>
      <h1>Product Details</h1>
      <p><b>ID:</b> {product.id}</p>
      <p><b>Name:</b> {product.name}</p>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Description:</b> {product.desc}</p>
    </div>
  );
}
