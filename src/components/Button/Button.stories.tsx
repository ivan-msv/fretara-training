import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { iconControl } from '../../storybook/iconControl'
import './Button.stories.css'

const meta = {
  title: 'Fretara/Button',
  component: Button,
  parameters: {
    controls: {
      include: ['aria-label', 'variant', 'shape', 'disabled', 'children', 'leadingIcon', 'trailingIcon'],
    },
  },
  argTypes: {
    'aria-label': { control: 'text', description: 'Required for icon-only buttons or content without a readable label.' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: 'Link always renders rounded, regardless of this value.',
    },
    disabled: { control: 'boolean' },
    children: {
      control: 'text',
      description: 'Button label/content.',
    },
    leadingIcon: {
      ...iconControl,
      description: 'Choose a Fretara Line or Fill icon before the label, or None.',
    },
    trailingIcon: {
      ...iconControl,
      description: 'Choose a Fretara Line or Fill icon after the label, or None.',
    },
  },
  args: {
    variant: 'primary',
    shape: 'rounded',
    disabled: false,
    children: 'Button',
    leadingIcon: 'none',
    trailingIcon: 'none',
    type: 'button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const WithIcons: Story = {
  args: { children: 'Add quote', leadingIcon: 'PlusIcon', trailingIcon: 'ChevronRightIcon' },
}
export const Disabled: Story = { args: { disabled: true } }
export const IconOnly: Story = {
  args: { children: undefined, leadingIcon: 'PlusIcon', 'aria-label': 'Add quote' },
}

const variants = ['primary', 'secondary', 'tertiary', 'link'] as const
const shapes = ['rounded', 'pill'] as const
const states = ['default', 'hover', 'active', 'focus', 'disabled'] as const

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ['.button-preview--hover'],
      active: ['.button-preview--active'],
      focusVisible: ['.button-preview--focus'],
    },
  },
  render: () => (
    <div className="button-gallery">
      {variants.flatMap((variant) => shapes.map((shape) => (
        <section key={`${variant}-${shape}`}>
          <h2 className="body-14-bold">{variant} / {shape}{variant === 'link' ? ' (renders rounded)' : ''}</h2>
          <div className="button-gallery__states">
            {states.map((state) => (
              <div className="button-gallery__cell" key={state}>
                <span className="body-12-medium">{state}</span>
                <Button variant={variant} shape={shape} disabled={state === 'disabled'}
                  className={`button-preview--${state}`} type="button">Button</Button>
              </div>
            ))}
          </div>
        </section>
      )))}
    </div>
  ),
}
