import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center w-full bg-black">
      <div className="flex items-center px-5 lg:p-0 h-20 container">
        <Link href="/" className="text-3xl font-bold text-primary-100">
          Montink Store
        </Link>
      </div>
    </header>
  );
}
