import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

const SymbolsView = lazy(() => import('@/components/SymbolsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));
const StatementsView = lazy(() => import('@/components/StatementsView'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
