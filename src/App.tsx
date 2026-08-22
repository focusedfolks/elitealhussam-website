import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Packages } from './pages/PackagesPages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="packages" element={<Packages />} />
          <Route path="hajj" element={<Navigate to="/packages" replace />} />
          <Route path="umrah" element={<Navigate to="/packages" replace />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
