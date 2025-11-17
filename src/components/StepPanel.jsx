import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowLeft, Car, Sparkles } from 'lucide-react'

const suggestionsData = {
  make: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Hyundai', 'Kia', 'Nissan', 'Volkswagen', 'Audi'],
  model: {
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Yaris'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
    Ford: ['Focus', 'Fiesta', 'Escape', 'Mustang'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5'],
    Mercedes: ['A-Class', 'C-Class', 'E-Class', 'GLA'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
    Kia: ['Rio', 'Cerato', 'Sportage', 'Sorento'],
    Nissan: ['Sentra', 'Altima', 'Qashqai', 'X-Trail'],
    Volkswagen: ['Golf', 'Polo', 'Tiguan', 'Passat'],
    Audi: ['A3', 'A4', 'Q3', 'Q5']
  },
  years: Array.from({ length: 25 }, (_, i) => `${new Date().getFullYear() - i}`),
  cylinders: ['3', '4', '6', '8', '12'],
  seats: ['2', '4', '5', '7', '8']
}

function AutoSuggest({ label, icon: Icon, value, onChange, options, placeholder = 'Type to search…', disabled, hint }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    if (!query) return options
    return options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
  }, [options, query])

  useEffect(() => {
    setQuery(value || '')
  }, [value])

  return (
    <div className="w-full">
      <label className="block text-sky-200/90 text-sm mb-2">{label}</label>
      <div className="relative flex items-center rounded-lg bg-white/5 ring-1 ring-white/10">
        {Icon && <Icon className="ml-3 h-5 w-5 text-sky-300" />}
        <input
          disabled={disabled}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange && onChange(e.target.value)
          }}
          placeholder={placeholder}
          className="w-full bg-transparent placeholder-sky-300/50 text-white px-3 py-3 focus:outline-none"
        />
        {hint && (
          <span className="mr-3 text-xs text-sky-300/70">{hint}</span>
        )}
      </div>
      <div className="mt-2 max-h-48 overflow-auto rounded-lg border border-white/10 bg-[#0a1530]">
        {filtered.slice(0, 8).map((o) => (
          <button key={o} onClick={() => onChange(o)} className="w-full text-left px-3 py-2 text-sky-100 hover:bg-white/5">
            {o}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="px-3 py-2 text-sky-300/70">No suggestions</div>
        )}
      </div>
    </div>
  )
}

const StepPanel = ({
  index,
  total,
  title,
  description,
  value,
  onChange,
  onNext,
  onBack,
  options,
  icon: Icon = Car,
  disabled = false,
  hint
}) => {
  const progress = (index + 1) / total
  const ref = useRef(null)

  return (
    <section ref={ref} className="snap-start h-screen w-full relative overflow-hidden bg-[#071226]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#071226] via-[#091A34] to-[#0b2042]" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <div className="mb-6 inline-flex items-center gap-2 text-sky-300/90">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs tracking-wider uppercase">Smart guidance</span>
          </div>
          <div className="flex items-center gap-3">
            <Icon className="h-8 w-8 text-sky-300" />
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              {title}
            </h2>
          </div>
          {description && (
            <p className="mt-3 text-sky-200/80">
              {description}
            </p>
          )}

          <div className="mt-8">
            <AutoSuggest
              label="Your selection"
              icon={Icon}
              value={value}
              onChange={onChange}
              options={options}
              disabled={disabled}
              hint={hint}
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={onBack}
              disabled={!onBack}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sky-100/90 ring-1 ring-white/15 hover:bg-white/5 transition ${!onBack ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex-1 mx-6 h-px bg-white/15" />

            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sky-300/80 text-sm">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-sky-600"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span className="min-w-[6ch] text-right">{Math.round(progress * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const useSuggestions = (selections) => {
  const { make } = selections
  return {
    makes: suggestionsData.make,
    models: make && suggestionsData.model[make] ? suggestionsData.model[make] : [],
    years: suggestionsData.years,
    cylinders: suggestionsData.cylinders,
    seats: suggestionsData.seats,
  }
}

export default StepPanel
