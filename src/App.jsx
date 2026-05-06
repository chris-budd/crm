import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import CompaniesPage from './pages/CompaniesPage'
import CompanyPage from './pages/CompanyPage'
import PipelinePage from './pages/PipelinePage'
import DealPage from './pages/DealPage'

const theme = {
  token: {
    colorPrimary: '#FF7A59',
    colorSuccess: '#00BDA5',
    colorWarning: '#F5C26B',
    colorError: '#F2545B',
    colorInfo: '#0091AE',
    colorBgContainer: '#FFFFFF',
    colorBgLayout: '#F5F8FA',
    colorBgElevated: '#EAF0F6',
    colorText: '#33475B',
    colorTextSecondary: '#516F90',
    colorTextDescription: '#99ACC2',
    colorBorder: '#DFE3EB',
    colorBorderSecondary: '#DFE3EB',
    borderRadius: 8,
    borderRadiusSM: 5,
    fontFamily: "'Lexend', sans-serif",
    fontSize: 13,
    lineHeight: 1.5,
    boxShadow: '0 2px 8px rgba(45,62,80,0.08), 0 0 0 1px #DFE3EB',
    boxShadowSecondary: '0 4px 16px rgba(45,62,80,0.12), 0 0 0 1px #DFE3EB',
  },
  components: {
    Table: {
      headerBg: '#EAF0F6',
      headerColor: '#99ACC2',
      headerSortActiveBg: '#EAF0F6',
      rowHoverBg: '#F5F8FA',
      borderColor: '#DFE3EB',
      headerBorderRadius: 0,
    },
    Card: {
      paddingLG: 20,
    },
    Button: {
      fontWeight: 500,
    },
    Input: {
      activeBorderColor: 'rgba(255,122,89,0.5)',
      activeShadow: '0 0 0 2px rgba(255,122,89,0.1)',
      hoverBorderColor: '#99ACC2',
    },
    Tabs: {
      inkBarColor: '#FF7A59',
      itemActiveColor: '#FF7A59',
      itemSelectedColor: '#FF7A59',
      itemHoverColor: '#516F90',
    },
    Tag: {
      defaultBg: '#EAF0F6',
      defaultColor: '#516F90',
    },
    Progress: {
      defaultColor: '#FF7A59',
    },
    Statistic: {
      titleFontSize: 11,
      contentFontSize: 32,
    },
  },
}

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/people" element={<Layout><PeoplePage /></Layout>} />
          <Route path="/people/:id" element={<Layout><PersonPage /></Layout>} />
          <Route path="/companies" element={<Layout><CompaniesPage /></Layout>} />
          <Route path="/companies/:id" element={<Layout><CompanyPage /></Layout>} />
          <Route path="/pipeline" element={<Layout><PipelinePage /></Layout>} />
          <Route path="/deals/:id" element={<Layout><DealPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}
