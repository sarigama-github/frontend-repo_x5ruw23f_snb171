import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero = ({ onStart }) => {
  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-[#030a1a]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/70 via-[#030a1a]/80 to-[#030a1a]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
            Motor Insurance Portal
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-sky-200/90">
            Get a personalized quote in a few quick steps.
          </p>
        </div>
        <button
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-500 px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
        >
          Start your quote
        </button>
      </div>
    </section>
  )
}

export default Hero
