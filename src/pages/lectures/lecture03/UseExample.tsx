import { Suspense } from 'react';
import { use } from 'react';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

const cache = new Map<number, Promise<Pokemon>>();

function fetchPokemon(id: number): Promise<Pokemon> {
  if (!cache.has(id)) {
    cache.set(
      id,
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
    );
  }
  return cache.get(id)!;
}

function PokemonInfo({ id }: { id: number }) {
  const pokemon = use(fetchPokemon(id));
  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  );
}

function UseExample() {
  return (
    <div>
      <h2>3-3: React.use() Example</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonInfo id={1} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonInfo id={25} />
      </Suspense>
    </div>
  );
}

export default UseExample;

/**
 * React.use()는 React 19에 도입된 새로운 기능으로, 비동기 코드나 데이터를 컴포넌트 안에서 더 쉽고 직관적으로 사용할 수
   있게 해주는 "마법 지팡이" 같은 도구입니다.

  핵심 개념: "기다렸다가 값 꺼내오기"

  React.use()의 가장 중요한 역할은 프로미스(Promise)나 컨텍스트(Context)에서 값을 직접 꺼내오는 것입니다.

   - 프로미스(Promise): "나중에 데이터 줄게"라는 약속입니다. 보통 서버에서 데이터를 가져올 때 사용되죠.
   - 컨텍스트(Context): 컴포넌트 트리 전체에 데이터를 공유할 때 사용됩니다.

  use()는 이 "약속"이 완료될 때까지 잠시 렌더링을 멈추고, 값이 준비되면 그 값을 꺼내서 우리에게 줍니다.

  ---
  use()는 어떻게 동작할까요? (프로미스 예시)

  서버에서 포켓몬 정보를 가져오는 상황을 상상해 보세요.

  1. 데이터 요청 (Fetch)
      - fetch('.../pokemon/25') 코드를 실행하면, 브라우저는 서버에 "25번 포켓몬 정보 주세요!"라고 요청합니다.
      - 서버가 데이터를 준비하는 데 시간이 걸리기 때문에, fetch는 일단 "데이터를 가져오겠다는 약속"인 프로미스를 먼저
        반환합니다.

  2. `use()`의 마법
      - 이때 const pokemon = use(데이터_가져오겠다는_약속) 코드를 만나면, React는 이렇게 동작합니다.
        1. "아직 약속이 안 끝났네? (데이터가 도착 안 했네?)"
        2. 그럼 이 컴포넌트 렌더링을 일시 중단(Suspend) 시킵니다.
        3. 그리고 미리 지정된 로딩 화면(Suspense의 fallback)을 대신 보여줍니다. (예: "로딩 중...")
        4. "약속이 끝났다! (데이터 도착!)"
        5. React는 중단했던 컴포넌트 렌더링을 다시 시작하고, use()는 프로미스 안에 있던 실제 데이터(포켓몬 정보)를
           pokemon 변수에 쏙 넣어줍니다.

  결과적으로, 개발자는 비동기 코드를 마치 동기 코드처럼 간단하게 작성할 수 있습니다.

  use()가 없던 시절에는 로딩 상태(isLoading), 데이터 상태(data), 에러 상태(error)를 모두 useState로 직접 관리하고
  useEffect 안에서 데이터를 가져와야 해서 코드가 복잡했습니다. use()는 이 모든 과정을 React에 맡겨버리는 것입니다.

  꼭 기억해야 할 점!
  1. `Suspense`가 필수: use()로 프로미스를 사용하려면, 반드시 컴포넌트 상위 어딘가에 <Suspense fallback={<p>로딩
     중...</p>}>으로 감싸줘야 합니다. React가 기다리는 동안 보여줄 화면이 필요하기 때문입니다.
  2. 캐싱(Caching) 주의: use()는 렌더링될 때마다 동일한 "약속(프로미스)"을 받아야 합니다. 그렇지 않으면 매번 새로운
     약속으로 인식해서 무한 로딩에 빠질 수 있습니다.
 */
