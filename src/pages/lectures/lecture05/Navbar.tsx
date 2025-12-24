import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="mb-4 rounded bg-gray-100 p-2">
      <ul className="flex gap-4">
        <li>
          <Link to="/lecture/5/" className="text-blue-500 hover:underline">
            홈
          </Link>
        </li>
        <li>
          <Link to="/lecture/5/about" className="text-blue-500 hover:underline">
            소개
          </Link>
        </li>
        <li>
          <Link to="/lecture/5/user/est" className="text-blue-500 hover:underline">
            사용자 (est)
          </Link>
        </li>
        <li>
          <Link to="/lecture/5/user/google" className="text-blue-500 hover:underline">
            사용자 (google)
          </Link>
        </li>
      </ul>
    </nav>
  );
}
