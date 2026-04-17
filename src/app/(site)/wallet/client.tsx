'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
} from 'lucide-react'

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
/*  Main export                                                        */
/* ================================================================== */

export function WalletDashboardClient() {
  return (
    <main>
      <HeroSection />
      <FinancesDashboard />
      <PaymentMethodsSection />
      <FeaturesSection />
      <ReceiptPreviewSection />
      <CTASection />
    </main>
  )
}
