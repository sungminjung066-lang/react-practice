import React from 'react';

// key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는 특별한 문자열 속성입니다.
// key는 엘리먼트 리스트를 만들 때 반드시 포함해야 합니다.
// key는 형제 사이에서만 고유하면 되고, 전체 애플리케이션에서 고유할 필요는 없습니다.

// --- Key가 필요한 이유 ---
// React는 key를 사용하여 배열의 이전 트리와 다음 트리의 자식들을 비교합니다.
// key가 없으면 React는 순서에 의존하여 변경 사항을 파악하므로,
// 배열의 맨 앞에 항목을 추가하거나, 항목을 재정렬/삭제할 때 비효율적이고 예기치 않은 문제가 발생할 수 있습니다.

type Item = {
  id: string;
  text: string;
};

// 각 아이템이 내부적인 상태(예: input 값)를 가지는 컴포넌트
function ItemWithInput({ item }: { item: Item }) {
  return (
    <li className="mb-2 flex items-center">
      <span className="w-24">{item.text}:</span>
      <input
        type="text"
        className="rounded border border-gray-400 p-1"
        placeholder="여기에 입력..."
      />
    </li>
  );
}

function KeyPropExample() {
  const initialItems: Item[] = [
    { id: crypto.randomUUID(), text: 'Apple' },
    { id: crypto.randomUUID(), text: 'Banana' },
    { id: crypto.randomUUID(), text: 'Cherry' },
  ];
  const [items, setItems] = React.useState(initialItems);
  const [itemsForIndexKey, setItemsForIndexKey] = React.useState(initialItems);

  const handleAddItemToStart = () => {
    const newItem: Item = { id: crypto.randomUUID(), text: 'New Fruit' };
    // 올바른 예: 안정적인 id를 key로 사용
    setItems([newItem, ...items]);
    // 잘못된 예: 배열의 index를 key로 사용
    setItemsForIndexKey([newItem, ...itemsForIndexKey]);
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">React `key` Prop 예제</h1>
      <p className="mb-4">
        `key`는 React가 리스트의 항목을 효율적으로 업데이트하고 식별하기 위해 필요합니다.
      </p>
      <button
        onClick={handleAddItemToStart}
        className="mb-6 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        리스트 맨 앞에 아이템 추가
      </button>
      <p className="mb-4">
        버튼을 누르기 전에 각 리스트의 첫 번째 input에 아무 텍스트나 입력해보세요.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* --- 잘못된 예: key로 배열의 index 사용 --- */}
        <div>
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            잘못된 예: `key`로 배열의 `index` 사용
          </h2>
          <p className="mb-2 text-sm">
            새 아이템이 추가되면, React는 `key`(index)를 기준으로 컴포넌트를 재사용합니다. 따라서 첫
            번째 아이템의 `input` 상태가 그대로 남아있는 것처럼 보입니다. (실제로는 컴포넌트가
            업데이트되고 props만 변경됨)
          </p>
          <ul>
            {itemsForIndexKey.map((item, index) => (
              <ItemWithInput key={index} item={item} />
            ))}
          </ul>
        </div>

        {/* --- 올바른 예: key로 고유하고 안정적인 id 사용 --- */}
        <div>
          <h2 className="mb-2 text-xl font-semibold text-green-600">
            올바른 예: `key`로 고유한 `id` 사용
          </h2>
          <p className="mb-2 text-sm">
            `key`로 각 아이템의 고유 `id`를 사용하면, React는 어떤 아이템이 새로 추가되었는지 정확히
            인식합니다. 따라서 기존 아이템들의 `input` 상태는 그대로 유지됩니다.
          </p>
          <ul>
            {items.map((item) => (
              <ItemWithInput key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default KeyPropExample;
