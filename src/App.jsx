import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import CompaniesPage from './pages/CompaniesPage'
import CompanyPage from './pages/CompanyPage'
import PipelinePage from './pages/PipelinePage'
import DealPage from './pages/DealPage'
import ReportsPage from './pages/ReportsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/people" element={<Layout><PeoplePage /></Layout>} />
        <Route path="/people/:id" element={<Layout><PersonPage /></Layout>} />
        <Route path="/companies" element={<Layout><CompaniesPage /></Layout>} />
        <Route path="/companies/:id" element={<Layout><CompanyPage /></Layout>} />
        <Route path="/pipeline" element={<Layout><PipelinePage /></Layout>} />
        <Route path="/deals/:id" element={<Layout><DealPage /></Layout>} />
        <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
