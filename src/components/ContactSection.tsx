import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useForm } from '@formspree/react'
import { ArrowUpRight, Check, Info, LoaderCircle } from 'lucide-react'
import { getEmailHref, getSocialHref, linksPending, profile } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

/**
 * Delivery runs through Formspree (@formspree/react). The form ID lives in
 * src/data/profile.ts → contactForm.formspreeId. If that field is empty the
 * form renders in an explicit "not connected" state and never fakes a send.
 */
const formspreeId = profile.contactForm.formspreeId.trim()

type FormValues = {
  name: string
  email: string
  message: string
  /** Honeypot — hidden from real users; bots that fill it are ignored. */
  _gotcha: string
}

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

const emptyValues: FormValues = { name: '', email: '', message: '', _gotcha: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Please add your name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please add an email address.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please add a short message (at least 10 characters).'
  }

  return errors
}

function prettyLink(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function ContactSection() {
  const emailHref = getEmailHref()
  const linkedinHref = getSocialHref('linkedin')
  const githubHref = getSocialHref('github')

  return (
    <section id="contact" className="section section-rule" aria-labelledby="contact-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="contact-title"
            index="06"
            label="Contact"
            title="Let's talk about the work."
            intro="For roles, collaboration, or questions about a project, email is the most direct route."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <p className="statement max-w-xl">
              Have a role, a product problem, or an early-career opportunity in mind? I would like
              to hear about it.
            </p>

            <div className="mt-9 border-t border-line">
              <ContactRow
                label="Email"
                value={profile.contact.email}
                href={emailHref}
                external
              />
              <ContactRow
                label="LinkedIn"
                value={prettyLink(profile.contact.linkedin)}
                href={linkedinHref}
                external
              />
              <ContactRow
                label="GitHub"
                value={prettyLink(profile.contact.github)}
                href={githubHref}
                external
              />
            </div>

            {linksPending ? (
              <p className="mt-6 flex gap-3 rounded-lg border border-line bg-surface p-4 text-[12px] leading-5 text-dim">
                <Info size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
                <span>
                  One contact detail is still a placeholder in this build — the row tagged{' '}
                  <strong className="font-medium text-muted">Placeholder</strong>. Update{' '}
                  <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[11px] text-muted">
                    src/data/profile.ts
                  </code>{' '}
                  with the real link before publishing.
                </span>
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={90}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

interface ContactRowProps {
  label: string
  value: string
  href: string | null
  external: boolean
}

function ContactRow({ label, value, href, external }: ContactRowProps) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-line py-4">
      <div className="min-w-0">
        <p className="mono text-[10px] text-dim">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-1 block truncate text-sm text-fg transition-colors hover:text-accent"
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 truncate text-sm text-muted">{value}</p>
        )}
      </div>
      {href ? (
        <ArrowUpRight size={16} className="shrink-0 text-dim" aria-hidden="true" />
      ) : (
        <span className="tag shrink-0">Placeholder</span>
      )}
    </div>
  )
}

function ContactForm() {
  // useForm() throws on an empty form key, so the connected and unconfigured
  // states are separate components rather than one conditional hook call.
  return formspreeId ? <ConnectedContactForm /> : <UnconfiguredContactForm />
}

function ConnectedContactForm() {
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [botLured, setBotLured] = useState(false)
  const [formspreeState, submitToFormspree, resetFormspree] = useForm<FormValues>(formspreeId)

  const { succeeded, submitting, errors: submissionErrors } = formspreeState

  const serverFieldError = (field: keyof FieldErrors) =>
    submissionErrors?.getFieldErrors(field)[0]?.message

  const visibleErrors: FieldErrors = {
    name: errors.name ?? serverFieldError('name'),
    email: errors.email ?? serverFieldError('email'),
    message: errors.message ?? serverFieldError('message'),
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    setBotLured(false)
    if (succeeded || submissionErrors) resetFormspree()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      event.preventDefault()
      const field = event.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)
      field?.focus()
      return
    }

    // Honeypot: if a bot fills this hidden field, stop silently.
    if (values._gotcha) {
      event.preventDefault()
      setBotLured(true)
      return
    }

    // Formspree's handler prevents the default submission, reads the form
    // fields, and tracks submitting / succeeded / error state.
    void submitToFormspree(event)
  }

  const formErrors = submissionErrors?.getFormErrors() ?? []

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">Send a message</h3>
      <p className="mt-2 text-[13px] leading-6 text-muted">
        Share a role, a project, or a question. Include enough context for a useful reply.
      </p>

      <div className="mt-7 grid gap-5">
        <ContactFields
          values={values}
          errors={visibleErrors}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <>
              <LoaderCircle size={15} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </button>
      </div>

      <div role="status" aria-live="polite" className="mt-5">
        {botLured || succeeded ? (
          <p className="flex items-center gap-2 text-[13px] text-accent">
            <Check size={14} aria-hidden="true" />
            Message sent. Thank you — I will reply as soon as I can.
          </p>
        ) : null}
        {formErrors.length > 0 ? (
          <>
            <p className="text-[13px] leading-6 text-danger">
              Something went wrong while sending. Please try again, or use the email address listed
              beside this form.
            </p>
            {formErrors[0]?.message ? (
              <p className="mt-1 text-[11.5px] leading-5 text-dim">
                Formspree reported: {formErrors[0].message}
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </form>
  )
}

function UnconfiguredContactForm() {
  return (
    <form className="card p-6 sm:p-8" aria-describedby="contact-form-disabled-note">
      <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">Send a message</h3>
      <p className="mt-2 text-[13px] leading-6 text-muted">
        Share a role, a project, or a question. Include enough context for a useful reply.
      </p>

      <div className="mt-7 grid gap-5">
        <ContactFields values={emptyValues} errors={{}} onChange={() => undefined} disabled />
      </div>

      <p
        id="contact-form-disabled-note"
        className="mt-6 flex gap-3 rounded-lg border border-line bg-ink p-4 text-[12px] leading-5 text-dim"
      >
        <Info size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
        <span>
          Form delivery is not configured in this build — add a Formspree form ID to{' '}
          <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[11px] text-muted">
            src/data/profile.ts
          </code>{' '}
          to enable submissions. Nothing is sent until that is in place.
        </span>
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled>
          Send message
        </button>
        <p className="text-[11.5px] leading-5 text-dim">
          Delivery stays disabled until the form is connected.
        </p>
      </div>
    </form>
  )
}

interface ContactFieldsProps {
  values: FormValues
  errors: FieldErrors
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  disabled?: boolean
}

function ContactFields({ values, errors, onChange, disabled = false }: ContactFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="contact-name" className="field-label">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className="field-input"
          placeholder="Your name"
          value={values.name}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="mt-1.5 text-xs text-danger">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="field-label">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className="field-input"
          placeholder="you@company.com"
          value={values.email}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" className="mt-1.5 text-xs text-danger">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className="field-input min-h-[9rem] resize-y"
          placeholder="A short note about the role, team, or problem."
          value={values.message}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-xs text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input
          id="contact-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values._gotcha}
          onChange={onChange}
        />
      </div>
    </>
  )
}
