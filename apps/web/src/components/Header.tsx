import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            My App
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link href="/login" className="hover:text-gray-200 transition duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-200 transition duration-300">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
