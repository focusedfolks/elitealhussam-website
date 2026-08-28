import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './admin/AdminAuth'
import { ProtectedAdmin } from './admin/ProtectedAdmin'
import { AdminBlogEdit, AdminBlogList } from './admin/pages/AdminBlog'
import { AdminDashboard } from './admin/pages/AdminDashboard'
import { AdminLeads } from './admin/pages/AdminLeads'
import { AdminLogin } from './admin/pages/AdminLogin'
import { AdminPackageEdit, AdminPackagesList } from './admin/pages/AdminPackages'
import { AdminAbout, AdminCompany } from './admin/pages/AdminSettings'
import { AdminTestimonials } from './admin/pages/AdminTestimonials'
import { CmsProvider } from './cms/CmsProvider'
import { Layout } from './components/Layout'
import { RouteReset } from './components/RouteReset'
import { CurrencyProvider } from './currency'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Packages } from './pages/PackagesPages'
import { Pricing } from './pages/Pricing'
import { Analytics } from './components/Analytics'

function PublicLayout() {
  return (
    <CmsProvider>
      <Layout />
    </CmsProvider>
  )
}

export default function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <RouteReset />
        <Analytics />
        <AdminAuthProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdmin />}>
              <Route index element={<AdminDashboard />} />
              <Route path="packages" element={<AdminPackagesList />} />
              <Route path="packages/:id" element={<AdminPackageEdit />} />
              <Route path="blog" element={<AdminBlogList />} />
              <Route path="blog/:id" element={<AdminBlogEdit />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="company" element={<AdminCompany />} />
              <Route path="about" element={<AdminAbout />} />
            </Route>

            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="packages" element={<Packages />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="hajj" element={<Navigate to="/packages" replace />} />
              <Route path="umrah" element={<Navigate to="/packages" replace />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </CurrencyProvider>
  )
}
