// eslint-disable-next-line @typescript-eslint/no-empty-object-type
// interface TodoContainerProps extends React.ComponentPropsWithoutRef<'div'> {}

interface TodoContainerProps {
  children: React.ReactNode;
}

export function TodoContainer({ children }: TodoContainerProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">📝 Todo List</h1>

        <div className="rounded-xl bg-white p-6 shadow-lg">{children}</div>
      </div>
    </div>
  );
}
