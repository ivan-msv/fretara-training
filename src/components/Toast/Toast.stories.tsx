import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast, ToastViewport } from './Toast'

const meta = {
  title: 'Fretara/Toast',
  component: Toast,
  parameters: { layout: 'fullscreen' },
  args: {
    state: 'success',
    title: 'Title',
    children: 'Description goes here with a little more context.',
    showAction: false,
    actionLabel: 'Button',
  },
  argTypes: {
    state: { control: 'select', options: ['success', 'error', 'warning', 'information'] },
    title: { control: 'text' },
    children: { control: 'text' },
    showAction: { control: 'boolean' },
    actionLabel: { control: 'text' },
    icon: { control: false },
    onAction: { action: 'action clicked' },
    onDismiss: { action: 'dismissed' },
  },
  decorators: [
    (Story, context) => (
      <ToastViewport>
        <Story key={JSON.stringify(context.args)} />
      </ToastViewport>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const WithAction: Story = { args: { showAction: true } }
export const DescriptionOnly: Story = { args: { title: undefined } }

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  decorators: [],
  render: () => (
    <ToastViewport>
      <Toast state="success" title="Saved" showAction actionLabel="View details">Your changes were saved successfully.</Toast>
      <Toast state="error" title="Upload failed" showAction actionLabel="Try again">The file could not be uploaded.</Toast>
      <Toast state="warning" title="Connection unstable">Some updates may be delayed.</Toast>
      <Toast state="information" title="Sync in progress" showAction actionLabel="View sync status">Your latest changes are being synced.</Toast>
    </ToastViewport>
  ),
}
