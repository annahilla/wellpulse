import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import MapPage from "./pages/MapPage";
import ProgressPage from "./pages/ProgressPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
    </Routes>
  );
}

export default App;
