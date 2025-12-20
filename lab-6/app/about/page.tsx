import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>

      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
