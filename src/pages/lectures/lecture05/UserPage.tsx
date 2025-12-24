import { useParams } from 'react-router-dom';

export default function UserPage() {
  const { userId } = useParams();
  return <h2 className="text-xl font-bold">{userId}의 페이지</h2>;
}
