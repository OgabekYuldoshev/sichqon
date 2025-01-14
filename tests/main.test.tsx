import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { createTunnel } from "../src"


describe('test sichqon lib for react', () => {
  it('should test lib between two components', () => {
    const t = createTunnel()

    const Header = () => (
      <header>
        <span>this is header content</span>
        <t.Out />
      </header>
    )

    const Footer = () => (
      <footer>
        <t.In>
          <p>Tunnel</p>
        </t.In>
        <span>this is footer content</span>
      </footer>
    )

    const { container } = render(
      <>
        <Header />
        <Footer />
      </>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <header>
          <span>
            this is header content
          </span>
          <p>
            Tunnel
          </p>
        </header>
        <footer>
          <span>
            this is footer content
          </span>
        </footer>
      </div>
    `)
  })
})