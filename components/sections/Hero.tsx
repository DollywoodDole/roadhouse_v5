'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-8 lg:px-16 py-24 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,146,42,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '100ms' }}
      >
        <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-8 font-mono">
          Est. Saskatchewan, Canada · Praetorian Holdings Corp.
        </div>
      </div>

      {/* Logo */}
      <div
        className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '200ms' }}
      >
        <div
          className="text-7xl lg:text-9xl font-light italic leading-none text-rh-text"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Welcome to the{' '}
          <span className="gold-shimmer italic">RoadHouse.</span>
        </div>
      </div>

      <div
        className={`max-w-2xl mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '350ms' }}
      >
        <p className="text-rh-muted text-base leading-relaxed tracking-wide" style={{ fontFamily: 'var(--font-dm-mono)' }}>
          A creator-owned ecosystem at the crossroads of technology, synthesis, and culture.
          Converting streaming attention into community capital and investable IP.{' '}
          <span className="text-gold-pale italic">Discretion isn't a rule — it's a reflex.</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div
        className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '450ms' }}
      >
        <a
          href="https://kick.com/dollywooddole"
          target="_blank"
          rel="noopener noreferrer"
          className="stripe-btn inline-flex items-center gap-2 px-6 py-3 text-rh-black text-sm tracking-widest uppercase font-medium rounded"
        >
          <span className="live-dot" />
          Watch Live on Kick
        </a>
        <button
          onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-medium rounded border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
        >
          ★ Join the Community
        </button>
        <a
          href="https://x.com/dollywooddole"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase font-medium rounded border border-rh-border text-rh-muted hover:text-rh-text hover:border-rh-text/30 transition-colors"
        >
          𝕏 Follow on X
        </a>
      </div>

      {/* Stats row */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '550ms' }}
      >
        {[
          { value: 'Y1', label: 'Phase Active' },
          { value: '$149k', label: 'Revenue Target' },
          { value: '10.5%', label: 'Eff. Tax Rate (SK)' },
          { value: '$300k+', label: 'Grant Potential' },
        ].map(stat => (
          <div key={stat.label} className="border-l border-gold/30 pl-4">
            <div
              className="text-2xl lg:text-3xl font-light text-gold"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {stat.value}
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-rh-muted mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 lg:left-16 flex items-center gap-3 text-rh-faint text-[10px] tracking-widest uppercase">
        <div className="w-8 h-px bg-rh-border" />
        Scroll to explore
      </div>
    </section>
  )
}
