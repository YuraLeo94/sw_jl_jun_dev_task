import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './utils/images/selectArrow.svg';
import { route } from './utils/types/global';

const ProductList = lazy(() => import('./components/ProductList/ProductList'));
const AddProduct = lazy(() => import('./components/AddProduct/AddProduct'));
const Footer = lazy(() => import('./components/Footer'));

function App(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='px-4 d-flex flex-column h-100'>
          <Routes>
            <Route index path={route.HOME} element={
              <Suspense fallback={<>Loading...</>}>
                <ProductList />
              </Suspense>
            } />
            <Route path={route.ADD_PRODUCT} element={
              <Suspense fallback={<>Loading...</>}>
                <AddProduct />
              </Suspense>
            } />
          </Routes>
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
