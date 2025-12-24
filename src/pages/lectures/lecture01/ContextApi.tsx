import React from 'react';

// 1. Context 생성
type ContextValue = {
  title: string;
  description: string;
};

const MyContext = React.createContext<ContextValue>({ title: '', description: '' });

// 2. Context Provider 컴포넌트
function GrandParentComponent() {
  const value = { title: 'Grandparent', description: 'Hello from GrandParent!' };
  return (
    <MyContext.Provider value={value}>
      <ParentComponent />
    </MyContext.Provider>
  );
}

// 3. 중간 컴포넌트
function ParentComponent() {
  return <ChildComponent />;
}

// 4. Context Consumer 컴포넌트
function ChildComponent() {
  const value = React.useContext(MyContext);
  return (
    <div>
      <h4>1-3: Child Component</h4>
      <p>Title: {value.title}</p>
      <p>Description: {value.description}</p>
    </div>
  );
}

export default GrandParentComponent;
