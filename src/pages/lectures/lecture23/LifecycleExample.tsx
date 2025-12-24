/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';

// --- 클래스 컴포넌트의 주요 라이프사이클 ---
// React 16.3 이후 버전 기준, 현재는 함수형 컴포넌트와 Hook을 사용하는 것이 권장되지만,
// 기존 코드베이스 유지보수 및 React의 작동 원리 이해를 위해 알아두는 것이 좋습니다.

interface LifecycleComponentState {
  count: number;
  date: Date;
}

class LifecycleComponent extends React.Component<{}, LifecycleComponentState> {
  private timerID: number | undefined;

  // 1. Mounting (마운팅): 컴포넌트가 생성되어 DOM에 삽입될 때
  // ----------------------------------------------------

  // constructor: 컴포넌트가 생성될 때 가장 먼저 호출됩니다.
  // state 초기화, 이벤트 핸들러 바인딩 작업을 합니다.
  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
      date: new Date(),
    };
    console.log('1. constructor: 컴포넌트 생성');
  }

  // render: UI를 렌더링합니다. 마운팅과 업데이트 시에 모두 호출됩니다.
  render() {
    console.log('2. render: UI 렌더링');
    return (
      <div className="rounded-lg border-2 border-blue-500 p-4">
        <h2 className="text-xl font-bold">Lifecycle Component</h2>
        <p>현재 시간: {this.state.date.toLocaleTimeString()}</p>
        <p>카운트: {this.state.count}</p>
        <button
          onClick={() => this.setState({ count: this.state.count + 1 })}
          className="mt-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
        >
          카운트 증가
        </button>
      </div>
    );
  }

  // componentDidMount: 컴포넌트가 DOM에 마운트된 직후에 호출됩니다.
  // 주로 외부 데이터 로딩(API 호출), DOM 조작, 타이머 설정 등 부수 효과(Side Effect) 작업을 수행합니다.
  componentDidMount() {
    console.log('3. componentDidMount: DOM에 마운트됨');
    this.timerID = window.setInterval(() => this.tick(), 1000);
  }

  // 2. Updating (업데이트): props나 state가 변경될 때
  // ----------------------------------------------------

  // componentDidUpdate: 컴포넌트가 업데이트된 직후에 호출됩니다. (최초 렌더링 시에는 호출되지 않음)
  // 이전 props, state에 접근할 수 있어, 조건에 따라 부수 효과를 수행할 때 유용합니다.
  componentDidUpdate(prevProps: {}, prevState: LifecycleComponentState) {
    console.log('4. componentDidUpdate: 컴포넌트 업데이트됨');
    if (prevState.count !== this.state.count) {
      console.log(`  - count가 ${prevState.count}에서 ${this.state.count}로 변경됨`);
    }
  }

  // 3. Unmounting (언마운팅): 컴포넌트가 DOM에서 제거될 때
  // ----------------------------------------------------

  // componentWillUnmount: 컴포넌트가 언마운트되기 직전에 호출됩니다.
  // componentDidMount에서 설정한 타이머, 구독, 네트워크 요청 등을 정리(cleanup)하는 작업을 합니다.
  componentWillUnmount() {
    console.log('5. componentWillUnmount: DOM에서 제거될 예정');
    if (this.timerID) {
      clearInterval(this.timerID);
      console.log('  - 타이머 정리 완료');
    }
  }

  // 클래스 내부에서 사용하는 메소드
  tick() {
    this.setState({
      date: new Date(),
    });
  }
}

// --- 부모 컴포넌트 ---
// LifecycleComponent를 마운트/언마운트 시키는 역할을 합니다.
class LifecycleExample extends React.Component<{}, { showComponent: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showComponent: true,
    };
  }

  toggleComponent = () => {
    this.setState((prevState) => ({
      showComponent: !prevState.showComponent,
    }));
  };

  render() {
    return (
      <div className="p-8">
        <h1 className="mb-6 text-3xl font-bold">클래스 컴포넌트 라이프사이클 예제</h1>
        <p className="mb-4">브라우저의 콘솔을 열어 라이프사이클 메소드 호출 순서를 확인하세요.</p>
        <button
          onClick={this.toggleComponent}
          className="mb-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          컴포넌트 {this.state.showComponent ? '언마운트' : '마운트'}
        </button>
        {this.state.showComponent && <LifecycleComponent />}
      </div>
    );
  }
}

export default LifecycleExample;
