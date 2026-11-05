import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmailThreads } from './EmailThreads'
import { records } from './enquiriesData'

const record = records.find(item => item.id === 'jack')!
const meta = { title: 'Fretara/Pages/Email Threads', component: EmailThreads, parameters: { layout: 'padded' } } satisfies Meta<typeof EmailThreads>
export default meta
type Story = StoryObj<typeof meta>
export const DraftReply: Story = { args: { record, initiallyOpen: true, initialState: 'draft' } }
export const Compose: Story = { args: { record, initiallyOpen: true, initialState: 'compose' } }
export const OpenEditor: Story = { args: { record, initiallyOpen: true, initialState: 'editing' } }
