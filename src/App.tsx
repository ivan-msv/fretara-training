import { EnquiriesPage } from './pages/EnquiriesPage'
import { EnquiryDetailsPage } from './pages/EnquiryDetailsPage'
import { records } from './pages/enquiriesData'
import { QuotationDetailsPage } from './pages/QuotationDetailsPage'
import type { QuotationState } from './pages/quotationData'

function App() {
  const quotationMatch = window.location.pathname.match(/^\/quotations\/(single|multi|partial)\/?$/)
  if (quotationMatch) return <QuotationDetailsPage state={quotationMatch[1] as QuotationState} />
  const match = window.location.pathname.match(/^\/enquiries\/([^/]+)\/?$/)
  const record = match && records.find(item => item.id === decodeURIComponent(match[1]))
  return record ? <EnquiryDetailsPage record={record} /> : <EnquiriesPage />
}

export default App
