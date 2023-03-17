import React, { lazy, Suspense } from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';
import MainLayout from './layouts/main/main.layout';
import {
  Routes,
  Route,
} from 'react-router-dom';

const MainPage = lazy(() => import('./pages/main/main.page'));

const CourseDetailsPage = lazy(
  () => import('./pages/course-details/course-details.page')
);

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <MainLayout>
            <Routes>
              <Route path={"/"} element={<MainPage />} />
              <Route path={"/course/:productId"} element={<CourseDetailsPage />} />
            </Routes>
          </MainLayout>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
