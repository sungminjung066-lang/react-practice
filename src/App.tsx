import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@/components/Header';
import Home from '@/pages/Home';
import ContextAPI from '@/pages/lectures/lecture01/ContextApi';
import PropsDrilling from '@/pages/lectures/lecture01/PropsDrilling';
import StateProps from '@/pages/lectures/lecture01/StateProps';
import StateManagement from '@/pages/lectures/lecture02/StateManagement';
import Exercise01 from '@/pages/lectures/lecture03-exercise/exercise01/TodoApp';
import ActionStateExample from '@/pages/lectures/lecture03/ActionStateExample';
import SeoExample from '@/pages/lectures/lecture03/SeoExample';
import UseExample from '@/pages/lectures/lecture03/UseExample';
import StateRefCompare from '@/pages/lectures/lecture04/StateRefCompare';
import UseRefExample from '@/pages/lectures/lecture04/UseRefExample';
import RouterExample from '@/pages/lectures/lecture05/RouterExample';
import UseCallbackExample from '@/pages/lectures/lecture06/UseCallbackExample';
import UseMemoExample from '@/pages/lectures/lecture06/UseMemoExample';
import ConditionalRendering from '@/pages/lectures/lecture07/ConditionalRendering';
import ConditionalRenderingLogical from '@/pages/lectures/lecture07/ConditionalRenderingLogical';
import ConditionalRenderingTernary from '@/pages/lectures/lecture07/ConditionalRenderingTernary';
import Exercise02 from '@/pages/lectures/lecture09-exercise/exercise02/UserListApp';
import MemoVsEffect from '@/pages/lectures/lecture09/MemoVsEffect';
import UseEffectExample from '@/pages/lectures/lecture09/UseEffectExample';
import LazyInitializationExample from '@/pages/lectures/lecture10/LazyInitialization';
import FragmentExample from '@/pages/lectures/lecture13/FragmentExample';
import JsxSyntaxExample from '@/pages/lectures/lecture14/JsxSyntaxExample';
import Exercise03 from '@/pages/lectures/lecture15-exercise/exercise03/ThemeApp';
import UseContextExample from '@/pages/lectures/lecture15/UseContextExample';
import CssModulesExample from '@/pages/lectures/lecture16/CssModulesExample';
import TailwindCssExample from '@/pages/lectures/lecture16/TailwindCssExample';
import EventHandlingExample from '@/pages/lectures/lecture18/EventHandlingExample';
import KeyPropExample from '@/pages/lectures/lecture19/KeyPropExample';
import ProductPage from '@/pages/lectures/lecture20/ProductPage';
import Exercise04 from '@/pages/lectures/lecture22-exercise/exercise04/CustomHooksDemo';
import CustomHookExample from '@/pages/lectures/lecture22/CustomHookExample';
import LifecycleExample from '@/pages/lectures/lecture23/LifecycleExample';
import HookFlowExample from '@/pages/lectures/lecture24/HookFlowExample';
import CompositionExample from '@/pages/lectures/lecture25/CompositionExample';
import Exercise05 from '@/pages/lectures/lecture26-exercise/exercise05/ShoppingApp';
import UseEffectExample2 from '@/pages/lectures/lecture26/UseEffectExample';
import BasicFormExample from '@/pages/lectures/lecture27/BasicFormExample';
import ComplexFormExample from '@/pages/lectures/lecture27/ComplexFormExample';
import DynamicFieldsExample from '@/pages/lectures/lecture27/DynamicFieldsExample';
import ValidationExample from '@/pages/lectures/lecture27/ValidationExample';
import WatchExample from '@/pages/lectures/lecture27/WatchExample';
import BasicQueryExample from '@/pages/lectures/lecture28/BasicQueryExample';
import MutationExample from '@/pages/lectures/lecture28/MutationExample';
import OptimisticUpdateExample from '@/pages/lectures/lecture28/OptimisticUpdateExample';
import PaginationExample from '@/pages/lectures/lecture28/PaginationExample';
import QueryKeysExample from '@/pages/lectures/lecture28/QueryKeysExample';
import ZustandExample from '@/pages/lectures/lecture29/ZustandExample';

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-7xl px-4">
        <Header />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lecture/1-1" element={<StateProps />} />
            <Route path="/lecture/1-2" element={<PropsDrilling />} />
            <Route path="/lecture/1-3" element={<ContextAPI />} />
            <Route path="/lecture/2" element={<StateManagement />} />
            <Route path="/lecture/3-1" element={<SeoExample />} />
            <Route path="/lecture/3-2" element={<ActionStateExample />} />
            <Route path="/lecture/3-3" element={<UseExample />} />
            <Route path="/lecture/4-1" element={<UseRefExample />} />
            <Route path="/lecture/4-2" element={<StateRefCompare />} />
            <Route path="/lecture/5/*" element={<RouterExample />} />
            <Route path="/lecture/6-1" element={<UseCallbackExample />} />
            <Route path="/lecture/6-2" element={<UseMemoExample />} />
            <Route path="/lecture/7-1" element={<ConditionalRendering />} />
            <Route path="/lecture/7-2" element={<ConditionalRenderingTernary />} />
            <Route path="/lecture/7-3" element={<ConditionalRenderingLogical />} />
            <Route path="/lecture/9-1" element={<UseEffectExample />} />
            <Route path="/lecture/9-2" element={<MemoVsEffect />} />
            <Route path="/lecture/10" element={<LazyInitializationExample />} />
            <Route path="/lecture/13" element={<FragmentExample />} />
            <Route path="/lecture/14" element={<JsxSyntaxExample />} />
            <Route path="/lecture/15" element={<UseContextExample />} />
            <Route path="/lecture/16-1" element={<CssModulesExample />} />
            <Route path="/lecture/16-2" element={<TailwindCssExample />} />
            <Route path="/lecture/18" element={<EventHandlingExample />} />
            <Route path="/lecture/19" element={<KeyPropExample />} />
            <Route path="/lecture/20" element={<ProductPage />} />
            <Route path="/lecture/22" element={<CustomHookExample />} />
            <Route path="/lecture/23" element={<LifecycleExample />} />
            <Route path="/lecture/24" element={<HookFlowExample />} />
            <Route path="/lecture/25" element={<CompositionExample />} />
            <Route path="/lecture/26" element={<UseEffectExample2 />} />
            <Route path="/lecture/27-1" element={<BasicFormExample />} />
            <Route path="/lecture/27-2" element={<ValidationExample />} />
            <Route path="/lecture/27-3" element={<WatchExample />} />
            <Route path="/lecture/27-4" element={<DynamicFieldsExample />} />
            <Route path="/lecture/27-5" element={<ComplexFormExample />} />
            <Route path="/lecture/28-1" element={<BasicQueryExample />} />
            <Route path="/lecture/28-2" element={<MutationExample />} />
            <Route path="/lecture/28-3" element={<PaginationExample />} />
            <Route path="/lecture/28-4" element={<QueryKeysExample />} />
            <Route path="/lecture/28-5" element={<OptimisticUpdateExample />} />
            <Route path="/lecture/29" element={<ZustandExample />} />
            <Route path="/lecture/3-exercise/exercise01" element={<Exercise01 />} />
            <Route path="/lecture/9-exercise/exercise02" element={<Exercise02 />} />
            <Route path="/lecture/15-exercise/exercise03" element={<Exercise03 />} />
            <Route path="/lecture/22-exercise/exercise04" element={<Exercise04 />} />
            <Route path="/lecture/26-exercise/exercise05" element={<Exercise05 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
