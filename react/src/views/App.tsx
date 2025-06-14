import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../constants';
import { selectFinalDataTkb, useTkbStore } from '../zus';
import { colors } from '../theme';
import ErrorBoundary from './components/ErrorBoundary';
import ModernLayout from '../components/Layout/ModernLayout';
import NeedStep1Warning from './components/NeedStep1';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Lazy load components
const LandingPage = lazy(() => import('../components/LandingPage'));
const ChonFileExcel = lazy(() => import('./1ChonFileExcel'));
const XepLop = lazy(() => import('./2XepLop'));
const KetQua = lazy(() => import('./3KetQua'));



function App() {
  const dataTkb = useTkbStore(selectFinalDataTkb);

  // Custom loading component
  const LoadingFallback = () => (
    <LinearProgress 
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 3,
        backgroundColor: colors.primary[100],
        '& .MuiLinearProgress-bar': {
          background: colors.gradients.primary,
        }
      }} 
    />
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.background.default }}>
      <ErrorBoundary>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Route component={ScrollToTop} />
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              {/* Landing Page */}
              <Route exact path="/" component={LandingPage} />
              
              {/* Special redirect route */}
              <Route
                path="/b1e7x6f66mkd"
                component={() => {
                  window.location.href = 'https://b1e7x6f66mkd.ddns.dataunlocker.com';
                  return null;
                }}
              />

              {/* App Routes with ModernLayout */}
              <Route
                path={ROUTES._1ChonFileExcel.path}
                render={() => (
                  <ModernLayout
                    title="Upload File Excel"
                    subtitle="Tải lên file danh sách môn học để bắt đầu quá trình xếp lịch"
                  >
                    <ChonFileExcel />
                  </ModernLayout>
                )}
              />

              <Route
                path={ROUTES._2XepLop.path}
                render={() => (
                  <ModernLayout
                    title="Xếp lịch thông minh"
                    subtitle="AI sẽ giúp bạn tối ưu hóa thời khóa biểu và tránh xung đột"
                  >
                    {dataTkb.length ? <XepLop /> : <NeedStep1Warning />}
                  </ModernLayout>
                )}
              />

              <Route
                path={ROUTES._3KetQua.path}
                render={() => (
                  <ModernLayout
                    title="Kết quả & Script"
                    subtitle="Xem thời khóa biểu cuối cùng và tải script tự động đăng ký"
                  >
                    {dataTkb.length ? <KetQua /> : <NeedStep1Warning />}
                  </ModernLayout>
                )}
              />

              {/* Fallback redirect */}
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </Box>
  );
}

export default App;
