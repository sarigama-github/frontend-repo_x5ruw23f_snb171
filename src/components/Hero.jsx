import React from 'react'
import Spline from '@splinetool/react-spline'
import { ChevronDown } from 'lucide-react'

const Hero = ({ onStart }) => {
  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-[#030a1a]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/60 via-[#030a1a]/70 to-[#030a1a]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_10px_30px_rgba(56,189,248,0.25)]">
            AI‑Driven Motor Insurance Quotes
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-sky-200/90">
            A smooth, guided journey to your perfect plan — fast, clear, and a little bit magical.
          </p>
        </div>
        <button
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-white shadow-lg shadow-sky-500/30 transition hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Start your quote
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

export default Hero
