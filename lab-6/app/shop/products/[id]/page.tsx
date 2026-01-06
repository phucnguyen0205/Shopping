type Props = { params: { id: string } };

export default function ProductDetailPage({ params }: Props) {
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}
