import { useRef, useState } from 'react'
import { Button } from '../components/Button'
import { StatusBadge } from '../components/StatusBadge'
import { AttachIcon, BulletedListIcon, ChevronDownIcon, ChevronUpIcon, ClockDashIcon, DeleteIcon, EditIcon, EmailIcon, LinkIcon, PlusIcon, SendMessageUpRightIcon, XmarkCloseIcon } from '../icons'
import fretaraMark from '../components/Sidebar/assets/fretara-mark.svg'
import type { EnquiryRecord } from './enquiriesData'
import './EmailThreads.css'

type ThreadState = 'draft' | 'compose' | 'editing'
const sampleReply = `Thanks for your inquiry! We're preparing your quote. To finalize it, we need a few more details:\n\nTotal weight of the shipment\nWidth of the pallet\nComplete destination address (city confirmed as Melbourne)\n\nCould you please provide these details?`

function BrandAvatar() { return <img className="email-threads__avatar" src={fretaraMark} alt="" /> }

export function EmailThreads({ record, initialState = 'draft', initiallyOpen = false }: { record: EnquiryRecord; initialState?: ThreadState; initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen)
  const [state, setState] = useState<ThreadState>(initialState)
  const [editingFromDraft, setEditingFromDraft] = useState(false)
  const [body, setBody] = useState(initialState === 'draft' ? sampleReply : '')
  const [sentReply, setSentReply] = useState(initialState !== 'draft')
  const [sentReplyBody, setSentReplyBody] = useState(sampleReply)
  const [recipient, setRecipient] = useState(true)
  const [addingRecipient, setAddingRecipient] = useState(false)
  const [extraRecipient, setExtraRecipient] = useState('')
  const [sentBodies, setSentBodies] = useState<string[]>([])
  const [notice, setNotice] = useState('')
  const editor = useRef<HTMLTextAreaElement>(null)
  const attachment = useRef<HTMLInputElement>(null)
  const hasDraft = state === 'draft' || state === 'editing'
  const messageCount = 1 + Number(sentReply) + Number(hasDraft) + sentBodies.length

  const compose = () => {
    setEditingFromDraft(false)
    setBody('')
    setState('editing')
    setNotice('')
    requestAnimationFrame(() => editor.current?.focus())
  }
  const send = () => {
    if (!body.trim() || !recipient) return
    if (sentReply) setSentBodies(current => [...current, body])
    else { setSentReply(true); setSentReplyBody(body) }
    setState('compose')
    setBody('')
    setNotice('Email marked as sent in this preview.')
  }
  const insert = (prefix: string, suffix = prefix) => {
    const element = editor.current
    if (!element) return
    const { selectionStart: start, selectionEnd: end } = element
    setBody(body.slice(0, start) + prefix + body.slice(start, end) + suffix + body.slice(end))
    requestAnimationFrame(() => { element.focus(); element.setSelectionRange(start + prefix.length, end + prefix.length) })
  }
  const renderBrandHeader = (draft: boolean) => <header className="email-threads__message-header"><BrandAvatar /><strong className="heading-14-bold">Fretara</strong><StatusBadge type="badge" status={draft ? 'blue' : 'success'} label={draft ? 'Draft reply' : 'Sent'} showDot={false} showLeadingIcon={false} /><time className="body-12-medium">19.10.2026 | 11:19 AM</time></header>

  return <section className="email-threads">
    <button className="email-threads__toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}><span className="heading-18-bold">EMAIL THREADS</span><span className="email-threads__count body-14-medium">{messageCount} messages {open ? <ChevronUpIcon width={20} height={20} /> : <ChevronDownIcon width={20} height={20} />}</span></button>
    {open && <div className="email-threads__content">
      <div className="email-threads__subject"><strong className="heading-18-bold">Request for Pallet Shipping Quote – Melbourne</strong><div className="email-threads__recipients body-14-medium"><span>To:</span>{recipient && <span className="email-threads__recipient"><b>J</b>{record.name}<button type="button" aria-label={`Remove ${record.name} as recipient`} onClick={() => setRecipient(false)}><XmarkCloseIcon width={12} height={12} /></button></span>}{extraRecipient && <span className="email-threads__recipient">{extraRecipient}<button type="button" aria-label={`Remove ${extraRecipient} as recipient`} onClick={() => setExtraRecipient('')}><XmarkCloseIcon width={12} height={12} /></button></span>}{addingRecipient ? <input autoFocus aria-label="Additional recipient email" type="email" placeholder="Email address" onKeyDown={event => { if (event.key === 'Enter') { setExtraRecipient(event.currentTarget.value); setAddingRecipient(false) } if (event.key === 'Escape') setAddingRecipient(false) }} onBlur={event => { if (event.target.value) setExtraRecipient(event.target.value); setAddingRecipient(false) }} /> : <button className="email-threads__add-recipient" type="button" aria-label="Add recipient" onClick={() => setAddingRecipient(true)}><PlusIcon width={18} height={18} /></button>}</div></div>
      <div className="email-threads__messages">
        <article className="email-threads__message"><header className="email-threads__message-header"><span className="email-threads__avatar email-threads__avatar--customer">J</span><strong className="heading-14-bold">{record.name}</strong><span className="body-12-medium email-threads__address">&lt;{record.id === 'jack' ? 'jack@gmail.com' : record.email}&gt;</span><time className="body-12-medium">19.10.2026 | 10:25 AM</time></header><div className="email-threads__message-body body-12-medium">Hi,<br />I’d like to request a quote for shipping a pallet from Sydney, Australia.<br />Here are the shipment details:<br />From: Melbourne, Australia<br />Shipment type: 1 standard pallet<br />Dimensions (approx): 120 cm (L) × 150 cm (H)<br />Contents: General commercial goods (non-hazardous)<br />Ready date: 28 May 2026</div></article>
        {sentReply && <article className="email-threads__message email-threads__message--outgoing">{renderBrandHeader(false)}<div className="email-threads__message-body body-12-medium">{sentReplyBody}</div></article>}
        {hasDraft && <article className="email-threads__message email-threads__message--outgoing">{renderBrandHeader(true)}{state === 'editing' ? <div className="email-threads__editor"><textarea ref={editor} className="body-12-medium" aria-label="Email reply" value={body} onChange={event => setBody(event.target.value)} /><div className="email-threads__format"><button type="button" aria-label="Attach file" onClick={() => attachment.current?.click()}><AttachIcon width={20} height={20} /></button><input ref={attachment} type="file" hidden onChange={event => setNotice(event.target.files?.[0] ? `${event.target.files[0].name} attached in this preview.` : '')} /><span className="email-threads__format-divider" /><button className="email-threads__bold" type="button" aria-label="Bold" onClick={() => insert('**')}>B</button><button className="email-threads__italic" type="button" aria-label="Italic" onClick={() => insert('_')}>I</button><span className="email-threads__format-divider" /><button type="button" aria-label="Bulleted list" onClick={() => insert('• ', '')}><BulletedListIcon width={20} height={20} /></button><button type="button" aria-label="Insert link" onClick={() => insert('[', '](https://)')}><LinkIcon width={20} height={20} /></button></div></div> : <div className="email-threads__message-body body-12-medium">{body}</div>}</article>}
        {sentBodies.map((sentBody, index) => <article className="email-threads__message email-threads__message--outgoing" key={index}>{renderBrandHeader(false)}<div className="email-threads__message-body body-12-medium">{sentBody}</div></article>)}
        <div className="email-threads__actions">{state === 'draft' && <><div className="email-threads__action-start"><Button type="button" variant="link" leadingIcon={<EditIcon />} onClick={() => { setEditingFromDraft(true); setState('editing') }}>Edit draft</Button><span className="email-threads__action-divider" /><Button className="email-threads__discard" type="button" variant="link" leadingIcon={<DeleteIcon />} onClick={() => { setState('compose'); setBody(''); setSentReply(true); setNotice('Draft discarded.') }}>Discard draft</Button></div><Button type="button" leadingIcon={<SendMessageUpRightIcon />} onClick={send} disabled={!recipient}>Send Email</Button></>}{state === 'compose' && <Button type="button" variant="secondary" leadingIcon={<EmailIcon />} onClick={compose}>Compose</Button>}{state === 'editing' && <><Button className="email-threads__cancel" type="button" variant="link" onClick={() => { setState(editingFromDraft ? 'draft' : 'compose'); if (!editingFromDraft) setBody('') }}>Cancel</Button><div className="email-threads__action-end"><Button type="button" variant="tertiary" leadingIcon={<ClockDashIcon />} onClick={() => { if (body.trim()) { setState('draft'); setNotice('Draft saved in this preview.') } }} disabled={!body.trim()}>Save Draft</Button><Button type="button" leadingIcon={<SendMessageUpRightIcon />} onClick={send} disabled={!body.trim() || !recipient}>Send Email</Button></div></>}</div>
        {notice && <p className="email-threads__notice body-12-medium" role="status">{notice}</p>}
      </div>
    </div>}
  </section>
}
