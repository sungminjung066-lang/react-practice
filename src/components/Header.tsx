import React from 'react';

import Nav from './Nav';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white shadow-md">
      <h1 className="text-3xl font-bold">React 강의</h1>
      <Nav />
    </header>
  );
};

export default Header;
