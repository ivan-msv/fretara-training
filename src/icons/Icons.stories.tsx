import type { ComponentType, SVGProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as lineIcons from './line'
import * as fillIcons from './fill'
import inventory from './inventory.json'
import './Icons.stories.css'

const components: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  ...lineIcons,
  ...fillIcons,
}

function IconsGallery() {
  return (
    <main className="icon-gallery">
      <h1 className="heading-24-bold">Icons</h1>
      <p className="icon-gallery__intro">
        92 original Fretara icons. Select a name to inspect its Figma source.
        Icons default to their original 24 × 24 size; RefreshResetIcon and
        SendMessageFillIcon retain their 24 × 25 canvas.
      </p>
      <div className="icon-gallery__examples" aria-label="Color inheritance examples">
        <span><lineIcons.PlusIcon /> Default</span>
        <span className="icon-gallery__primary"><lineIcons.PlusIcon /> Primary</span>
        <span className="icon-gallery__error"><lineIcons.WarningErrorIcon /> Error</span>
        <span className="icon-gallery__primary"><fillIcons.UsersFillIcon /> Two-tone</span>
        <span className="icon-gallery__primary"><fillIcons.GoldFillIcon /> Fixed colors</span>
      </div>
      <p className="icon-gallery__intro">
        Monochrome icons inherit CSS color. Two-tone icons preserve opacity.
        The medals retain their original image colors; the filled Play circle
        and alternate Xmark circle retain their Gray 50 backgrounds.
      </p>
      {(['line', 'fill'] as const).map((group) => (
        <section key={group} aria-labelledby={`${group}-heading`}>
          <h2 id={`${group}-heading`} className="heading-20-bold">
            {group === 'line' ? 'Line Icons' : 'Fill Icons'}
            <span className="icon-gallery__count">
              {inventory.filter((entry) => entry.group === group).length}
            </span>
          </h2>
          <ul className="icon-gallery__list">
            {inventory.filter((entry) => entry.group === group).map((entry) => {
              const Icon = components[entry.component]
              return (
                <li key={entry.nodeId}>
                  <div className="icon-gallery__preview"><Icon aria-hidden="true" /></div>
                  <a href={`https://www.figma.com/design/obfA79k84IcRerE44fUqL7/Fretara--NEW-?node-id=${entry.nodeId.replace(':', '-')}`}>
                    <code>{entry.component}</code>
                  </a>
                  <span className="icon-gallery__source">{entry.figmaName.split('/').at(-1)?.trim()}</span>
                  {entry.notes.map((note) => <small key={note}>{note}</small>)}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}

const meta = {
  title: 'Fretara/Icons',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = { render: () => <IconsGallery /> }

/** Original Figma row order and spacing, for side-by-side visual review. */
export const FigmaOrder: Story = {
  render: () => (
    <main className="icon-reference">
      {(['line', 'fill'] as const).map((group) => (
        <section key={group}>
          <h2 className="heading-20-bold">{group === 'line' ? 'Line Icons' : 'Fill Icons'}</h2>
          <div className={`icon-reference__grid icon-reference__grid--${group}`}>
            {inventory.filter((entry) => entry.group === group).map((entry) => {
              const Icon = components[entry.component]
              return <Icon key={entry.nodeId} aria-label={entry.component} />
            })}
          </div>
        </section>
      ))}
    </main>
  ),
}

export const Accessibility: Story = {
  render: () => (
    <main className="icon-gallery">
      <h1 className="heading-24-bold">Decorative and meaningful icons</h1>
      <p>Decorative icons are hidden by default. Supply an accessible label for standalone meaning.</p>
      <div className="icon-gallery__examples">
        <span><lineIcons.CheckmarkIcon aria-hidden="true" /> Saved</span>
        <lineIcons.CheckmarkIcon aria-label="Saved" />
        <lineIcons.CheckmarkIcon aria-labelledby="saved-icon-title">
          <title id="saved-icon-title">Saved using a title element</title>
        </lineIcons.CheckmarkIcon>
      </div>
      <pre>{'<PlusIcon aria-hidden="true" />\n<CheckmarkIcon aria-label="Saved" />\n<PlusIcon width={20} height={20} className="your-class" />'}</pre>
    </main>
  ),
}
