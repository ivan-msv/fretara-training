export type CustomerStatus = 'approved' | 'registered'
export type CustomerSegment = 'vip' | 'enterprise' | 'standard' | 'unassigned'
export type RateBasis = 'buy' | 'sell'

export type CustomerAddress = {
  line1: string
  line2: string
  suburb: string
  state: string
  postCode: string
}

export type Customer = {
  id: string
  company: string
  contactName: string
  email: string
  phone: string
  abn: string
  status: CustomerStatus
  segment: CustomerSegment
  updatedBy: string
  updatedAt: string
  address: CustomerAddress
  rateBasis: RateBasis
  buyRateFile: string
  sellRateFile: string
  marginType: string
  presetMargin: string
}

const address = (line1: string, line2: string, suburb: string, state: string, postCode: string): CustomerAddress => ({ line1, line2, suburb, state, postCode })

export const customers: Customer[] = [
  { id: 'ads-australia', company: 'ADS Australia', contactName: 'John Smith', email: 'john.smith@adsaustralia.com.au', phone: '+61 412 345 678', abn: '51004085616', status: 'approved', segment: 'unassigned', updatedBy: 'Sarah Chen', updatedAt: '2 hours ago', address: address('12 Cochranes Road', 'Suite 4', 'Scoresby', 'VIC', '3170'), rateBasis: 'buy', buyRateFile: '', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-45' },
  { id: 'because-we-care', company: 'Because We Care', contactName: 'Sarah Johnson', email: 'sarah@becausewecare.com.au', phone: '+61 421 987 654', abn: '20603948517', status: 'approved', segment: 'unassigned', updatedBy: 'Maya Singh', updatedAt: 'yesterday', address: address('44 Albert Street', '', 'Brisbane', 'QLD', '4000'), rateBasis: 'sell', buyRateFile: '', sellRateFile: 'retail-2026', marginType: '', presetMargin: '' },
  { id: 'brand-developers-btb', company: 'Brand Developers BTB', contactName: 'Michael Chen', email: 'm.chen@branddevelopersbtb.com.au', phone: '+61 438 112 233', abn: '38610229941', status: 'approved', segment: 'enterprise', updatedBy: 'Sarah Chen', updatedAt: '3 days ago', address: address('18 Market Lane', '', 'Richmond', 'VIC', '3121'), rateBasis: 'buy', buyRateFile: 'metro-buy-2026', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-35' },
  { id: 'brand-developers-btc', company: 'Brand Developers BTC', contactName: 'Emily Wilkins', email: 'emily.w@branddevelopersbtc.com.au', phone: '+61 404 567 890', abn: '90610229172', status: 'registered', segment: 'standard', updatedBy: 'Sarah Chen', updatedAt: '4 days ago', address: address('18 Market Lane', '', 'Richmond', 'VIC', '3121'), rateBasis: 'sell', buyRateFile: '', sellRateFile: '', marginType: '', presetMargin: '' },
  { id: 'edward-meller', company: 'Edward Meller', contactName: 'David Brown', email: 'david@edwardmeller.com.au', phone: '+61 417 234 567', abn: '76004220111', status: 'registered', segment: 'standard', updatedBy: 'Maya Singh', updatedAt: '5 days ago', address: address('600 Chapel Street', '', 'South Yarra', 'VIC', '3141'), rateBasis: 'buy', buyRateFile: '', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-35' },
  { id: 'famous-pacific-shipping', company: 'Famous Pacific Shipping', contactName: 'Lisa Andersen', email: 'lisa.a@famouspacificshipping.com.au', phone: '+61 443 876 543', abn: '65076824219', status: 'registered', segment: 'enterprise', updatedBy: 'Sarah Chen', updatedAt: '1 week ago', address: address('7 Cargo Way', '', 'Botany', 'NSW', '2019'), rateBasis: 'buy', buyRateFile: 'national-buy-2026', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-45' },
  { id: 'flexcam', company: 'FlexCAM', contactName: 'Robert Taylor', email: 'robert.t@flexcam.com.au', phone: '+61 450 321 789', abn: '46099416852', status: 'registered', segment: 'unassigned', updatedBy: 'Maya Singh', updatedAt: '1 week ago', address: address('23 Industry Circuit', '', 'Dandenong', 'VIC', '3175'), rateBasis: 'sell', buyRateFile: '', sellRateFile: '', marginType: '', presetMargin: '' },
  { id: 'florsheim', company: 'Florsheim', contactName: 'Jennifer Martinez', email: 'jen.m@florsheim.com.au', phone: '+61 408 654 321', abn: '87004096281', status: 'registered', segment: 'standard', updatedBy: 'Sarah Chen', updatedAt: '2 weeks ago', address: address('11 Shoe Lane', '', 'Collingwood', 'VIC', '3066'), rateBasis: 'buy', buyRateFile: '', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-35' },
  { id: 'global-retail-partners', company: 'Global Retail Partners International', contactName: 'Oliver Nguyen', email: 'oliver.nguyen@globalretailpartners.example.com', phone: '+61 402 114 229', abn: '42072188303', status: 'approved', segment: 'enterprise', updatedBy: 'Maya Singh', updatedAt: '2 weeks ago', address: address('80 King Street', 'Level 10', 'Sydney', 'NSW', '2000'), rateBasis: 'buy', buyRateFile: 'national-buy-2026', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-45' },
  { id: 'harbour-homewares', company: 'Harbour Homewares', contactName: 'Grace Lee', email: 'grace@harbourhomewares.com.au', phone: '+61 419 223 771', abn: '18544700261', status: 'registered', segment: 'standard', updatedBy: 'Sarah Chen', updatedAt: '3 weeks ago', address: address('2 Bay Road', '', 'Port Melbourne', 'VIC', '3207'), rateBasis: 'sell', buyRateFile: '', sellRateFile: '', marginType: '', presetMargin: '' },
  { id: 'northern-industries', company: 'Northern Industries', contactName: 'Noah Wilson', email: 'noah@northernindustries.com.au', phone: '+61 431 775 402', abn: '39060144720', status: 'approved', segment: 'vip', updatedBy: 'Maya Singh', updatedAt: '1 month ago', address: address('9 Foundry Street', '', 'Newcastle', 'NSW', '2300'), rateBasis: 'buy', buyRateFile: 'national-buy-2026', sellRateFile: '', marginType: 'preset', presetMargin: 'standard-45' },
  { id: 'southern-cross-foods', company: 'Southern Cross Foods', contactName: 'Ava Thompson', email: 'ava@southerncrossfoods.com.au', phone: '+61 447 921 806', abn: '73200218455', status: 'registered', segment: 'unassigned', updatedBy: 'Sarah Chen', updatedAt: '1 month ago', address: address('61 Produce Avenue', '', 'Adelaide', 'SA', '5000'), rateBasis: 'sell', buyRateFile: '', sellRateFile: '', marginType: '', presetMargin: '' },
]

export const emptyCustomer: Customer = {
  id: 'new', company: '', contactName: '', email: '', phone: '', abn: '', status: 'registered', segment: 'unassigned', updatedBy: 'You', updatedAt: 'not saved yet',
  address: address('', '', '', '', ''), rateBasis: 'buy', buyRateFile: '', sellRateFile: '', marginType: 'preset', presetMargin: '',
}

export const segmentLabels: Record<CustomerSegment, string> = { vip: 'VIP Client', enterprise: 'Enterprise', standard: 'Standard', unassigned: 'Unassigned' }
