import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-slate-300 hover:text-slate-400">
            홈
          </Link>
        </li>
        {/* 추가적인 네비게이션 링크들 */}
      </ul>
    </nav>
  );
};

export default Nav;
