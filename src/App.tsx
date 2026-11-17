import { EnquiriesPage } from './pages/EnquiriesPage'
import { EnquiryDetailsPage } from './pages/EnquiryDetailsPage'
import { CustomerDetailsPage } from './pages/CustomerDetailsPage'
import { CustomerManagementPage } from './pages/CustomerManagementPage'
import { records } from './pages/enquiriesData'
import { QuotationDetailsPage } from './pages/QuotationDetailsPage'
import type { QuotationState } from './pages/quotationData'

function App() {
  const customerMatch = window.location.pathname.match(/^\/customers\/([^/]+)\/?$/)
  if (customerMatch) return <CustomerDetailsPage customerId={decodeURIComponent(customerMatch[1])} />
  if (/^\/customers\/?$/.test(window.location.pathname)) return <CustomerManagementPage />
  const quotationMatch = window.location.pathname.match(/^\/quotations\/(single|multi|partial)\/?$/)
  if (quotationMatch) return <QuotationDetailsPage state={quotationMatch[1] as QuotationState} />
  const match = window.location.pathname.match(/^\/enquiries\/([^/]+)\/?$/)
  const record = match && records.find(item => item.id === decodeURIComponent(match[1]))
  return record ? <EnquiryDetailsPage record={record} /> : <EnquiriesPage />
}

export default App
