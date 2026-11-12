import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Dropdown } from '../components/Dropdown'
import { Input } from '../components/Input'
import { Navbar } from '../components/Navbar'
import { PageHeader } from '../components/PageHeader'
import { Sidebar } from '../components/Sidebar'
import { StatusBadge } from '../components/StatusBadge'
import { Table, TableCell, TableHeaderCell, TableRow, TableText } from '../components/Table'
import { BulletedListIcon } from '../icons/line/BulletedListIcon'
import { CalendarBlankIcon } from '../icons/line/CalendarBlankIcon'
import { ChevronDownIcon } from '../icons/line/ChevronDownIcon'
import { ChevronUpIcon } from '../icons/line/ChevronUpIcon'
import { ClockDashIcon } from '../icons/line/ClockDashIcon'
import { DeleteIcon } from '../icons/line/DeleteIcon'
import { Dollar2Icon } from '../icons/line/Dollar2Icon'
import { EditIcon } from '../icons/line/EditIcon'
import { LayersIcon } from '../icons/line/LayersIcon'
import { PaperIcon } from '../icons/line/PaperIcon'
import { PlusIcon } from '../icons/line/PlusIcon'
import { UserPersonrIcon } from '../icons/line/UserPersonrIcon'
import { UsersIcon } from '../icons/line/UsersIcon'
import { EmailThreads } from './EmailThreads'
import { records, type EnquiryRecord, type Option } from './enquiriesData'
import './EnquiryDetailsPage.css'
import './QuotationDetailsPage.css'

type Freight = { weight: string; length: string; width: string; height: string; quantity: string }
const initialFreight: Freight = { weight: '30', length: '80', width: '100', height: '100', quantity: '1' }
const navigation = [
  { id: 'quotations', label: 'Quotations', href: '/', icon: <BulletedListIcon /> },
  { id: 'margins', label: 'Margins', href: '#margins', icon: <Dollar2Icon /> },
  { id: 'customers', label: 'Customers', href: '#customers', icon: <UsersIcon /> },
]
const charges = [
  ['Freight Charges', '$1,860.00AUD'], ['Fuel levy', '$618.08AUD'], ['Rubbish Removal Per Cbm', '$98.59AUD'],
  ['Vic/Sa/Qld/Wa/Nt/Tas Tipping Fee (Min 0.25 Tonne)', '$112.50AUD'], ['Additional', '$10.00'],
]
const surchargeOptions = ['Dangerous Goods', 'Express Service', 'Induction', 'Saturday', 'Sunday', 'Public Holiday']
const additionalOptions = [
  ['Assembly', '$40.00 · per hour'], ['Install', '$150.00 · per hour'], ['Project Management', '$30.00 · per week'],
  ['Additional Man - Business Hours', '$65.00 · per hour'], ['Additional Man - Out of Business Hours', '$97.50 · per hour'],
  ['Detention - per truck', '$120.00 · per hour'], ['Rubbish Removal per cbm', ''], ['Rubbish Removal per pallet', '$65.00 · per pallet'],
  ['VIC/SA/QLD/WA/NT/TAS - Tipping Fee (Min 0.25 Tonne)', '$450.00 · per tonne'],
  ['NSW/ACT - Tipping Fee (Min 0.25 Tonne)', '$550.00 · per tonne'], ['Pallet Supply', '$35.00 · per pallet'],
  ['Wrapping 15 - 24 cbm', '$325.00 · per job'], ['Wrapping 25 - 34 cbm', '$455.00 · per job'],
  ['Wrapping 35+ cbm', '$680.00 · per job'], ['Truck Onsite Hourly Rate', '$120.00 · per hour'],
  ['Accommodation and LAHA', '$310.00 · per night'],
] as const
const detailFields = {
  collection: [['Source', 'Australia, Street 1, Kylsyth 3137, VIC'], ['Collection method', 'Forklift'], ['Pickup date', '29, 10, 2026'], ['Pickup time', 'Saturday']],
  delivery: [['Destination', '12 Koala Drive, Wallaby Creek, NSW 2000'], ['Collection method', 'Forklift'], ['Delivery date', '29, 10, 2026'], ['Delivery time', 'Business hours']],
}

