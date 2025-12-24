import { Route, Routes } from 'react-router-dom';

import AboutPage from './AboutPage';
import HomePage from './HomePage';
import Navbar from './Navbar';
import UserPage from './UserPage';

export default function RouterExample() {
  return (
    <div className="rounded-lg border p-4">
      <h2 className="mb-4 text-2xl font-bold">React Router 예제</h2>
      <Navbar />
      <div className="border border-dashed p-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="user/:userId" element={<UserPage />} />
        </Routes>
      </div>
    </div>
  );
}
