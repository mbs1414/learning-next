import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
          <div>
            Home
          </div>
          <div style={{color: "red"}}>
            <Link href="/about">About us</Link>
          </div>
      </main>
    </div>
  );
}
