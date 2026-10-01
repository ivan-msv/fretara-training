import type { Meta, StoryObj } from '@storybook/react-vite'
import './tokens.css'
import './typography.css'
import './CornerRadius.stories.css'

// Exact labels and values from Figma's Corner Radius section (4844:5330).
const radii = [
  ['radius-none', 0],
  ['radius-xs', 1],
  ['radius-sm', 4],
  ['radius-md', 6],
  ['radius-default', 8],
  ['radius-lg', 12],
  ['radius-xl', 16],
  ['radius-2xl', 24],
  ['radius-full', 100],
] as const

const meta = {
  title: 'Fretara/Foundations/Corner Radius',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Scale: Story = {
  render: () => (
    <main className="radius-foundation">
      <h1 className="heading-24-bold">Corner Radius</h1>
      <p>
        Nine foundation tokens, from square corners to fully rounded.
        {' '}<a href="https://www.figma.com/design/obfA79k84IcRerE44fUqL7/Fretara--NEW-?node-id=4844-5330">View in Figma</a>.
      </p>
      <ul className="radius-foundation__scale">
        {radii.map(([token, value]) => (
          <li key={token}>
            <div
              className="radius-foundation__swatch"
              style={{ borderRadius: `var(--${token})` }}
              aria-hidden="true"
            />
            <code>--{token}</code>
            <span>{value}px</span>
          </li>
        ))}
      </ul>
      <p>Components consume these directly: <code>border-radius: var(--radius-default);</code></p>
    </main>
  ),
}
