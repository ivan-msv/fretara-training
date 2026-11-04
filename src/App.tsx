import { Button } from './components/Button'
import './styles/tokens.css'
import './styles/typography.css'
import './App.css'

function App() {
  return (
    <main className="library-home">
      <h1 className="heading-24-bold">Fretara component library</h1>
      <p className="body-14-medium">Explore component variants, controls, documentation, and accessibility checks in Storybook.</p>
      <a className="body-14-medium" href="https://ivan-msv.github.io/fretara-training/">Open Storybook</a>
      <section aria-label="Button variants" className="library-home__buttons">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="link">Link</Button>
      </section>
    </main>
  )
}

export default App
