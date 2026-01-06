import Link from "next/link";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Page</h1>

      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
