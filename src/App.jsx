import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ToolShell from './components/ToolShell.jsx'
import Home from './pages/Home.jsx'
import { About, Privacy, Terms, Contact, NotFound } from './pages/Static.jsx'
import { TOOL_COMPONENTS } from './pages/Tools.jsx'
import { getTool } from './lib/tools.js'

function ToolRoute() {
  const { slug } = useParams()
  const tool = getTool(slug)
  const Comp = TOOL_COMPONENTS[slug]
  if (!tool || !Comp) return <Navigate to="/404" replace />
  return (
    <ToolShell tool={tool}>
      <Comp />
    </ToolShell>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/:slug" element={<ToolRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