export function OptionCard({ option, totalOptions, jobReference, onConvert, showQuoteStatus = false }: { option: Option; index: number; totalOptions: number; jobReference: string; onConvert: (id: string) => void; showQuoteStatus?: boolean }) {
  const [expanded, setExpanded] = useState(true)
  const [freight, setFreight] = useState(initialFreight)
  const [, setSaved] = useState(initialFreight)
  const [extraItems, setExtraItems] = useState(0)
  const [chargesOpen, setChargesOpen] = useState(false)
  const [selectedCharges, setSelectedCharges] = useState<string[]>([])
  const [customCharges, setCustomCharges] = useState<string[]>([])
  const [editing, setEditing] = useState<Set<string>>(new Set())
  const toggleCharge = (label: string) => setSelectedCharges(current => current.includes(label) ? current.filter(item => item !== label) : [...current, label])
  const toggleEditing = (section: string, focusId: string) => {
    setEditing(current => { const next = new Set(current); if (next.has(section)) next.delete(section); else next.add(section); return next })
    requestAnimationFrame(() => document.getElementById(focusId)?.focus())
  }
  const addCustomCharge = () => {
    const label = `Custom additional ${customCharges.length + 1}`
    setCustomCharges(current => [...current, label])
    setSelectedCharges(current => [...current, label])
  }
  const converted = Boolean(option.quotationReference)
  return <article className="enquiry-details__option">
    <div className="enquiry-details__option-summary"><strong>{totalOptions > 1 ? option.quotationReference ?? option.enquiryReference : 'Quote'}</strong><StatusBadge type="badge" status={converted ? 'blue' : 'neutral'} label={converted ? option.quotationStatus ?? 'Draft' : 'Open enquiry'} showDot={false} showLeadingIcon={false} />{totalOptions > 1 && !converted && <Button type="button" variant="secondary" onClick={() => onConvert(option.id)}>Generate Quote</Button>}</div>
    <div className="enquiry-details__dates" data-three-columns={showQuoteStatus}><div><strong>10th Sep, 2026 | 10:30 AM</strong><span>Creation date</span></div><div><strong>15th Oct, 2026</strong><span>Valid until</span></div>{showQuoteStatus && <div><strong className="enquiry-details__status-select">● Draft <ChevronDownIcon width={14} height={14} /></strong><span>Last seen 10th Sep, 2026 | 10:30 AM</span></div>}</div>
    <div className="enquiry-details__places">{(['collection', 'delivery'] as const).map(kind => <section className="enquiry-details__card" key={kind}><div className="enquiry-details__card-heading"><h4>{kind === 'collection' ? 'Collection details' : 'Delivery details'}</h4><button type="button" aria-pressed={editing.has(kind)} onClick={() => toggleEditing(kind, `${option.id}-${kind}-0`)}><EditIcon width={14} height={14} /> {editing.has(kind) ? 'Done' : 'Edit'}</button></div><dl>{detailFields[kind].map(([label, value], fieldIndex) => <div key={label}><dt>{label}</dt><dd className={label.includes('date') ? 'enquiry-details__date-field' : undefined}><input id={`${option.id}-${kind}-${fieldIndex}`} aria-label={`${label} for ${option.label}`} defaultValue={value} readOnly={!editing.has(kind)} />{label.includes('date') && <CalendarBlankIcon width={16} height={16} aria-hidden="true" />}</dd></div>)}</dl></section>)}</div>
    <div className="enquiry-details__items"><Table aria-label={`Items for ${option.label}`} density="compact"><thead><tr><TableHeaderCell>Description</TableHeaderCell><TableHeaderCell>Item type</TableHeaderCell><TableHeaderCell>Total price</TableHeaderCell><TableHeaderCell><span aria-label="Actions">•••</span></TableHeaderCell></tr></thead><tbody><TableRow><TableCell><TableText icon={<PaperIcon />}>Pallet 1</TableText></TableCell><TableCell>$100</TableCell><TableCell>$1,664.50</TableCell><TableCell><div className="enquiry-details__item-actions"><button type="button" aria-label="Remove extra item" disabled={!extraItems} onClick={() => setExtraItems(count => count - 1)}><DeleteIcon width={18} height={18} /></button><button type="button" aria-label={expanded ? 'Collapse pallet' : 'Expand pallet'} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <ChevronUpIcon width={18} height={18} /> : <ChevronDownIcon width={18} height={18} />}</button></div></TableCell></TableRow>{Array.from({ length: extraItems }, (_, extraIndex) => <TableRow key={extraIndex}><TableCell>Pallet {extraIndex + 2}</TableCell><TableCell>$100</TableCell><TableCell>$1,664.50</TableCell><TableCell><button type="button" aria-label={`Remove pallet ${extraIndex + 2}`} onClick={() => setExtraItems(count => count - 1)}><DeleteIcon width={18} height={18} /></button></TableCell></TableRow>)}</tbody></Table>{expanded && <div className="enquiry-details__freight">{(['weight', 'length', 'width', 'height'] as const).map(field => <Input key={field} label={field[0].toUpperCase() + field.slice(1)} type="number" min="1" value={freight[field]} onChange={event => setFreight({ ...freight, [field]: event.target.value })} unit={field === 'weight' ? 'kg' : 'm'} />)}<Dropdown label="Quantity" options={[1, 2, 3, 4, 5].map(value => ({ value: String(value), label: String(value) }))} value={freight.quantity} onValueChange={quantity => setFreight({ ...freight, quantity })} /><Button type="button" onClick={() => setSaved(freight)}>Save</Button><span>Volume (CBM) 1.800 m³</span></div>}<div className="enquiry-details__add-row"><Button type="button" variant="tertiary" leadingIcon={<PlusIcon width={16} height={16} />} onClick={() => setExtraItems(count => count + 1)}>Add</Button></div><div className="enquiry-details__items-footer"><span>Total CBM <strong>1.800 m³</strong></span><span>Total weight <strong>120 kg</strong></span></div></div>
    <section className="enquiry-details__card enquiry-details__charges"><div className="enquiry-details__card-heading"><h4>Charge breakdown</h4><button type="button" aria-pressed={editing.has('charges')} onClick={() => toggleEditing('charges', `${option.id}-charge-0`)}><EditIcon width={14} height={14} /> {editing.has('charges') ? 'Done' : 'Edit'}</button></div><table><thead><tr><th>Item</th><th>Amount (AUD)</th></tr></thead><tbody>{charges.map(([label, amount], chargeIndex) => <tr key={label}><td>{label}</td><td><input id={`${option.id}-charge-${chargeIndex}`} aria-label={`${label} amount`} defaultValue={amount} readOnly={!editing.has('charges')} /></td></tr>)}{selectedCharges.map(label => <tr key={label}><td>{label}</td><td><input aria-label={`${label} amount`} defaultValue="$0.00" readOnly={!editing.has('charges')} /></td></tr>)}</tbody></table><div className="enquiry-details__surcharge"><Button type="button" variant="secondary" leadingIcon={<PlusIcon width={14} height={14} />} trailingIcon={chargesOpen ? <ChevronUpIcon width={14} height={14} /> : <ChevronDownIcon width={14} height={14} />} aria-expanded={chargesOpen} aria-controls={`${option.id}-charge-options`} onClick={() => setChargesOpen(open => !open)}>Surcharges and Additionals</Button></div>
      {chargesOpen && <div className="enquiry-details__charge-picker" id={`${option.id}-charge-options`}>
        <Button type="button" variant="secondary" shape="pill" leadingIcon={<PlusIcon width={14} height={14} />} onClick={addCustomCharge}>Custom additional</Button>
        <div className="enquiry-details__charge-group"><h5>Surcharges</h5><div>{surchargeOptions.map(label => <button key={label} type="button" aria-pressed={selectedCharges.includes(label)} onClick={() => toggleCharge(label)}>{label}</button>)}</div></div>
        <div className="enquiry-details__charge-group"><h5>Additionals</h5><div>{[...additionalOptions, ...customCharges.map(label => [label, ''] as const)].map(([label, rate]) => <button key={label} type="button" aria-pressed={selectedCharges.includes(label)} onClick={() => toggleCharge(label)}>{label}{rate && <span>{rate}</span>}</button>)}</div></div>
      </div>}<div className="enquiry-details__totals"><span>Additional</span><strong>-</strong><span>Subtotal</span><strong>$2,689.17</strong><span>GST (10%)</span><strong>$268.92</strong><span className="enquiry-details__total-label">Total</span><strong className="enquiry-details__grand-total">$2,958.09</strong></div></section>
    {([['customer-note', 'Customer note', '', 'No customer note added.', 'Included in quote PDF.'], ['internal-note', 'Internal note', '123456', undefined, 'Operators only — never sent to customer.']] as const).map(([section, label, value, placeholder, help]) => <section className="enquiry-details__card enquiry-details__note" key={section}><div className="enquiry-details__card-heading"><h4>{label}</h4><button type="button" aria-pressed={editing.has(section)} onClick={() => toggleEditing(section, `${option.id}-${section}`)}><EditIcon width={14} height={14} /> {editing.has(section) ? 'Done' : 'Edit'}</button></div><textarea id={`${option.id}-${section}`} aria-label={label} defaultValue={value} placeholder={placeholder} readOnly={!editing.has(section)} /><small>{help}</small></section>)}
    <section className="enquiry-details__card enquiry-details__note"><div className="enquiry-details__card-heading"><h4>Job reference</h4><button type="button" aria-pressed={editing.has('job-reference')} onClick={() => toggleEditing('job-reference', `${option.id}-job-reference`)}><EditIcon width={14} height={14} /> {editing.has('job-reference') ? 'Done' : 'Edit'}</button></div><input id={`${option.id}-job-reference`} aria-label="Job reference" defaultValue={jobReference} readOnly={!editing.has('job-reference')} /></section>
  </article>
}

