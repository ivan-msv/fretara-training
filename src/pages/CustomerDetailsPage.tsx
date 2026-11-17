import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Dropdown } from '../components/Dropdown'
import { Input } from '../components/Input'
import { PageHeader } from '../components/PageHeader'
import { RadioButton } from '../components/RadioButton'
import { ProductShell } from '../components/ProductShell'
import { StatusBadge } from '../components/StatusBadge'
import { Toast, ToastViewport } from '../components/Toast'
import { CheckmarkCircleFillIcon } from '../icons/fill'
import { customers, emptyCustomer, segmentLabels, type Customer, type CustomerAddress } from './customersData'
import './CustomerDetailsPage.css'

const segmentOptions = Object.entries(segmentLabels).map(([value, label]) => ({ value, label }))
const stateOptions = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'].map(value => ({ value, label: value }))
const buyRateOptions = [{ value: 'metro-buy-2026', label: 'Metro buy rates — 2026' }, { value: 'national-buy-2026', label: 'National buy rates — 2026' }]
const sellRateOptions = [{ value: 'retail-2026', label: 'Retail sell rates — 2026' }, { value: 'contract-2026', label: 'Contract sell rates — 2026' }]
const marginOptions = [{ value: 'preset', label: 'Preset' }, { value: 'percentage', label: 'Percentage' }, { value: 'fixed', label: 'Fixed amount' }]
const presetOptions = [{ value: 'standard-45', label: 'ZZ Guide Demo — Standard 45%' }, { value: 'standard-35', label: 'Standard margin — 35%' }]
const emailPattern = /^\S+@\S+\.\S+$/

function AddressFields({ value, onChange }: { value: CustomerAddress; onChange: (value: CustomerAddress) => void }) {
  const update = (key: keyof CustomerAddress, next: string) => onChange({ ...value, [key]: next })
  return <fieldset className="customer-details__address">
    <legend className="heading-16-bold">Address</legend>
    <div className="customer-details__grid customer-details__grid--three">
      <Input label="Address line 1" value={value.line1} onChange={event => update('line1', event.target.value)} />
      <Input label="Address line 2" value={value.line2} onChange={event => update('line2', event.target.value)} />
      <Input label="Suburb" value={value.suburb} onChange={event => update('suburb', event.target.value)} />
      <Dropdown label="State" options={stateOptions} value={value.state} placeholder="Select state" onValueChange={next => update('state', next)} />
      <Input label="Post code" inputMode="numeric" value={value.postCode} onChange={event => update('postCode', event.target.value)} />
    </div>
  </fieldset>
}

