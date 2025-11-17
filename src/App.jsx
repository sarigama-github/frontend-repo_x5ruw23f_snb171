import React, { useEffect, useRef, useState } from 'react'
import { Car, Settings, Gauge, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import StepPanel, { useSuggestions } from './components/StepPanel'

function App() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState({ make: '', model: '', year: '', cylinder: '', seats: '' })
  const scrollRef = useRef(null)

  const { makes, models, years, cylinders, seats } = useSuggestions(selections)

  useEffect(() => {
    if (!scrollRef.current) return
    if (!started) return
    const container = scrollRef.current
    const target = container.querySelectorAll('.snap-start')[step + 1] // +1 to skip hero
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step, started])

  const next = () => setStep((s) => Math.min(s + 1, 4))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const setField = (key) => (val) => setSelections((prev) => ({ ...prev, [key]: val }))

  const panels = [
    {
      key: 'make',
      title: 'What’s your car make?',
      description: 'Start typing — we’ll suggest the most likely options based on popular choices in your region.',
      options: makes,
      icon: Car,
      value: selections.make,
      onChange: setField('make'),
      hint: 'AI suggests top makes'
    },
    {
      key: 'model',
      title: 'Now the model',
      description: 'Smart filtering narrows models based on your make. Try a few letters.',
      options: models,
      icon: Settings,
      value: selections.model,
      onChange: setField('model'),
      hint: selections.make ? `Popular for ${selections.make}` : 'Select make first'
    },
    {
      key: 'year',
      title: 'Year of manufacture',
      description: 'We’ll optimize premiums based on age and safety ratings.',
      options: years,
      icon: Gauge,
      value: selections.year,
      onChange: setField('year'),
      hint: 'Recent first'
    },
    {
      key: 'cylinder',
      title: 'Engine cylinders',
      description: 'Higher displacement may affect premiums. Choose what matches your vehicle.',
      options: cylinders,
      icon: Gauge,
      value: selections.cylinder,
      onChange: setField('cylinder')
    },
    {
      key: 'seats',
      title: 'How many seats?',
      description: 'We personalize coverage assuming typical occupancy and usage patterns.',
      options: seats,
      icon: Users,
      value: selections.seats,
      onChange: setField('seats')
    }
  ]

  return (
    <div ref={scrollRef} className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      <Hero onStart={() => setStarted(true)} />

      {panels.map((p, i) => (
        <StepPanel
          key={p.key}
          index={i}
          total={panels.length}
          title={p.title}
          description={p.description}
          value={p.value}
          onChange={p.onChange}
          onNext={() => {
            setStarted(true)
            setStep(i + 1)
          }}
          onBack={i === 0 ? undefined : () => setStep(i - 1)}
          options={p.options}
          icon={p.icon}
          hint={p.hint}
        />
      ))}

      <section className="snap-start h-screen bg-[#030a1a] flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h3 className="text-3xl md:text-4xl font-semibold text-white">You’re all set</h3>
          <p className="mt-4 text-sky-200/90">We’ll crunch the numbers and surface tailored plans. Ready to view your quotes?</p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-white shadow-lg shadow-sky-500/30 transition hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-sky-300">
            View my quotes
          </button>
        </div>
      </section>
    </div>
  )
}

export default App
