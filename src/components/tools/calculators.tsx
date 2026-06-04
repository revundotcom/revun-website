'use client'

import { useState } from 'react'

/* ── Shared UI ──────────────────────────────────────────────────────────── */

function Field({ label, value, onChange, prefix, suffix, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; prefix?: string; suffix?: string; placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-brand-graphite">{label}</span>
      <span className="flex items-center rounded-xl border border-border bg-white focus-within:border-brand-blue">
        {prefix && <span className="pl-3 text-sm text-[#94A3B8]">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-3 text-base text-brand-graphite outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-[#94A3B8]">{suffix}</span>}
      </span>
    </label>
  )
}

function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6 text-center">
      {children}
    </div>
  )
}

const n = (s: string) => (s === '' ? NaN : Number(s))
const money = (x: number) =>
  x.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

/* ── 1. Rent to income ──────────────────────────────────────────────────── */

export function RentToIncomeCalculator() {
  const [income, setIncome] = useState('')
  const [rent, setRent] = useState('')
  const i = n(income), r = n(rent)
  const ok = i > 0 && r >= 0
  const ratio = ok ? (r / i) * 100 : NaN
  const verdict = ratio <= 30 ? 'Within the standard 30% guideline' : ratio <= 40 ? 'Above 30%, manageable but tight' : 'Above 40%, rent burdened'
  return (
    <div className="rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Gross monthly income" value={income} onChange={setIncome} prefix="$" placeholder="6000" />
        <Field label="Monthly rent" value={rent} onChange={setRent} prefix="$" placeholder="1800" />
      </div>
      {ok && (
        <Result>
          <p className="text-4xl font-extrabold text-brand-blue">{ratio.toFixed(1)}%</p>
          <p className="mt-2 text-sm text-[#475569]">of income goes to rent</p>
          <p className="mt-3 text-sm font-semibold text-brand-graphite">{verdict}</p>
          <p className="mt-1 text-xs text-[#94A3B8]">A common benchmark is the 30% rule, or income of about 3x the rent.</p>
        </Result>
      )}
    </div>
  )
}

/* ── 2. Prorated rent (actual days method) ──────────────────────────────── */

export function ProratedRentCalculator() {
  const [rent, setRent] = useState('')
  const [daysInMonth, setDaysInMonth] = useState('30')
  const [daysOccupied, setDaysOccupied] = useState('')
  const r = n(rent), dim = n(daysInMonth), docc = n(daysOccupied)
  const ok = r > 0 && dim > 0 && docc >= 0 && docc <= dim
  const daily = ok ? r / dim : NaN
  const total = ok ? daily * docc : NaN
  return (
    <div className="rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Monthly rent" value={rent} onChange={setRent} prefix="$" placeholder="2000" />
        <Field label="Days in the month" value={daysInMonth} onChange={setDaysInMonth} suffix="days" />
        <Field label="Days occupied" value={daysOccupied} onChange={setDaysOccupied} suffix="days" placeholder="12" />
      </div>
      {ok && (
        <Result>
          <p className="text-4xl font-extrabold text-brand-blue">{money(total)}</p>
          <p className="mt-2 text-sm text-[#475569]">prorated rent due</p>
          <p className="mt-3 text-xs text-[#94A3B8]">Daily rate {money(daily)} times {docc} days (actual-days method).</p>
        </Result>
      )}
    </div>
  )
}

/* ── 3. Cap rate ────────────────────────────────────────────────────────── */

export function CapRateCalculator() {
  const [noi, setNoi] = useState('')
  const [price, setPrice] = useState('')
  const a = n(noi), p = n(price)
  const ok = a >= 0 && p > 0
  const cap = ok ? (a / p) * 100 : NaN
  return (
    <div className="rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Annual net operating income" value={noi} onChange={setNoi} prefix="$" placeholder="48000" />
        <Field label="Property price or value" value={price} onChange={setPrice} prefix="$" placeholder="650000" />
      </div>
      {ok && (
        <Result>
          <p className="text-4xl font-extrabold text-brand-blue">{cap.toFixed(2)}%</p>
          <p className="mt-2 text-sm text-[#475569]">capitalization rate</p>
          <p className="mt-3 text-xs text-[#94A3B8]">Cap rate = NOI / property value. Most rentals fall in a 4% to 10% range by market.</p>
        </Result>
      )}
    </div>
  )
}

/* ── 4. Cash on cash return ─────────────────────────────────────────────── */

export function CashOnCashCalculator() {
  const [cashFlow, setCashFlow] = useState('')
  const [invested, setInvested] = useState('')
  const c = n(cashFlow), inv = n(invested)
  const ok = inv > 0
  const coc = ok ? (c / inv) * 100 : NaN
  return (
    <div className="rounded-2xl border border-border bg-brand-off-white p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Annual pre-tax cash flow" value={cashFlow} onChange={setCashFlow} prefix="$" placeholder="7200" />
        <Field label="Total cash invested" value={invested} onChange={setInvested} prefix="$" placeholder="120000" />
      </div>
      {ok && (
        <Result>
          <p className="text-4xl font-extrabold text-brand-blue">{coc.toFixed(2)}%</p>
          <p className="mt-2 text-sm text-[#475569]">cash on cash return</p>
          <p className="mt-3 text-xs text-[#94A3B8]">Cash on cash = annual cash flow / total cash invested (down payment, closing, rehab).</p>
        </Result>
      )}
    </div>
  )
}

export const CALCULATOR_MAP = {
  'rent-to-income-calculator': RentToIncomeCalculator,
  'prorated-rent-calculator': ProratedRentCalculator,
  'cap-rate-calculator': CapRateCalculator,
  'cash-on-cash-return-calculator': CashOnCashCalculator,
} as const
