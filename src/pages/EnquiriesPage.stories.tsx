import type { Meta, StoryObj } from '@storybook/react-vite'
import { EnquiriesPage } from './EnquiriesPage'

const meta = { title: 'Fretara/Pages/Enquiries', component: EnquiriesPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof EnquiriesPage>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
