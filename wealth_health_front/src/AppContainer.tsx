import { useState, lazy, Suspense } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { persistor } from "./store/store";
import SplashScreen from "./components/SplashScreen";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages
const CreateEmployeePage = lazy(() => import("./pages/CreateEmployeePage"));
const EmployeeListPage = lazy(() => import("./pages/EmployeeListPage"));

function AppContainer() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<CreateEmployeePage />} />
            <Route path="/employee-list" element={<EmployeeListPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  );
}

export default AppContainer;