export function CustomerDetailsPage({ customerId }: { customerId: string }) {
  const source = customerId === 'new' ? emptyCustomer : customers.find(customer => customer.id === customerId) ?? customers[0]
  const [saved, setSaved] = useState<Customer>(source)
  const [draft, setDraft] = useState<Customer>(source)
  const [emailError, setEmailError] = useState('')
  const [toastKey, setToastKey] = useState(0)
  const isNew = customerId === 'new'
  const setField = <K extends keyof Customer>(key: K, value: Customer[K]) => setDraft(current => ({ ...current, [key]: value }))
  const save = (event: FormEvent) => {
    event.preventDefault()
    const error = !draft.email.trim() ? 'Email is required.' : !emailPattern.test(draft.email) ? 'Enter a valid email address.' : ''
    setEmailError(error)
    if (error) { requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()); return }
    setSaved(draft)
    setToastKey(key => key + 1)
  }
  const cancel = () => { setDraft(saved); setEmailError('') }

  return <ProductShell className="customer-details" mainClassName="customer-details__main" activeItemId="customers">
      <main className="customer-details__content">
        <PageHeader title={isNew ? 'New Customer' : saved.company} description={isNew ? 'Enter the customer’s general information and pricing rules.' : "Update the client's general information and per-carrier rules."} status={!isNew ? <StatusBadge type="badge" status={saved.status === 'approved' ? 'success' : 'neutral'} label={saved.status === 'approved' ? 'Approved' : 'Registered'} showDot={false} showLeadingIcon={saved.status === 'approved'} leadingIcon={saved.status === 'approved' ? <CheckmarkCircleFillIcon /> : undefined} /> : undefined} onBack={() => { window.location.href = '/customers' }} />
        <form className="customer-details__form" onSubmit={save} noValidate>
          <section className="customer-details__card" aria-labelledby="general-information-title">
            <div className="customer-details__section-heading"><h2 id="general-information-title" className="heading-16-bold">General information</h2><p className="body-12-medium">{isNew ? 'Enter customer details to create a record.' : `Last updated ${saved.updatedAt} by ${saved.updatedBy}`}</p></div>
            <div className="customer-details__grid customer-details__grid--three">
              <Input label="Company" value={draft.company} onChange={event => setField('company', event.target.value)} />
              <Input label="Contact name" value={draft.contactName} onChange={event => setField('contactName', event.target.value)} />
              <div><Input label="Email" required type="email" value={draft.email} status={emailError ? 'error' : undefined} aria-describedby={emailError ? 'email-error' : undefined} onChange={event => setField('email', event.target.value)} />{emailError && <span id="email-error" className="customer-details__error body-12-medium">{emailError}</span>}</div>
              <Input label="Phone" type="tel" value={draft.phone} onChange={event => setField('phone', event.target.value)} />
              <Input label="ABN" inputMode="numeric" value={draft.abn} onChange={event => setField('abn', event.target.value)} />
              <Dropdown label="Customer segment" options={segmentOptions} value={draft.segment} onValueChange={value => setField('segment', value as Customer['segment'])} />
            </div>
            <AddressFields value={draft.address} onChange={value => setField('address', value)} />
          </section>
          <section className="customer-details__card" aria-labelledby="rates-title">
            <div className="customer-details__section-heading"><h2 id="rates-title" className="heading-16-bold">Rate</h2><p className="body-14-medium">Choose one way to price this customer.</p></div>
            <fieldset className="customer-details__rate-basis"><legend className="customer-details__sr-only">Rate basis</legend><RadioButton name="rateBasis" labelText="Buy rate" checked={draft.rateBasis === 'buy'} onChange={() => setField('rateBasis', 'buy')} /><RadioButton name="rateBasis" labelText="Sell rate" checked={draft.rateBasis === 'sell'} onChange={() => setField('rateBasis', 'sell')} /></fieldset>
            <div className="customer-details__rate-fields">
              {draft.rateBasis === 'buy' ? <><Dropdown label="Buy rate file(s)" options={buyRateOptions} value={draft.buyRateFile} placeholder="Select buy rate file(s)" onValueChange={value => setField('buyRateFile', value)} /><Dropdown label="Margin type" options={marginOptions} value={draft.marginType} placeholder="Select margin type" onValueChange={value => setField('marginType', value)} />{draft.marginType === 'preset' && <Dropdown label="Preset margin" options={presetOptions} value={draft.presetMargin} placeholder="Select preset margin" onValueChange={value => setField('presetMargin', value)} />}</> : <Dropdown label="Sell rate file(s)" options={sellRateOptions} value={draft.sellRateFile} placeholder="Select sell rate file(s)" onValueChange={value => setField('sellRateFile', value)} />}
            </div>
          </section>
          <div className="customer-details__actions"><Button type="button" variant="secondary" onClick={cancel}>Cancel</Button><Button type="submit">{isNew ? 'Create customer' : 'Save Changes'}</Button></div>
        </form>
      </main>
      {toastKey > 0 && <ToastViewport><Toast key={toastKey} state="success" title={isNew ? 'Customer created' : 'Changes saved'} onDismiss={() => setToastKey(0)}>{isNew ? 'Customer details are saved in this local preview.' : `${saved.company || draft.company} was updated.`}</Toast></ToastViewport>}
  </ProductShell>
}
