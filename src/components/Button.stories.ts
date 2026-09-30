import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { Button } from './Button'
import * as lineIcons from '../icons/line'
import * as fillIcons from '../icons/fill'

const iconEntries = [
  ...Object.entries(lineIcons).map(([name, Icon]) => ({ name, Icon, group: 'Line' })),
  ...Object.entries(fillIcons).map(([name, Icon]) => ({ name, Icon, group: 'Fill' })),
]

const iconControl = {
  control: {
    type: 'select' as const,
    labels: {
      none: 'None',
      ...Object.fromEntries(iconEntries.map(({ name, group }) => [name, `${group} / ${name}`])),
    },
  },
  options: ['none', ...iconEntries.map(({ name }) => name)],
  mapping: {
    none: undefined,
    ...Object.fromEntries(iconEntries.map(({ name, Icon }) => [name, createElement(Icon)])),
  },
}

const meta = {
  title: 'Fretara/Button',
  component: Button,
  parameters: {
    controls: {
      include: ['variant', 'shape', 'disabled', 'children', 'leadingIcon', 'trailingIcon'],
    },
  },
  argTypes: {
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
export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Tertiary: Story = { args: { variant: 'tertiary' } }
export const Link: Story = { args: { variant: 'link' } }
