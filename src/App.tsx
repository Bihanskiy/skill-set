import React, { lazy, Suspense, useEffect } from 'react';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Spinner from './components/spinner/spinner.component';
import MainLayout from './layouts/main/main.layout';
import {
  Routes,
  Route,
} from 'react-router-dom';
import LocalStorageService from './services/local-storage.service';
import AuthService from './services/auth.service';
import { useRequest } from './hooks/useRequest';

const MainPage = lazy(() => import('./pages/main/main.page'));

const CourseDetailsPage = lazy(
  () => import('./pages/course-details/course-details.page')
);

function App() {
  const {
    loading: isAuthLoading,
    request: requestAuth,
  } = useRequest(AuthService.GetToken);

  const fetchAuth = async () => {
    const authResponse = await requestAuth();

    if (!authResponse?.error) {
      LocalStorageService.setItem("token", authResponse.data?.token)
    }
  }

  useEffect(() => {
    const isHasKey = LocalStorageService.hasKey("token");
    if (!isHasKey) {
      fetchAuth();
    }
  }, [])

  if (isAuthLoading) {
    return (
      <Spinner />
    )
  }


  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <MainLayout>
            <Routes>
              <Route path={"/"} element={<MainPage />} />
              <Route path={"/course/:id"} element={<CourseDetailsPage />} />
            </Routes>
          </MainLayout>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