export function EnquiryDetailsPage({ record = records.find(item => item.id === 'jack')! }: { record?: EnquiryRecord }) {
  const [collapsed, setCollapsed] = useState(false)
  const [options, setOptions] = useState(record.options)
  const [activeId, setActiveId] = useState(record.options[0].id)
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [notice, setNotice] = useState('')
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 90); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    if (!moreOpen) return
    const close = (event: KeyboardEvent | PointerEvent) => { if (event instanceof KeyboardEvent && event.key !== 'Escape') return; setMoreOpen(false) }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) }
  }, [moreOpen])
  const remaining = options.filter(option => !option.quotationReference).length
  const activeIndex = Math.max(0, options.findIndex(option => option.id === activeId))
  const activeOption = options[activeIndex]
  const convert = (id: string) => { setOptions(current => current.map(option => option.id === id ? { ...option, quotationReference: `Q${String(601 + current.findIndex(item => item.id === id)).padStart(3, '0')}`, quotationStatus: 'Draft' } : option)); setNotice('Quotation draft created for selected option.') }
  const generate = () => { const next = options.find(option => !option.quotationReference); if (next) convert(next.id); else setNotice('All options already have quotations.') }
  return <div className="enquiry-details">
    <Sidebar items={navigation} activeItemId="quotations" collapsed={collapsed} onCollapsedChange={setCollapsed} />
    <div className="enquiry-details__main"><Navbar options={[{ value: 'quotes', label: 'Quote / Tender management' }]} defaultValue="quotes" />
      <div className="enquiry-details__sticky" data-scrolled={scrolled}><PageHeader title={options.length === 1 ? record.name : `${options.length} Options`} titleIcon={options.length > 1 ? <LayersIcon /> : undefined} description={<>{options.length > 1 && <><UserPersonrIcon width={16} height={16} aria-hidden="true" />{record.name} · </>}<CalendarBlankIcon width={16} height={16} aria-hidden="true" />{record.date} | {record.time}</>} badge={<StatusBadge type="badge" status={remaining ? 'neutral' : 'blue'} label={remaining ? 'Open enquiry' : 'Quoted'} showDot={false} showLeadingIcon={false} />} showBadge={scrolled} onBack={() => { window.location.href = '/' }} primaryAction={{ label: 'Generate Quote', onClick: generate }} onMore={() => setMoreOpen(!moreOpen)} moreButtonProps={{ 'aria-expanded': moreOpen, 'aria-haspopup': 'menu', 'aria-controls': 'enquiry-more-menu' }} />{moreOpen && <div className="enquiry-details__more-menu" id="enquiry-more-menu" role="menu" onPointerDown={event => event.stopPropagation()}><button type="button" role="menuitem" onClick={() => { void navigator.clipboard.writeText(record.jobReference); setNotice('Job reference copied.'); setMoreOpen(false) }}>Copy job reference</button></div>}</div>
      <main className="enquiry-details__content"><EmailThreads record={record} />
        {options.length > 1 ? <section className="enquiry-details__option-panel" aria-label="Enquiry options">
          <div className="quotation-details__tabs"><div className="quotation-details__tab-list" role="tablist" aria-label="Enquiry options">{options.map((option, index) => <button key={option.id} type="button" role="tab" id={`enquiry-tab-${option.id}`} aria-selected={option.id === activeOption.id} aria-controls="enquiry-panel" tabIndex={option.id === activeOption.id ? 0 : -1} onClick={() => setActiveId(option.id)} onKeyDown={event => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); const buttons = Array.from(event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>('[role="tab"]')); const current = buttons.indexOf(event.currentTarget); const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length; buttons[next]?.focus(); setActiveId(options[next].id) }}><span>Option {index + 1}</span><small>{option.label}</small></button>)}</div></div>
          <div id="enquiry-panel" role="tabpanel" aria-labelledby={`enquiry-tab-${activeOption.id}`} className="enquiry-details__option-panel-body"><OptionCard key={activeOption.id} option={activeOption} index={activeIndex} totalOptions={options.length} jobReference={record.jobReference} onConvert={convert} /></div>
        </section> : <OptionCard option={activeOption} index={activeIndex} totalOptions={1} jobReference={record.jobReference} onConvert={convert} />}
        {notice && <p className="enquiry-details__notice" role="status"><ClockDashIcon width={16} height={16} />{notice}</p>}
      </main>
    </div>
  </div>
}
