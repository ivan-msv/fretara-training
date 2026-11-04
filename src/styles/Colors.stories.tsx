import type { Meta, StoryObj } from '@storybook/react-vite'
import './Colors.stories.css'

const colors = [
  ['Blue', '--blue', '#0057FF'],
  ['Blue surface', '--blue-surface', '#D7EBFF'],
  ['Blue border', '--blue-border', '#CADAF9'],
  ['Warning border', '--warning-border', '#FED7AA'],
] as const

const meta = {
  title: 'Fretara/Foundation/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const ComponentColors: Story = {
  render: () => (
    <section className="foundation-colors">
      <h1 className="heading-24-bold">Shared component colors</h1>
      <p className="body-14-medium">Blue follows the actual Figma fill/variable (#0057FF). The printed #007FFF label in the foundation is stale.</p>
      <div className="foundation-colors__grid">
        {colors.map(([name, token, hex]) => (
          <figure key={token}>
            <div className="foundation-colors__swatch" style={{ backgroundColor: `var(${token})` }} />
            <figcaption className="body-14-medium">{name}<br /><code>{token}</code><br />{hex}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  ),
}
