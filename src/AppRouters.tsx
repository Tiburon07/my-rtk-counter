import { Routes, Route, Navigate } from "react-router-dom";
//import ItemsListPage from "./pages/ItemsListPage";
//import NewItemPage from "./pages/NewItemPage";
//import ItemDetailPage from "./pages/ItemDetailPage";
import { lazy, Suspense } from "react";

const ItemsListPage = lazy(() => import("./pages/ItemsListPage"));
const NewItemPage = lazy(() => import("./pages/NewItemPage"));
const ItemDetailPage = lazy(() => import("./pages/ItemDetailPage"));

export function AppRoutes() {/*
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
*/
return (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Navigate to="/items" replace />} />
      <Route path="/items" element={<ItemsListPage />} />
      <Route path="/items/new" element={<NewItemPage />} />
      <Route path="/items/:id" element={<ItemDetailPage />} />
      <Route path="*" element={<p style={{ padding: 24 }}>404</p>} />
    </Routes>
  </Suspense>
  );
}