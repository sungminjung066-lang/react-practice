// --- 2. Specialization (특수화) ---
// 더 일반적인(General) 컴포넌트를 렌더링하고, `props`를 통해 동작이나 스타일을 "특수화"합니다.
// 이는 기존 컴포넌트를 재사용하면서 특정 목적에 맞게 변형할 때 사용됩니다.

interface ButtonProps {
  variant?: 'default' | 'primary' | 'danger';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'default', onClick, children }: ButtonProps) {
  const baseClasses = 'rounded px-4 py-2 font-bold transition-colors duration-200';
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-500 text-white hover:bg-blue-700';
      break;
    case 'danger':
      variantClasses = 'bg-red-500 text-white hover:bg-red-700';
      break;
    default:
      variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
  }

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {children}
    </button>
  );
}
