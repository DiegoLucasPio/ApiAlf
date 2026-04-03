import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ReportProvider } from './contexts/ReportContext';

export default function App() {
  return (
    <ReportProvider>
      <RouterProvider router={router} />
    </ReportProvider>
  );
}