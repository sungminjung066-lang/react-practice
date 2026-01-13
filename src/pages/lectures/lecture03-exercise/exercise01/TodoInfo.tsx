interface TodoInfoProps {
  totalCount: number;
  completedCount: number;
}

export function TodoInfo({ totalCount, completedCount }: TodoInfoProps) {
  return (
    <div className="mt-6 flex justify-between border-t pt-4 text-sm text-gray-600">
      <span>전체: {totalCount}개</span>
      <span>완료: {completedCount}개</span>
      <span>남은 할 일: {totalCount - completedCount}개</span>
    </div>
  );
}
