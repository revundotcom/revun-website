'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Plus,
  Search,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  PiggyBank,
  Shield,
  CircleDollarSign,
  Clock,
  Building2,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Banknote,
  HandCoins,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Check,
  X,
  Minus,
  AlertCircle,
  ChevronDown,
  Home,
  Users,
  Star,
  Quote,
  MapPin,
  CheckCircle2,
  Wrench,
} from 'lucide-react'
import { sanitizeJsonLd } from '@/lib/utils'

/* ---------- shared ---------- */
const ease = [0.22, 1, 0.36, 1] as const

function SectionWrapper({
  children,
  id,
  dark,
}: {
  children: React.ReactNode
  id: string
  dark?: boolean
}) {
  return (
    <section id={id} className={`py-16 md:py-20 lg:py-20 ${dark ? 'bg-[#F5F6F8]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string
  title: string
  highlight: string
  description: string
}) {
  return (
    <RevealOnScroll className="mx-auto max-w-2xl text-center">
      <motion.p
        variants={revealItem}
        className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={revealItem}
        className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
      >
        {title} <span className="text-[#176FEB]">{highlight}</span>
      </motion.h2>
      <motion.p
        variants={revealItem}
        className="mx-auto mt-4 max-w-xl text-base text-[#555860] sm:text-lg"
      >
        {description}
      </motion.p>
    </RevealOnScroll>
  )
}

/* ---------- types ---------- */
type Tab = 'wallet' | 'stays' | 'investments'

interface Transaction {
  initials: string
  name: string
  type: string
  time: string
  amount: string
  color: string
  positive?: boolean
}

/* ---------- mock data ---------- */
const TRANSACTIONS: Transaction[] = [
  {
    initials: 'JD',
    name: 'John D',
    type: 'Rent',
    time: '11:12 AM',
    amount: '$2,200.00',
    color: 'text-[#0A1628]',
    positive: true,
  },
  {
    initials: '21',
    name: '2191 43rd Avenue',
    type: 'Maintenance',
    time: '11:12 AM',
    amount: '-$450.52',
    color: 'text-[#E7000B]',
    positive: false,
  },
  {
    initials: 'AO',
    name: 'Aiden O',
    type: 'Advance payment',
    time: '11:12 AM',
    amount: '$4,400.00',
    color: 'text-[#0A1628]',
    positive: true,
  },
  {
    initials: 'CR',
    name: 'Credit',
    type: 'Cleaning',
    time: '09:07 AM',
    amount: '+$250.00',
    color: 'text-[#176FEB]',
    positive: true,
  },
  {
    initials: 'MW',
    name: 'Maria W',
    type: 'Security deposit',
    time: '08:30 AM',
    amount: '$1,850.00',
    color: 'text-[#0A1628]',
    positive: true,
  },
  {
    initials: 'PL',
    name: 'Plumber Co.',
    type: 'Repairs',
    time: 'Yesterday',
    amount: '-$320.00',
    color: 'text-[#E7000B]',
    positive: false,
  },
]

const STAY_TRANSACTIONS: Transaction[] = [
  {
    initials: 'RP',
    name: 'Rent Payment',
    type: 'Monthly',
    time: 'Dec 01',
    amount: '$2,200.00',
    color: 'text-[#0A1628]',
    positive: true,
  },
  {
    initials: 'UT',
    name: 'Utilities',
    type: 'Hydro',
    time: 'Nov 28',
    amount: '-$185.40',
    color: 'text-[#E7000B]',
    positive: false,
  },
  {
    initials: 'PK',
    name: 'Parking',
    type: 'Monthly',
    time: 'Nov 15',
    amount: '$150.00',
    color: 'text-[#0A1628]',
    positive: true,
  },
]

const CHART_DATA = [
  { month: 'Mar', income: 3200, expenses: 1800 },
  { month: 'Apr', income: 2800, expenses: 2200 },
  { month: 'May', income: 3600, expenses: 1500 },
  { month: 'Jun', income: 4000, expenses: 2000 },
  { month: 'Jul', income: 3400, expenses: 2600 },
  { month: 'Aug', income: 3800, expenses: 1900 },
]

const CHART_MAX = 4500

const PAYMENT_METHODS = [
  {
    id: 'apple',
    name: 'Apple Pay',
    desc: 'Recommended',
    icon: CreditCard,
    highlight: true,
  },
  {
    id: 'authorize',
    name: 'authorize.net',
    desc: 'Visa / Mastercard',
    icon: CreditCard,
    highlight: false,
  },
  {
    id: 'bank',
    name: 'Bank deposit',
    desc: 'Cheque, cash',
    icon: Building2,
    highlight: false,
  },
  {
    id: 'bill',
    name: 'Bill payment',
    desc: 'Online banking',
    icon: Receipt,
    highlight: false,
  },
]

const ACTION_BUTTONS = [
  { icon: ArrowDownLeft, label: 'Request', color: 'bg-[#E8F2FE] text-[#176FEB]' },
  { icon: ArrowUpRight, label: 'Send', color: 'bg-[#E8F2FE] text-[#176FEB]' },
  { icon: Wallet, label: 'Withdraw', color: 'bg-[#E8F2FE] text-[#176FEB]' },
  { icon: Plus, label: 'Add', color: 'bg-[#E8F2FE] text-[#176FEB]' },
] as const

const WALLET_FEATURES = [
  {
    icon: Banknote,
    title: 'Instant Payments',
    description: 'Pay rent, dues, and maintenance fees instantly with flexible payment plans.',
  },
  {
    icon: HandCoins,
    title: 'Flex Loans',
    description: 'Access pre-approved loans up to $6,250 with no repayment limits.',
  },
  {
    icon: BarChart3,
    title: 'Investment Tracking',
    description: 'Monitor your property investments with real-time income and expense analytics.',
  },
  {
    icon: Shield,
    title: 'Secure Transfers',
    description: 'Bank-grade security for all transactions with multi-factor authentication.',
  },
  {
    icon: Clock,
    title: 'Auto-Pay',
    description: 'Set up recurring payments and never miss a due date again.',
  },
  {
    icon: PiggyBank,
    title: 'Smart Savings',
    description: 'Automated savings goals that round up transactions toward your targets.',
  },
]

const TABS: { key: Tab; label: string }[] = [
  { key: 'wallet', label: 'Wallet & Dues' },
  { key: 'stays', label: 'My Stays' },
  { key: 'investments', label: 'My Investments' },
]

/* ================================================================== */
/*  Animated bar chart                                                 */
/* ================================================================== */

function AnimatedBarChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="rounded-xl border border-[#E5E7EB] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-heading text-sm font-semibold text-[#0A1628]">
          Income vs Expenses
        </h4>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#176FEB]" />
            <span className="text-xs text-[#555860]">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#E7000B]/60" />
            <span className="text-xs text-[#555860]">Expenses</span>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-4">
        {/* Y-axis */}
        <div
          className="flex flex-col justify-between text-right text-[10px] text-[#555860]"
          style={{ height: 180 }}
        >
          <span>$4.5k</span>
          <span>$3k</span>
          <span>$1.5k</span>
          <span>$0</span>
        </div>

        {/* Bars */}
        <div className="flex flex-1 items-end justify-between gap-3">
          {CHART_DATA.map((d, i) => (
            <div key={d.month} className="flex flex-col items-center gap-1.5">
              <div className="flex items-end gap-1" style={{ height: 180 }}>
                <motion.div
                  className="w-5 rounded-t-md bg-[#176FEB]"
                  initial={{ height: 0 }}
                  animate={inView ? { height: (d.income / CHART_MAX) * 180 } : { height: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease }}
                />
                <motion.div
                  className="w-5 rounded-t-md bg-[#E7000B]/60"
                  initial={{ height: 0 }}
                  animate={inView ? { height: (d.expenses / CHART_MAX) * 180 } : { height: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.08 + 0.1, ease }}
                />
              </div>
              <span className="text-[11px] font-medium text-[#555860]">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Animated counter                                                   */
/* ================================================================== */

function AnimatedValue({
  value,
  prefix = '$',
  className,
}: {
  value: string
  prefix?: string
  className?: string
}) {
  return <span className={className}>{prefix}{value}</span>
}

/* ================================================================== */
/*  Transaction row                                                    */
/* ================================================================== */

function TransactionRow({ tx, index }: { tx: Transaction; index: number }) {
  return (
    <motion.li
      className="flex items-center gap-3 py-3.5"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F2FE] font-heading text-xs font-semibold text-[#176FEB]">
        {tx.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#0A1628]">{tx.name}</p>
        <p className="text-xs text-[#555860]">
          {tx.type} &middot; {tx.time}
        </p>
      </div>
      <span className={`font-heading text-sm font-semibold ${tx.color}`}>{tx.amount}</span>
    </motion.li>
  )
}

/* ================================================================== */
/*  SECTION 1 - Hero                                                   */
/* ================================================================== */

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E7EB] bg-white pb-16 pt-12 lg:pb-20 lg:pt-16">
      {/* Ambient blobs */}
      <div
        className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#176FEB]/[0.04] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#176FEB]/[0.03] blur-[100px]"
        aria-hidden="true"
      />

      <RevealOnScroll className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          variants={revealItem}
          className="font-heading text-xs font-semibold uppercase tracking-widest text-[#176FEB]"
        >
          Wallet
        </motion.p>
        <motion.h1
          variants={revealItem}
          className="mt-3 font-display text-4xl font-bold text-[#0A1628] sm:text-5xl lg:text-6xl"
        >
          Your Property <span className="text-[#176FEB]">Financials</span>
        </motion.h1>
        <motion.p
          variants={revealItem}
          className="mx-auto mt-5 max-w-2xl text-base text-[#555860] sm:text-lg"
        >
          See what you owe, track payments, manage investments, and send or withdraw funds
          - all from one dashboard.
        </motion.p>

        {/* Quick action buttons */}
        <motion.div variants={revealItem} className="mt-10 flex items-center justify-center gap-8">
          {ACTION_BUTTONS.map((action) => (
            <button key={action.label} className="group flex flex-col items-center gap-2.5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F2FE] text-[#176FEB] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#176FEB] group-hover:text-white group-hover:shadow-lg">
                <action.icon className="size-5" />
              </span>
              <span className="text-xs font-medium text-[#555860] transition-colors group-hover:text-[#176FEB]">
                {action.label}
              </span>
            </button>
          ))}
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ================================================================== */
/*  SECTION 2 - My Finances Dashboard                                  */
/* ================================================================== */

function FinancesDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('wallet')
  const [balanceVisible, setBalanceVisible] = useState(true)

  return (
    <SectionWrapper id="finances" dark>
      <SectionHeader
        eyebrow="Dashboard"
        title="Manage Your"
        highlight="Finances"
        description="Track dues, monitor stays, and oversee your investments - all in one unified dashboard."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        {/* Left: Dashboard Card (3 cols) */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-[#0A1628]">My Finances</h3>
            <span className="rounded-full bg-[#F5F6F8] px-3 py-1 text-xs text-[#555860]">
              User ID: 34343243
            </span>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-1 rounded-xl border border-[#E5E7EB] p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-1 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-[#176FEB] text-white shadow-sm'
                    : 'text-[#555860] hover:bg-[#F3F4F6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === 'wallet' && (
              <div className="space-y-5">
                {/* Amount due */}
                <div>
                  <p className="text-sm text-[#555860]">Amount due</p>
                  <p className="font-heading text-3xl font-bold text-[#0A1628]">
                    <AnimatedValue value="2,500.00" />
                  </p>
                  <p className="mt-1 text-sm text-[#555860]">Due by: 31/12/2025</p>
                </div>

                {/* Payment buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="/wallet/pay/"
                    className="flex h-12 items-center justify-center rounded-xl bg-[#176FEB] font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1260d1] hover:shadow-md"
                  >
                    Pay $57/week
                  </a>
                  <a
                    href="/wallet/pay/"
                    className="flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] font-heading text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-[#176FEB] hover:text-[#176FEB]"
                  >
                    Pay full
                  </a>
                </div>

                {/* Flex loan promo */}
                <div className="rounded-xl border border-[#FCD34D] bg-[#FEF3C7] p-4">
                  <p className="font-heading text-sm font-semibold text-[#0A1628]">
                    Congrats! You are eligible for up to $6,250 loan
                  </p>
                  <p className="mt-1 text-xs text-[#555860]">No repayment limit!</p>
                  <a
                    href="/wallet/"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1260d1]"
                  >
                    Get Flex Loan <ChevronRight className="size-4" />
                  </a>
                </div>

                {/* Wallet balance */}
                <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#555860]">Wallet balance</span>
                    <button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="text-[#555860] transition-colors hover:text-[#176FEB]"
                    >
                      {balanceVisible ? (
                        <Eye className="size-3.5" />
                      ) : (
                        <EyeOff className="size-3.5" />
                      )}
                    </button>
                  </div>
                  <span className="font-heading text-xl font-bold text-[#0A1628]">
                    {balanceVisible ? '$2,400.00' : '••••••'}
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'stays' && (
              <div className="space-y-5">
                {/* Financial overview */}
                <p className="font-heading text-sm font-semibold text-[#0A1628]">
                  Financial overview
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Deposits', value: '$4,650.00', color: 'text-[#0A1628]' },
                    { label: 'Payments', value: '$27,621.98', color: 'text-[#176FEB]' },
                    { label: 'Posted Items', value: '$29,821.98', color: 'text-[#E7000B]' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-[#E5E7EB] p-3 transition-colors hover:border-[#176FEB]/30"
                    >
                      <p className="text-xs text-[#555860]">{stat.label}</p>
                      <p className={`font-heading text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Unpaid items */}
                <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4">
                  <span className="text-sm text-[#555860]">Unpaid items</span>
                  <a
                    href="/wallet/"
                    className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-[#176FEB] transition-colors hover:text-[#1260d1]"
                  >
                    $1,250.00 <ChevronRight className="size-4" />
                  </a>
                </div>

                {/* Transactions */}
                <div className="space-y-1">
                  <p className="font-heading text-sm font-semibold text-[#0A1628]">
                    Transactions
                  </p>
                  <ul className="divide-y divide-[#E5E7EB]">
                    {STAY_TRANSACTIONS.map((tx, i) => (
                      <TransactionRow key={`${tx.name}-${tx.time}`} tx={tx} index={i} />
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'investments' && (
              <div className="space-y-5">
                {/* Net income */}
                <div>
                  <p className="text-sm text-[#555860]">Net income</p>
                  <p className="font-heading text-3xl font-bold text-[#0A1628]">
                    <AnimatedValue value="200,900.00" />
                  </p>
                </div>

                {/* Income / Expenses row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] p-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#E8F2FE]">
                      <TrendingUp className="size-4 text-[#176FEB]" />
                    </span>
                    <div>
                      <p className="text-xs text-[#555860]">Income</p>
                      <p className="font-heading text-base font-bold text-[#176FEB]">
                        $246,900.00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] p-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#FEE2E2]">
                      <TrendingDown className="size-4 text-[#E7000B]" />
                    </span>
                    <div>
                      <p className="text-xs text-[#555860]">Expenses</p>
                      <p className="font-heading text-base font-bold text-[#E7000B]">
                        $85,621.98
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <AnimatedBarChart />
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Transactions (2 cols) */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-[#0A1628]">
              Wallet transactions
            </h3>
            <button className="rounded-lg p-1.5 text-[#555860] transition-colors hover:bg-[#F5F6F8] hover:text-[#0A1628]">
              <Search className="size-4" />
            </button>
          </div>

          <ul className="mt-3 divide-y divide-[#E5E7EB]">
            {TRANSACTIONS.map((tx, i) => (
              <TransactionRow key={`${tx.name}-${tx.time}-${tx.amount}`} tx={tx} index={i} />
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 3 - Payment Methods                                        */
/* ================================================================== */

function PaymentMethodsSection() {
  const [selected, setSelected] = useState('apple')

  return (
    <SectionWrapper id="payments">
      <SectionHeader
        eyebrow="Payments"
        title="Multiple Ways to"
        highlight="Pay"
        description="Choose from secure payment methods - Apple Pay, credit cards, bank deposits, or online bill pay."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Left: Payment methods */}
        <RevealOnScroll className="space-y-3" stagger={0.06}>
          {PAYMENT_METHODS.map((method) => (
            <motion.button
              key={method.id}
              variants={revealItem}
              onClick={() => setSelected(method.id)}
              className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                selected === method.id
                  ? 'border-[#176FEB] bg-[#E8F2FE]/50 shadow-sm'
                  : 'border-[#E5E7EB] bg-white hover:border-[#176FEB]/30'
              }`}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                  selected === method.id ? 'bg-[#176FEB] text-white' : 'bg-[#F5F6F8] text-[#555860]'
                }`}
              >
                <method.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#0A1628]">{method.name}</p>
                <p className="text-xs text-[#555860]">{method.desc}</p>
              </div>
              {method.highlight && (
                <span className="rounded-full bg-[#176FEB] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  Recommended
                </span>
              )}
              <span
                className={`flex size-5 items-center justify-center rounded-full border-2 ${
                  selected === method.id ? 'border-[#176FEB]' : 'border-[#D3D5DB]'
                }`}
              >
                {selected === method.id && (
                  <span className="size-2.5 rounded-full bg-[#176FEB]" />
                )}
              </span>
            </motion.button>
          ))}
        </RevealOnScroll>

        {/* Right: Breakdown */}
        <motion.div
          className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <h3 className="font-heading text-lg font-bold text-[#0A1628]">Payment Breakdown</h3>

          <ul className="mt-5 space-y-4">
            {[
              { label: 'Previous due', amount: '$2,000.00' },
              { label: 'Rent - Dec 2025', amount: '$2,000.00' },
              { label: 'Parking - Dec 2025', amount: '$130.00' },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-[#555860]">{item.label}</span>
                <span className="font-heading text-sm font-semibold text-[#0A1628]">
                  {item.amount}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-[#E5E7EB] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-heading text-base font-bold text-[#0A1628]">Total</span>
              <span className="font-heading text-2xl font-bold text-[#176FEB]">$4,130.00</span>
            </div>
          </div>

          <a
            href="/wallet/pay/"
            className="mt-6 flex h-12 items-center justify-center rounded-xl bg-[#176FEB] font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1260d1] hover:shadow-md"
          >
            Proceed to Pay <ArrowRight className="ml-2 size-4" />
          </a>

          <p className="mt-3 text-center text-xs text-[#555860]">
            <Shield className="mr-1 inline size-3" />
            256-bit SSL encrypted &middot; PCI DSS compliant
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 4 - Features Grid                                          */
/* ================================================================== */

function FeaturesSection() {
  return (
    <SectionWrapper id="features" dark>
      <SectionHeader
        eyebrow="Features"
        title="Everything You Need to Manage"
        highlight="Money"
        description="From instant payments to investment tracking - powerful financial tools built for property management."
      />

      <RevealOnScroll className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {WALLET_FEATURES.map((feature) => (
          <motion.div
            key={feature.title}
            variants={revealItem}
            className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-[#176FEB]/30 hover:shadow-card-hover"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#E8F2FE] text-[#176FEB] transition-colors group-hover:bg-[#176FEB] group-hover:text-white">
              <feature.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-base font-semibold text-[#0A1628]">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#555860]">{feature.description}</p>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 5 - Receipt Preview                                        */
/* ================================================================== */

function ReceiptPreviewSection() {
  return (
    <SectionWrapper id="receipt">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: Text */}
        <RevealOnScroll>
          <motion.p
            variants={revealItem}
            className="font-heading text-sm font-semibold uppercase tracking-wider text-[#176FEB]"
          >
            Receipts
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
          >
            Instant Payment <span className="text-[#176FEB]">Confirmations</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-4 max-w-md text-base text-[#555860] sm:text-lg"
          >
            Every transaction generates a detailed receipt you can view, download, or share.
            Full transparency on every dollar.
          </motion.p>
          <motion.div variants={revealItem} className="mt-6 space-y-3">
            {[
              'Downloadable PDF receipts',
              'Complete transaction audit trail',
              'Shared payment tracking between parties',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle className="size-5 shrink-0 text-[#176FEB]" />
                <span className="text-sm text-[#0A1628]">{item}</span>
              </div>
            ))}
          </motion.div>
        </RevealOnScroll>

        {/* Right: Receipt card mockup */}
        <motion.div
          className="mx-auto w-full max-w-sm rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-editorial"
          initial={{ opacity: 0, y: 24, rotateY: -4 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Status badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#16A34A]">
              <CheckCircle className="size-3.5" /> Paid
            </span>
          </div>

          <p className="mt-4 text-center font-heading text-3xl font-bold text-[#0A1628]">
            $2,500.00
          </p>

          <div className="mt-6 space-y-3 border-t border-[#E5E7EB] pt-5">
            {[
              { label: 'Type', value: 'Rent' },
              { label: 'Paid by', value: 'Amelia W' },
              { label: 'Received by', value: 'RVPM' },
              { label: 'Paid to', value: 'John D' },
              { label: 'Case no.', value: '87654321' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-[#555860]">{row.label}</span>
                <span className="text-sm font-medium text-[#0A1628]">{row.value}</span>
              </div>
            ))}
          </div>

          <button className="mt-6 flex h-10 w-full items-center justify-center rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#0A1628] transition-all hover:border-[#176FEB] hover:text-[#176FEB]">
            Download Receipt
          </button>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  SECTION 6 - CTA                                                    */
/* ================================================================== */

function CTASection() {
  return (
    <section className="bg-[#F5F6F8] py-16 lg:py-20">
      <RevealOnScroll className="mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          variants={revealItem}
          className="font-display text-3xl font-normal text-[#0A1628] md:text-4xl lg:text-5xl"
        >
          Take Control of Your <span className="text-[#4A91F0]">Property Finances</span>
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-4 max-w-xl text-base text-[#555860]">
          Join thousands of property managers and tenants who use Revun to simplify payments,
          track investments, and stay on top of their finances.
        </motion.p>
        <motion.div variants={revealItem} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#176FEB] px-8 font-heading text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1260d1] hover:shadow-lg"
          >
            Get Started <ArrowRight className="ml-2 size-4" />
          </a>
          <a
            href="/demo/"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 font-heading text-sm font-semibold text-[#0A1628] transition-all hover:-translate-y-0.5 hover:border-[#E5E7EB] hover:bg-[#176FEB]/5"
          >
            Book a Demo
          </a>
        </motion.div>
      </RevealOnScroll>
    </section>
  )
}

/* ================================================================== */
/*  NEW: Scroll Progress Bar                                          */
/* ================================================================== */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-[#176FEB]"
    />
  )
}

/* ================================================================== */
/*  NEW: Sticky Section Nav                                           */
/* ================================================================== */

function SectionNav() {
  const links = [
    { href: '#dashboard', label: 'Dashboard' },
    { href: '#payments', label: 'Payments' },
    { href: '#features', label: 'Features' },
    { href: '#receipt', label: 'Receipts' },
    { href: '#comparison', label: 'Compare' },
    { href: '#faq', label: 'FAQ' },
  ]
  return (
    <nav aria-label="Wallet sections" className="sticky top-0 z-40 hidden border-b border-[#E5E7EB] bg-white/80 backdrop-blur md:block">
      <div className="mx-auto max-w-6xl overflow-x-auto px-6">
        <ul className="flex items-center gap-2 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="inline-flex items-center rounded-full border border-transparent px-3 py-1.5 text-xs font-heading font-semibold text-[#555860] transition hover:border-[#E5E7EB] hover:bg-[#F5F6F8] hover:text-[#176FEB]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

/* ================================================================== */
/*  NEW: Wallet Hero (parallax + mockup)                              */
/* ================================================================== */

function WalletHero() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const badges = [
    { icon: Banknote, label: 'Interac e-Transfer' },
    { icon: ShieldCheck, label: 'PCI-DSS L1' },
    { icon: Lock, label: 'PIPEDA' },
    { icon: CheckCircle2, label: 'FINTRAC' },
  ]
  const stats = [
    { value: '$2.4B', label: 'Processed annually' },
    { value: '10', label: 'Canadian provinces' },
    { value: '< 2s', label: 'Interac transfers' },
    { value: '100%', label: 'PIPEDA compliant' },
  ]
  return (
    <section id="hero" ref={ref} className="relative overflow-hidden bg-white py-20 md:py-28">
      <motion.div aria-hidden style={{ y: gridY }} className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </motion.div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.05 }} className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#E8F2FE] px-3 py-1">
              <Wallet className="h-3.5 w-3.5 text-[#176FEB]" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#176FEB]">Wallet</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.15 }} className="mt-4 font-display text-5xl font-normal leading-tight md:text-6xl text-[#0A1628]">
              Your Property Financials, <span className="text-[#176FEB]">unified.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.25 }} className="mt-5 max-w-xl text-lg text-[#555860]">
              One wallet for rent, deposits, and owner disbursements — every Interac, PAD, and card payment reconciled to the lease. Receipts, taxes, and P&amp;L ready whenever CRA asks.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.35 }} className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup/" className="inline-flex items-center gap-2 rounded-xl bg-[#176FEB] px-6 py-3 text-sm font-heading font-semibold text-white transition hover:brightness-110">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#dashboard" className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-heading font-semibold text-[#0A1628] transition hover:border-[#176FEB] hover:text-[#176FEB]">
                See it in action
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.45 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {badges.map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-xs text-[#555860]">
                  <b.icon className="h-4 w-4 text-[#176FEB]" /><span>{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div style={{ y: cardY }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.3 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#1a2a42] p-6 text-white shadow-[0_30px_80px_-20px_rgba(10,22,40,0.45)]">
              <div className="absolute right-5 top-5 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#176FEB] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#176FEB]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/70">Live</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/60">
                <Wallet className="h-3.5 w-3.5" /> Available Balance
              </div>
              <div className="mt-2 font-display text-5xl leading-none">
                $8,420<span className="text-3xl text-white/70">.55</span>
              </div>
              <div aria-hidden className="my-5 h-px w-full border-t border-dashed border-white/15" />
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-white/50">This month</div>
                  <div className="mt-0.5 font-heading font-semibold text-[#7FB4F6]">+$1,850.00</div>
                </div>
                <div className="text-right">
                  <div className="text-white/50">Last transaction</div>
                  <div className="mt-0.5 font-heading font-semibold text-white">Mar 1 · Rent paid</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: CreditCard, label: 'Add' },
                  { icon: ArrowRight, label: 'Send' },
                  { icon: Banknote, label: 'Withdraw' },
                ].map((a) => (
                  <div key={a.label} className="flex flex-col items-center gap-1.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                      <a.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-white/60">{a.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-white/70" />
                  <span className="text-[11px] text-white/70">RBC Royal Bank</span>
                </div>
                <span className="font-mono text-[11px] tracking-wider text-white/80">•••• 4829</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.55 }} className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFBFC] p-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-[#0A1628]">{s.value}</div>
              <div className="mt-1 text-xs text-[#555860]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  NEW: Wallet Problem (before / after)                              */
/* ================================================================== */

function WalletProblemSection() {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const leftRef = useRef<HTMLDivElement | null>(null)
  const leftInView = useInView(leftRef, { once: true, margin: '-60px' })
  const rightRef = useRef<HTMLDivElement | null>(null)
  const rightInView = useInView(rightRef, { once: true, margin: '-60px' })
  const oldWay = [
    'E-transfers land in a personal inbox, not a ledger',
    'Receipts live in email attachments, lose them once',
    'Owner disbursements are manual bank runs',
    'Year-end tax prep takes days of spreadsheet work',
  ]
  const revunWay = [
    'Every Interac/PAD/card payment auto-matched to the lease',
    'Receipts generated and archived per transaction',
    'Owner disbursements scheduled and wired automatically',
    'T5, NR4, and property P&L exported in one click',
  ]
  return (
    <SectionWrapper id="problem" dark>
      <motion.div ref={headerRef} initial={{ opacity: 0, y: 12 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.1 }} className="mb-12 max-w-3xl lg:mb-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E7000B]" />
          <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#555860]">Why wallets break</span>
        </div>
        <h2 className="font-display text-4xl font-normal md:text-5xl text-[#0A1628]">
          Most rental money moves on <span className="text-[#176FEB]">scattered rails.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[#555860]">
          Banks, inboxes, spreadsheets, accountants — each holds a piece of the story. Revun wallet pulls every cent onto one Canadian ledger, reconciled in real time.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div ref={leftRef} initial={{ opacity: 0, x: -16 }} animate={leftInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.15 }} className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
          <div className="relative h-56 w-full overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80" alt="Scattered receipts and spreadsheets" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <Clock className="h-3.5 w-3.5 text-[#E7000B]" />
              <span className="text-xs font-heading font-semibold text-[#0A1628]">3-5 days reconciliation</span>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E7000B]/10 px-3 py-1">
              <X className="h-3.5 w-3.5 text-[#E7000B]" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#E7000B]">Status quo</span>
            </div>
            <ul className="space-y-3">
              {oldWay.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#E7000B]" />
                  <span className="text-sm text-[#0A1628]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div ref={rightRef} initial={{ opacity: 0, x: 16 }} animate={rightInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.25 }} className="relative overflow-hidden rounded-2xl border border-[#176FEB]/30 bg-white shadow-[0_30px_80px_-30px_rgba(23,111,235,0.45)]">
          <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl ring-1 ring-inset ring-[#176FEB]/20" />
          <div className="relative h-56 w-full overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80" alt="Unified wallet dashboard on laptop" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#176FEB]/50 to-transparent" />
            <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#176FEB]" />
              <span className="text-xs font-heading font-semibold text-[#0A1628]">One ledger, auto-reconciled</span>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F2FE] px-3 py-1">
              <Check className="h-3.5 w-3.5 text-[#176FEB]" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#176FEB]">With Revun</span>
            </div>
            <ul className="space-y-3">
              {revunWay.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176FEB]" />
                  <span className="text-sm text-[#0A1628]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  NEW: Wallet Use Cases                                             */
/* ================================================================== */

function WalletUseCases() {
  const tiles = [
    { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', alt: 'Tenant paying rent on phone', Icon: Home, role: 'Tenants', title: 'For Tenants', desc: 'Pay rent via PAD, Interac, or card. See every receipt. Build credit with on-time rent reporting.', href: '/solutions/tenants/' },
    { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', alt: 'Landlord reviewing wallet dashboard', Icon: Users, role: 'Owners', title: 'Self-Managing Landlords', desc: 'Collect rent, track expenses, disburse to co-owners, and export T5s in one dashboard.', href: '/solutions/self-managing-owners/' },
    { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', alt: 'PMC office', Icon: Building2, role: 'PMCs', title: 'Property Management', desc: 'Trust accounting, owner disbursements, automated reconciliation across thousands of units.', href: '/solutions/property-management-companies/' },
    { img: 'https://images.unsplash.com/photo-1581092918484-8313ec41389b?auto=format&fit=crop&w=800&q=80', alt: 'Technician reviewing invoice', Icon: Wrench, role: 'Vendors', title: 'Maintenance Companies', desc: 'Get paid within 48h of work completion. No chasing invoices. Full remittance history.', href: '/solutions/maintenance-companies/' },
  ]
  return (
    <SectionWrapper id="use-cases" dark>
      <SectionHeader eyebrow="Built for" title="Money moves that" highlight="match your role." description="Tenants pay and track. Owners track disbursements. Property managers settle every ledger without a spreadsheet." />
      <RevealOnScroll className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <motion.div key={t.href} variants={revealItem}>
            <Link href={t.href} className="group block h-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:border-[#176FEB]/40 hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={t.img} alt={t.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <t.Icon className="h-4 w-4 text-[#176FEB]" aria-hidden />
                  <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#176FEB]">{t.role}</span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold text-[#0A1628]">{t.title}</h3>
                <p className="mt-1 text-sm text-[#555860]">{t.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#176FEB]">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  NEW: Wallet Testimonials                                          */
/* ================================================================== */

function WalletTestimonials() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const testimonials = [
    { quote: 'We moved $600K in rent through Revun Wallet last quarter. Zero manual reconciliation. Interac settles in seconds, PAD settles overnight — everything matched to the lease automatically.', name: 'Caleb Nguyen', title: 'CFO · Pinnacle Residences', location: 'Toronto, ON', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', alt: 'Caleb Nguyen, CFO at Pinnacle Residences' },
    { quote: 'Owner disbursements used to take me three days each month. Revun Wallet schedules every payout to the right trust account, files the T5, and emails the statement. I got my weekends back.', name: 'Isabela Cruz', title: 'Principal Broker · Cityline Realty', location: 'Vancouver, BC', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', alt: 'Isabela Cruz, Principal Broker at Cityline Realty' },
    { quote: "Tenants love that rent receipts land instantly in the app. We cut support tickets in half once people stopped asking 'did my rent go through?' every month.", name: 'David Okonkwo', title: 'VP Operations · GreenBranch Property Group', location: 'Winnipeg, MB', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', alt: 'David Okonkwo, VP Operations at GreenBranch' },
  ]
  const stats = [
    { number: '$2.4B', label: 'Processed in 2025' },
    { number: '< 2s', label: 'Interac settlement' },
    { number: '99.99%', label: 'Uptime' },
    { number: '0', label: 'Fraud losses*' },
  ]
  return (
    <SectionWrapper id="testimonials">
      <SectionHeader eyebrow="Proof" title="Canadian operators are moving" highlight="money in seconds." description="Real property managers, real numbers — from Q1 2026 Revun Wallet customers." />
      <div ref={ref} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 * (i + 1), ease }}>
            <div className="relative h-full rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all hover:border-[#176FEB]/40 hover:shadow-sm md:p-8">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-[#176FEB]/10" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-[#176FEB] stroke-[#176FEB]" />
                ))}
              </div>
              <p className="relative z-10 font-display text-lg leading-snug text-[#0A1628]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-6">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={t.photo} alt={t.alt} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-bold text-[#0A1628]">{t.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-[#555860]">
                    <Building2 className="h-3 w-3 shrink-0" /><span className="truncate">{t.title}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-[#555860]">
                    <MapPin className="h-3 w-3 shrink-0" /><span className="truncate">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-[#176FEB]/20 bg-[#176FEB]/5 p-6 md:p-8">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:divide-x sm:divide-[#E5E7EB]">
          {stats.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <div className="font-display text-2xl text-[#0A1628] md:text-3xl">{s.number}</div>
              <div className="mt-2 text-xs uppercase tracking-wide text-[#555860]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[#555860]">*Across Revun Wallet customers in 2025.</p>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  NEW: Wallet Comparison                                            */
/* ================================================================== */

type WalletStatus = 'yes' | 'no' | 'partial'
interface WalletComparisonRow {
  feature: string
  revun: string
  stripe: string
  bank: string
  rentmoola: string
  status: { revun: WalletStatus; stripe: WalletStatus; bank: WalletStatus; rentmoola: WalletStatus }
}

function WalletComparison() {
  const columns = [
    { key: 'feature', label: 'Feature' },
    { key: 'revun', label: 'Revun', highlight: true },
    { key: 'stripe', label: 'Stripe / Square' },
    { key: 'bank', label: 'Canadian Bank Tools' },
    { key: 'rentmoola', label: 'RentMoola / e-Transfer' },
  ]
  const rows: WalletComparisonRow[] = [
    { feature: 'Interac e-Transfer, PAD, card', revun: 'All three, native', stripe: 'Card only, no Interac', bank: 'PAD + Interac, no card portal', rentmoola: 'Interac + PAD only', status: { revun: 'yes', stripe: 'no', bank: 'partial', rentmoola: 'partial' } },
    { feature: 'Auto-match to lease + unit', revun: 'Every payment linked', stripe: 'Not applicable', bank: 'Manual reconciliation', rentmoola: 'Partial lease matching', status: { revun: 'yes', stripe: 'no', bank: 'no', rentmoola: 'partial' } },
    { feature: 'Owner disbursements + trust accounting', revun: 'Scheduled, trust-compliant', stripe: 'Not applicable', bank: 'Manual transfers', rentmoola: 'Not included', status: { revun: 'yes', stripe: 'no', bank: 'no', rentmoola: 'no' } },
    { feature: 'Rent reporting to Equifax', revun: 'Via LCB, one toggle', stripe: 'Not included', bank: 'Not included', rentmoola: 'Separate product', status: { revun: 'yes', stripe: 'no', bank: 'no', rentmoola: 'partial' } },
    { feature: 'T5 / NR4 generation', revun: 'Auto-generated per owner', stripe: '1099 only (US)', bank: 'Manual tax paperwork', rentmoola: 'Not included', status: { revun: 'yes', stripe: 'no', bank: 'no', rentmoola: 'no' } },
    { feature: 'Receipt archive per transaction', revun: 'PDF + email, permanent', stripe: 'Generic receipt', bank: 'Statement only', rentmoola: 'Basic receipt', status: { revun: 'yes', stripe: 'partial', bank: 'partial', rentmoola: 'partial' } },
    { feature: 'Vendor / maintenance payouts', revun: '48h payout on completion', stripe: 'Generic payouts', bank: 'Manual transfer per vendor', rentmoola: 'Not included', status: { revun: 'yes', stripe: 'partial', bank: 'no', rentmoola: 'no' } },
    { feature: 'Canadian compliance (FINTRAC, PIPEDA)', revun: 'Native, province-aware', stripe: 'US-first', bank: 'Yes, but not property-aware', rentmoola: 'Partial', status: { revun: 'yes', stripe: 'no', bank: 'partial', rentmoola: 'partial' } },
  ]
  const StatusIcon = ({ status }: { status: WalletStatus }) => {
    if (status === 'yes') return <Check className="h-4 w-4 shrink-0 text-[#176FEB]" strokeWidth={3} />
    if (status === 'no') return <X className="h-4 w-4 shrink-0 text-[#E7000B]" strokeWidth={3} />
    return <Minus className="h-4 w-4 shrink-0 text-[#D3D5DB]" strokeWidth={3} />
  }
  return (
    <SectionWrapper id="comparison" dark>
      <SectionHeader eyebrow="vs. the rest" title="Why generic payment tools" highlight="break property operations." description="Moving money is easy. Moving money that reconciles to leases, units, and owners is the hard part." />
      <RevealOnScroll>
        <motion.div variants={revealItem} className="mt-14 overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm">
          <table className="w-full min-w-[900px] border-collapse bg-white">
            <thead>
              <tr className="bg-[#0A1628]">
                {columns.map((col) => (
                  <th key={col.key} className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide ${col.highlight ? 'border-l-4 border-[#176FEB] bg-[#176FEB] text-white' : 'text-white/80'} ${col.key === 'feature' ? 'sticky left-0 z-10 bg-[#0A1628] min-w-[220px]' : 'min-w-[170px]'}`}>
                    <div className="flex items-center gap-2">
                      {col.highlight && <ShieldCheck className="h-4 w-4" />}
                      {col.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const zebra = i % 2 === 1 ? 'bg-[#FAFBFC]' : 'bg-white'
                return (
                  <tr key={row.feature} className={`${zebra} border-t border-[#E5E7EB]`}>
                    <td className={`sticky left-0 z-10 border-r border-[#E5E7EB] px-5 py-4 ${zebra}`}>
                      <div className="text-sm font-semibold text-[#0A1628]">{row.feature}</div>
                    </td>
                    <td className="border-l-4 border-[#176FEB] bg-[#E8F2FE] px-5 py-4">
                      <div className="flex items-start gap-2"><StatusIcon status={row.status.revun} /><span className="text-sm font-semibold text-[#0A1628]">{row.revun}</span></div>
                    </td>
                    <td className="px-5 py-4"><div className="flex items-start gap-2"><StatusIcon status={row.status.stripe} /><span className="text-sm text-[#555860]">{row.stripe}</span></div></td>
                    <td className="px-5 py-4"><div className="flex items-start gap-2"><StatusIcon status={row.status.bank} /><span className="text-sm text-[#555860]">{row.bank}</span></div></td>
                    <td className="px-5 py-4"><div className="flex items-start gap-2"><StatusIcon status={row.status.rentmoola} /><span className="text-sm text-[#555860]">{row.rentmoola}</span></div></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </RevealOnScroll>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-[#555860]">Comparison based on publicly listed features as of 2026.</p>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  NEW: Wallet FAQ                                                   */
/* ================================================================== */

const WALLET_FAQS = [
  { q: 'Does Revun Wallet work with my existing Canadian bank?', a: 'Yes. Revun connects to every Canadian chartered bank (RBC, TD, BMO, Scotia, CIBC, National Bank, credit unions) for PAD, Interac e-Transfer, and EFT. Your funds settle directly into your bank.' },
  { q: 'How fast do transfers settle?', a: 'Interac e-Transfer settles in seconds. Pre-Authorized Debit (PAD) settles overnight (1-2 business days). Cards settle in 2-3 business days. Payouts to vendors arrive within 48h of work completion.' },
  { q: 'Is this trust-account compliant?', a: "Yes. Revun Wallet supports segregated trust accounts for property management companies, with real-time balance tracking per property and auto-generated trust reports for each province's regulatory body." },
  { q: 'Can I report rent to Equifax for tenants building credit?', a: 'Yes. We partner with the Landlord Credit Bureau (LCB) to report on-time rent payments to Equifax Canada. Tenants opt in, and every on-time PAD payment is reported automatically.' },
  { q: 'How does owner disbursement work?', a: "After rent is received and reconciled, Revun automatically calculates management fees, subtracts expenses, and schedules disbursements to each owner's bank. You approve the batch; Revun handles the rest." },
  { q: 'What about taxes — T5s, NR4s?', a: 'Revun auto-generates T5 slips for Canadian owner distributions and NR4 for non-resident owners. Exported as CSV or PDF, pre-filled with CRA-formatted data for you or your accountant.' },
  { q: 'Is my payment data safe?', a: 'Yes. Revun is PCI-DSS Level 1 certified and FINTRAC-registered. Card details are tokenized — raw card numbers never touch Revun servers. All data is encrypted at rest with AES-256 and stored on Canadian servers.' },
  { q: 'Can I export all transaction data?', a: 'Yes. Every payment, receipt, disbursement, and fee is exportable as CSV, PDF, or via API. Your data is yours — you can migrate to any system at any time.' },
] as const

function WalletFAQ() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: WALLET_FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return (
    <SectionWrapper id="faq">
      <SectionHeader eyebrow="FAQ" title="Questions we hear from" highlight="finance teams." description="Straight answers on rails, compliance, trust accounting, and data portability." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(faqJsonLd) }} />
      <RevealOnScroll className="mx-auto mt-12 max-w-3xl">
        {WALLET_FAQS.map((item, idx) => (
          <motion.div key={idx} variants={revealItem}>
            <details className="group border-b border-[#E5E7EB] [&[open]>summary>svg]:rotate-180">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                <span className="text-base font-semibold text-[#0A1628] sm:text-lg">{item.q}</span>
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#555860] transition-transform duration-300" aria-hidden="true" />
              </summary>
              <p className="pb-5 pr-10 text-sm leading-relaxed text-[#555860] sm:text-base">{item.a}</p>
            </details>
          </motion.div>
        ))}
      </RevealOnScroll>
    </SectionWrapper>
  )
}

/* ================================================================== */
/*  NEW: Wallet Final CTA (dark)                                      */
/* ================================================================== */

function WalletCTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#0A1628] px-6 py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(23,111,235,0.28), rgba(23,111,235,0.08), transparent 75%)' }} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#176FEB]/40 to-transparent" />
      <RevealOnScroll className="relative mx-auto max-w-3xl text-center">
        <motion.div variants={revealItem}>
          <span className="inline-flex items-center rounded-full border border-[#176FEB]/30 bg-[#176FEB]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#176FEB]">
            <Wallet className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            Move money smarter
          </span>
        </motion.div>
        <motion.h2 variants={revealItem} className="mt-6 font-display text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl">
          Stop wrangling bank statements. <span className="text-[#176FEB]">Start closing the books.</span>
        </motion.h2>
        <motion.p variants={revealItem} className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
          Try Revun Wallet free for 14 days. No setup fees, no minimums.
        </motion.p>
        <motion.div variants={revealItem} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/signup/" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#176FEB] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(23,111,235,0.8)] transition-all hover:brightness-110 hover:shadow-[0_0_50px_-4px_rgba(23,111,235,0.9)]">
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link href="/demo/" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15">
            Book a Demo
          </Link>
        </motion.div>
        <motion.p variants={revealItem} className="mt-8 text-xs text-white/50">
          Questions? <Link href="/contact/" className="text-[#176FEB] transition-colors hover:text-white">Talk to our finance team →</Link>
        </motion.p>
      </RevealOnScroll>
    </section>
  )
}

/* ================================================================== */
/*  Main export                                                        */
/* ================================================================== */

export function WalletDashboardClient() {
  return (
    <main>
      <ScrollProgressBar />
      <WalletHero />
      <SectionNav />
      <WalletProblemSection />
      <FinancesDashboard />
      <PaymentMethodsSection />
      <FeaturesSection />
      <ReceiptPreviewSection />
      <WalletUseCases />
      <WalletTestimonials />
      <WalletComparison />
      <WalletFAQ />
      <WalletCTASection />
    </main>
  )
}
