import type { Meta, StoryObj } from '@storybook/react-vite'
import { Message } from './Message'

const meta = {
  title: 'Fretara/Message',
  component: Message,
  parameters: { layout: 'padded' },
  args: {
    state: 'error',
    heading: '3 items need review',
    children: 'These consignments require your attention before you can continue',
  },
  argTypes: {
    state: { control: 'select', options: ['error', 'warning', 'success', 'info', 'neutral'] },
    heading: { control: 'text' },
    children: { control: 'text' },
    icon: { control: false },
    onDismiss: { action: 'dismissed' },
  },
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Dismissible: Story = {
  args: { onDismiss: () => undefined },
}

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Message state="error" heading="3 items need review">
        These consignments require your attention before you can continue
      </Message>
      <Message state="warning" heading="Potential issue detected">
        Some fields may need your review before submitting
      </Message>
      <Message state="success" heading="All items confirmed">
        Everything looks good and is ready to proceed
      </Message>
      <Message state="info" heading="Additional information">
        Here are some details you might find useful
      </Message>
      <Message state="neutral" heading="Additional information">
        Here are some details you might find useful
      </Message>
    </div>
  ),
}
