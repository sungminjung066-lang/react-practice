// --- 1. Containment (포함) ---
// 여러 컴포넌트가 공통된 "컨테이너" 역할을 하는 컴포넌트를 사용하고,
// 그 안에 다양한 자식(children)을 렌더링해야 할 때 유용합니다.
// `props.children`을 사용하여 자식 요소를 전달받습니다.

interface CardProps {
  title?: string;
  footer?: React.ReactNode; // React.ReactNode는 JSX를 포함한 모든 렌더링 가능한 것을 의미
  children: React.ReactNode;
}

export function Card({ title, footer, children }: CardProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      {title && <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>}
      <div className="text-gray-700">{children}</div>
      {footer && (
        <div className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-500">{footer}</div>
      )}
    </div>
  );
}
