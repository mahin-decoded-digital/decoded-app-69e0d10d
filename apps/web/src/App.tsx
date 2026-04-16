import { useMemo, useState, useEffect } from 'react'
import { useMessageStore } from './stores/messageStore'

export default function App() {
  const message = useMessageStore(s => s.message)
  const fetchMessage = useMessageStore(s => s.fetchMessage)
  const updateMessage = useMessageStore(s => s.updateMessage)
  const [step, setStep] = useState(1)

  useEffect(() => {
    fetchMessage()
  }, [fetchMessage])

  const steps = useMemo(
    () => [
      {
        title: 'Choose your greeting',
        description: 'Start with “Hello World” or craft a custom opening line.'
      },
      {
        title: 'Type your message',
        description: 'Use the input field to personalize the words exactly how you want.'
      },
      {
        title: 'Preview instantly',
        description: 'See your updated greeting showcased in real time.'
      },
      {
        title: 'Share your vibe',
        description: 'Keep tweaking until the greeting feels just right.'
      }
    ],
    []
  )

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%)' }}
    >
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Hello Customizer</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{message}</h1>
        <p className="mt-3 text-sm text-slate-300">
          Personalize your greeting by following the steps and typing a new message below.
        </p>

        <div className="mt-8 grid gap-4 text-left text-sm text-slate-300 sm:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-400">Customizer steps</p>
              <span className="text-xs font-semibold text-cyan-300">Step {step}/4</span>
            </div>
            <div className="mt-4 space-y-3">
              {steps.map((item, index) => {
                const isActive = step === index + 1
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setStep(index + 1)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                      isActive
                        ? 'border-cyan-400/70 bg-cyan-400/10 text-white'
                        : 'border-white/10 bg-slate-900/40 text-slate-300 hover:border-cyan-400/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Step {index + 1}
                      </span>
                      {isActive && <span className="text-xs font-semibold text-cyan-300">Active</span>}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-300">{item.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">Your message</p>
            <p className="mt-3 text-sm text-slate-300">
              {steps[step - 1].description}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <label className="text-left text-xs font-semibold uppercase tracking-wide text-slate-400" htmlFor="message-input">
                Message input
              </label>
              <input
                id="message-input"
                value={message}
                onChange={(event) => updateMessage(event.target.value || 'Hello World')}
                placeholder="Type your custom greeting"
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 text-base text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:text-cyan-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(4, prev + 1))}
                className="flex-1 rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-400"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 text-left text-sm text-slate-300 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Current display</p>
            <p className="mt-2 text-lg font-medium text-white">{message}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Step focus</p>
            <p className="mt-2 text-lg font-medium text-white">{steps[step - 1].title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}