import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Page not found — Pavandeep B.'

    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center pt-[9rem] pb-20">
      <p className="eyebrow">
        <span className="eyebrow-num">404</span>
        <span className="eyebrow-mark" aria-hidden="true" />
        Page not found
      </p>
      <h1 className="mt-5 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.05em]">
        This page does not exist.
      </h1>
      <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted">
        The link may be out of date, or the page may have moved. Head back to the portfolio and
        continue from there.
      </p>
      <div className="mt-8">
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
    </section>
  )
}
