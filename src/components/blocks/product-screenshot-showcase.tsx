'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'

/* ═══════════════════════════════════════════ */
/*  Tab data                                   */
/* ═══════════════════════════════════════════ */
const tabs = [
  { key: 'owner', label: 'Owner Dashboard' },
  { key: 'tenant', label: 'Tenant Portal' },
  { key: 'comms', label: 'Communications' },
  { key: 'maintenance', label: 'Maintenance' },
  { key: 'leasing', label: 'Leasing' },
  { key: 'payments', label: 'Payments' },
  { key: 'accounting', label: 'Accounting' },
]

/* ═══════════════════════════════════════════ */
/*  Rich mock data for each tab                */
/* ═══════════════════════════════════════════ */

function OwnerDashboardMock() {
  const navItems = [
    { icon: '⊞', label: 'Dashboard', active: true },
    { icon: '⌂', label: 'Properties', active: false },
    { icon: '◉', label: 'Tenants', active: false },
    { icon: '⚙', label: 'Maintenance', active: false },
    { icon: '$', label: 'Financials', active: false },
    { icon: '✉', label: 'Messages', active: false },
    { icon: '⚙', label: 'Settings', active: false },
  ]
  const properties = [
    { name: 'Maple Ridge Apts', addr: '142 King St W, Toronto', price: '$1,650/mo', beds: 2, baths: 2, occ: '98%', gradient: 'from-[#176FEB] to-[#60A5FA]' },
    { name: 'Lakeview Terrace', addr: '88 Queen St E, Ottawa', price: '$2,100/mo', beds: 3, baths: 2, occ: '95%', gradient: 'from-[#22C55E] to-[#86EFAC]' },
    { name: 'Harbour Pointe', addr: '310 Bay St, Vancouver', price: '$1,900/mo', beds: 2, baths: 1, occ: '100%', gradient: 'from-[#F59E0B] to-[#FCD34D]' },
  ]
  return (
    <div className="flex h-[340px]">
      {/* Sidebar */}
      <div className="w-[120px] shrink-0 border-r border-[#E5E7EB] bg-[#0A1628] flex flex-col py-3 px-2">
        <div className="flex items-center gap-1.5 px-2 mb-4">
          <div className="h-4 w-4 rounded bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">R</div>
          <span className="text-[9px] font-bold text-white">Revun</span>
        </div>
        {navItems.map((item) => (
          <div key={item.label} className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 mb-0.5 cursor-default ${item.active ? 'bg-[#176FEB] text-white' : 'text-[#94A3B8] hover:text-white'}`}>
            <span className="text-[8px]">{item.icon}</span>
            <span className="text-[8px] font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 bg-[#F5F6F8] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-white border-b border-[#E5E7EB] px-4 py-2">
          <p className="text-[10px] font-semibold text-[#0A1628]">Dashboard</p>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-0.5 text-[8px] text-[#94A3B8]">Search...</div>
            <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[7px] font-bold text-[#176FEB]">JC</div>
          </div>
        </div>
        <div className="p-3 space-y-2.5">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Total Properties', value: '80', icon: '⌂', color: '#176FEB' },
              { label: 'Occupancy', value: '96.4%', icon: '◉', color: '#22C55E' },
              { label: 'Revenue', value: '$284,500', icon: '$', color: '#176FEB' },
              { label: 'Pending', value: '$12,340', icon: '⏱', color: '#F59E0B' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white border border-[#E5E7EB] p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[7px] text-[#94A3B8] uppercase tracking-wide">{s.label}</span>
                  <span className="text-[8px]" style={{ color: s.color }}>{s.icon}</span>
                </div>
                <p className="text-[12px] font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          {/* Property grid + chart */}
          <div className="flex gap-2">
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold text-[#0A1628]">Properties</p>
                <span className="text-[7px] text-[#176FEB] font-medium cursor-default">View All →</span>
              </div>
              {properties.map((p) => (
                <div key={p.name} className="flex gap-2 rounded-lg bg-white border border-[#E5E7EB] p-1.5">
                  <div className={`w-[52px] h-[36px] rounded-md bg-gradient-to-br ${p.gradient} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-semibold text-[#0A1628] truncate">{p.name}</p>
                    <p className="text-[7px] text-[#94A3B8] truncate">{p.addr}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[8px] font-bold text-[#176FEB]">{p.price}</span>
                      <span className="text-[7px] text-[#94A3B8]">{p.beds}bd · {p.baths}ba</span>
                      <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-px text-[6px] font-bold text-[#22C55E]">{p.occ}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mini chart */}
            <div className="w-[140px] rounded-lg bg-white border border-[#E5E7EB] p-2">
              <p className="text-[8px] font-semibold text-[#0A1628] mb-1">Revenue Trend</p>
              <div className="flex items-end gap-[3px] h-[80px]">
                {[55, 62, 48, 70, 65, 78, 82, 68, 75, 88, 80, 85].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 11 ? '#176FEB' : `rgba(23,111,235,${0.2 + (h / 100) * 0.5})` }} />
                ))}
              </div>
              <div className="flex justify-between text-[6px] text-[#94A3B8] mt-1">
                <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TenantPortalMock() {
  return (
    <div className="flex flex-col h-[340px] bg-[#F5F6F8]">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white border-b border-[#E5E7EB] px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#176FEB] to-[#60A5FA] flex items-center justify-center text-[8px] font-bold text-white">SM</div>
          <div>
            <p className="text-[10px] font-semibold text-[#0A1628]">Sarah Mitchell</p>
            <p className="text-[7px] text-[#94A3B8]">Unit 5D · Maple Ridge Apartments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[8px] font-bold text-[#22C55E]">Lease Active</span>
          <div className="h-5 w-5 rounded-full bg-[#F5F6F8] flex items-center justify-center text-[8px] text-[#94A3B8]">⚙</div>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
        {/* Top row: Payment + Activity */}
        <div className="flex gap-2.5">
          {/* Payment card */}
          <div className="w-[200px] shrink-0 rounded-lg bg-white border border-[#E5E7EB] p-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[9px] font-semibold text-[#0A1628]">Next Payment</p>
              <span className="text-[7px] text-[#94A3B8]">Due May 1</span>
            </div>
            <p className="text-[18px] font-bold text-[#176FEB]">$1,850<span className="text-[10px] font-normal">.00</span></p>
            <div className="mt-1 mb-2 h-1 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
              <div className="h-full w-[0%] rounded-full bg-[#176FEB]" />
            </div>
            <div className="flex gap-1.5">
              <div className="flex-1 rounded-md bg-[#176FEB] py-1.5 text-center text-[8px] font-semibold text-white cursor-default">Pay Now</div>
              <div className="rounded-md border border-[#E5E7EB] py-1.5 px-2 text-center text-[8px] font-medium text-[#94A3B8] cursor-default">Auto-Pay</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[7px] text-[#94A3B8]">Payment History</span>
              <span className="text-[7px] text-[#176FEB] font-medium cursor-default">View →</span>
            </div>
          </div>
          {/* Recent activity */}
          <div className="flex-1 rounded-lg bg-white border border-[#E5E7EB] p-3">
            <p className="text-[9px] font-semibold text-[#0A1628] mb-2">Recent Activity</p>
            <div className="space-y-1.5">
              {[
                { icon: '🔧', label: 'Maintenance: Kitchen faucet repair', status: 'In Progress', color: '#F59E0B', time: '2 hrs ago' },
                { icon: '📄', label: 'Lease renewal available for review', status: 'Action Needed', color: '#176FEB', time: '1 day ago' },
                { icon: '✓', label: 'Renter insurance document uploaded', status: 'Complete', color: '#22C55E', time: '3 days ago' },
                { icon: '💳', label: 'April rent payment processed', status: 'Confirmed', color: '#22C55E', time: '5 days ago' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-md bg-[#F5F6F8] px-2 py-1.5">
                  <span className="text-[9px]">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] text-[#555860] truncate">{item.label}</p>
                    <p className="text-[6px] text-[#94A3B8]">{item.time}</p>
                  </div>
                  <span className="shrink-0 rounded-full px-1.5 py-px text-[6px] font-bold" style={{ color: item.color, backgroundColor: `${item.color}15` }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom row: Documents + Lease details */}
        <div className="flex gap-2.5">
          <div className="flex-1 rounded-lg bg-white border border-[#E5E7EB] p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[8px] font-semibold text-[#0A1628]">Documents</p>
              <span className="text-[7px] text-[#176FEB] cursor-default">Upload</span>
            </div>
            <div className="space-y-1">
              {['Lease Agreement.pdf', 'Renter Insurance.pdf', 'Move-in Checklist.pdf'].map((doc) => (
                <div key={doc} className="flex items-center gap-1.5 text-[7px]">
                  <span className="text-[#EF4444]">📕</span>
                  <span className="text-[#555860]">{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-white border border-[#E5E7EB] p-2.5">
            <p className="text-[8px] font-semibold text-[#0A1628] mb-1.5">Lease Details</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {[
                { label: 'Term', value: '12 months' },
                { label: 'Start', value: 'Jun 1, 2025' },
                { label: 'End', value: 'May 31, 2026' },
                { label: 'Rent', value: '$1,850/mo' },
                { label: 'Deposit', value: '$1,850' },
                { label: 'Parking', value: 'Spot #24' },
              ].map((d) => (
                <div key={d.label}>
                  <p className="text-[6px] text-[#94A3B8]">{d.label}</p>
                  <p className="text-[7px] font-medium text-[#0A1628]">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CommsMock() {
  const contacts = [
    { initials: 'JK', name: 'James K.', role: 'Tenant', msg: 'Hallway light on floor 3 is out', time: '3:25 PM', unread: 2, online: true, active: true },
    { initials: 'SM', name: 'Sarah M.', role: 'Tenant', msg: 'Thanks for the quick fix!', time: '2:10 PM', unread: 0, online: false, active: false },
    { initials: 'PA', name: 'Pro Appliance', role: 'Vendor', msg: 'Invoice attached for unit 3A', time: '1:45 PM', unread: 1, online: false, active: false },
    { initials: 'MR', name: 'Mike R.', role: 'Owner', msg: 'Any update on the vacancy?', time: '11:20 AM', unread: 0, online: true, active: false },
    { initials: 'LW', name: 'Lisa W.', role: 'Tenant', msg: 'Rent payment sent via Interac', time: 'Yesterday', unread: 0, online: false, active: false },
    { initials: 'MS', name: 'Maria S.', role: 'Team', msg: 'Lease question about pets policy', time: 'Yesterday', unread: 0, online: true, active: false },
  ]
  const filterTabs = ['All', 'Tenants', 'Owners', 'Vendors', 'Team']
  return (
    <div className="flex h-[340px]">
      {/* Inbox sidebar */}
      <div className="w-[190px] shrink-0 border-r border-[#E5E7EB] bg-white flex flex-col">
        <div className="px-2.5 py-2 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-bold text-[#0A1628]">Messages</p>
            <div className="h-5 w-5 rounded-full bg-[#176FEB] flex items-center justify-center text-[8px] text-white cursor-default">+</div>
          </div>
          <div className="flex gap-1 mb-1.5">
            {filterTabs.map((tab, i) => (
              <span key={tab} className={`rounded-full px-1.5 py-0.5 text-[6px] font-medium cursor-default ${i === 0 ? 'bg-[#176FEB] text-white' : 'bg-[#F5F6F8] text-[#94A3B8]'}`}>{tab}</span>
            ))}
          </div>
          <div className="rounded-md bg-[#F5F6F8] border border-[#E5E7EB] px-2 py-1 text-[7px] text-[#94A3B8]">Search conversations...</div>
        </div>
        <div className="flex-1 overflow-hidden">
          {contacts.map((c) => (
            <div key={c.name} className={`flex items-center gap-2 px-2.5 py-2 cursor-default border-l-2 ${c.active ? 'bg-[#176FEB]/5 border-[#176FEB]' : 'border-transparent hover:bg-[#F5F6F8]'}`}>
              <div className="relative shrink-0">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[7px] font-bold ${c.active ? 'bg-[#176FEB] text-white' : 'bg-[#176FEB]/10 text-[#176FEB]'}`}>{c.initials}</div>
                {c.online && <div className="absolute -bottom-px -right-px h-2 w-2 rounded-full border border-white bg-[#22C55E]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-semibold text-[#0A1628] truncate">{c.name}</span>
                  <span className="rounded bg-[#E5E7EB] px-1 py-px text-[5px] text-[#94A3B8] shrink-0">{c.role}</span>
                  <span className="ml-auto text-[6px] text-[#94A3B8] shrink-0">{c.time}</span>
                </div>
                <p className="text-[7px] text-[#94A3B8] truncate">{c.msg}</p>
              </div>
              {c.unread > 0 && <div className="h-3.5 w-3.5 rounded-full bg-[#176FEB] flex items-center justify-center text-[6px] font-bold text-white shrink-0">{c.unread}</div>}
            </div>
          ))}
        </div>
      </div>
      {/* Chat panel */}
      <div className="flex-1 flex flex-col bg-[#FAFBFC]">
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-7 w-7 rounded-full bg-[#176FEB] flex items-center justify-center text-[8px] font-bold text-white">JK</div>
              <div className="absolute -bottom-px -right-px h-2 w-2 rounded-full border border-white bg-[#22C55E]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[9px] font-semibold text-[#0A1628]">James K.</p>
                <span className="rounded bg-[#E5E7EB] px-1 py-px text-[6px] text-[#94A3B8]">Tenant</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[7px] text-[#22C55E]">Online</span>
                <span className="text-[6px] text-[#94A3B8] ml-1">Unit 4B · Maple Ridge Apts</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-md bg-[#F5F6F8] flex items-center justify-center text-[8px] text-[#94A3B8]">📞</div>
            <div className="h-5 w-5 rounded-md bg-[#F5F6F8] flex items-center justify-center text-[8px] text-[#94A3B8]">📎</div>
            <div className="h-5 w-5 rounded-md bg-[#F5F6F8] flex items-center justify-center text-[8px] text-[#94A3B8]">⋯</div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 p-3 space-y-2 overflow-hidden">
          <div className="text-center"><span className="text-[6px] text-[#94A3B8] bg-[#F5F6F8] rounded-full px-2 py-0.5">Today</span></div>
          {/* Received */}
          <div className="flex gap-1.5">
            <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[6px] font-bold text-[#176FEB] shrink-0 mt-1">JK</div>
            <div>
              <div className="rounded-2xl rounded-tl-sm bg-[#F5F6F8] px-2.5 py-1.5 max-w-[260px]">
                <p className="text-[9px] text-[#555860]">Hey, the hallway light on floor 3 is out again. This is the second time this month.</p>
              </div>
              <p className="text-[6px] text-[#94A3B8] mt-0.5 ml-1">3:22 PM</p>
            </div>
          </div>
          {/* Sent */}
          <div className="flex justify-end">
            <div>
              <div className="rounded-2xl rounded-tr-sm bg-[#176FEB] px-2.5 py-1.5 max-w-[260px]">
                <p className="text-[9px] text-white">Thanks for letting us know. I&apos;ve created work order WO-2851 and maintenance will replace it by tomorrow morning.</p>
              </div>
              <p className="text-[6px] text-[#94A3B8] mt-0.5 text-right mr-1">3:24 PM ✓✓</p>
            </div>
          </div>
          {/* Received */}
          <div className="flex gap-1.5">
            <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[6px] font-bold text-[#176FEB] shrink-0 mt-1">JK</div>
            <div>
              <div className="rounded-2xl rounded-tl-sm bg-[#F5F6F8] px-2.5 py-1.5 max-w-[260px]">
                <p className="text-[9px] text-[#555860]">Great, appreciate the fast response!</p>
              </div>
              <p className="text-[6px] text-[#94A3B8] mt-0.5 ml-1">3:25 PM</p>
            </div>
          </div>
          {/* Sent with smart action card */}
          <div className="flex justify-end">
            <div>
              <div className="rounded-2xl rounded-tr-sm bg-[#176FEB] px-2.5 py-1.5 max-w-[260px]">
                <p className="text-[9px] text-white">No problem! You can track the repair status in your tenant portal anytime.</p>
              </div>
              <div className="mt-1 rounded-lg border border-[#E5E7EB] bg-white px-2 py-1.5 max-w-[200px] ml-auto">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded bg-[#F59E0B]/20 flex items-center justify-center text-[6px]">🔧</div>
                  <div>
                    <p className="text-[7px] font-semibold text-[#0A1628]">WO-2851</p>
                    <p className="text-[6px] text-[#94A3B8]">Hallway light · In Progress</p>
                  </div>
                </div>
              </div>
              <p className="text-[6px] text-[#94A3B8] mt-0.5 text-right mr-1">3:26 PM ✓✓</p>
            </div>
          </div>
        </div>
        {/* Input */}
        <div className="border-t border-[#E5E7EB] bg-white px-3 py-2 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#F5F6F8] flex items-center justify-center text-[8px] text-[#94A3B8] cursor-default">+</div>
          <div className="flex-1 rounded-full bg-[#F5F6F8] border border-[#E5E7EB] px-3 py-1 text-[8px] text-[#94A3B8]">Type a message...</div>
          <div className="h-5 w-5 rounded-full bg-[#176FEB] flex items-center justify-center text-[8px] text-white cursor-default">→</div>
        </div>
      </div>
    </div>
  )
}

function MaintenanceMock() {
  const filterTabs = ['All', 'Submitted', 'Authorized', 'In Progress', 'Completed']
  const workOrders = [
    { id: 'WO-2847', unit: '3A', issue: 'Dishwasher not draining', priority: 'High', color: '#EF4444', vendor: 'Pro Appliance Co.', status: 'In Progress', date: 'Apr 8' },
    { id: 'WO-2846', unit: '7C', issue: 'Thermostat replacement', priority: 'Medium', color: '#F59E0B', vendor: 'HVAC Solutions Inc.', status: 'Authorized', date: 'Apr 7' },
    { id: 'WO-2845', unit: '12B', issue: 'Touch-up paint hallway', priority: 'Low', color: '#22C55E', vendor: 'In-House Team', status: 'Submitted', date: 'Apr 7' },
    { id: 'WO-2844', unit: '9D', issue: 'Leaking bathroom faucet', priority: 'High', color: '#EF4444', vendor: 'QuickFix Plumbing', status: 'In Progress', date: 'Apr 6' },
    { id: 'WO-2843', unit: '1A', issue: 'Window seal replacement', priority: 'Medium', color: '#F59E0B', vendor: 'GlassCo Ltd.', status: 'Authorized', date: 'Apr 5' },
  ]
  return (
    <div className="flex h-[340px]">
      {/* Left panel: Stats + Donut */}
      <div className="w-[180px] shrink-0 border-r border-[#E5E7EB] bg-white p-3 flex flex-col">
        <p className="text-[9px] font-semibold text-[#0A1628] mb-3">Overview</p>
        {/* Donut chart */}
        <div className="relative mx-auto mb-3">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray="175.9 238.8" strokeDashoffset="-59.7" strokeLinecap="round" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray="59.7 238.8" strokeDashoffset="0" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[16px] font-bold text-[#0A1628]">30</p>
            <p className="text-[7px] text-[#94A3B8]">Requests</p>
          </div>
        </div>
        {/* Stats */}
        <div className="space-y-1.5">
          {[
            { label: 'Completed', value: '22', color: '#22C55E' },
            { label: 'Pending', value: '08', color: '#F59E0B' },
            { label: 'Cancelled', value: '00', color: '#94A3B8' },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[8px] text-[#555860]">{s.label}</span>
              </div>
              <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <div className="rounded-md bg-[#176FEB] py-1.5 text-center text-[8px] font-semibold text-white cursor-default">+ Create Request</div>
        </div>
      </div>
      {/* Right panel: Work orders */}
      <div className="flex-1 bg-[#F5F6F8] flex flex-col overflow-hidden">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-white border-b border-[#E5E7EB] px-3 py-2">
          {filterTabs.map((tab, i) => (
            <span key={tab} className={`rounded-full px-2 py-0.5 text-[7px] font-medium cursor-default ${i === 0 ? 'bg-[#176FEB] text-white' : 'bg-[#F5F6F8] text-[#94A3B8]'}`}>{tab}</span>
          ))}
          <div className="ml-auto rounded-md border border-[#E5E7EB] bg-white px-2 py-0.5 text-[7px] text-[#94A3B8]">Search...</div>
        </div>
        {/* Work order list */}
        <div className="flex-1 p-2.5 space-y-1.5 overflow-hidden">
          {workOrders.map((wo) => (
            <div key={wo.id} className="flex items-center gap-2.5 rounded-lg bg-white border border-[#E5E7EB] px-2.5 py-2">
              {/* Priority indicator */}
              <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: wo.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[7px] font-mono text-[#94A3B8]">{wo.id}</span>
                  <span className="rounded bg-[#176FEB]/10 px-1.5 py-px text-[7px] font-bold text-[#176FEB]">Unit {wo.unit}</span>
                  <span className="rounded-full px-1.5 py-px text-[6px] font-bold" style={{ color: wo.color, backgroundColor: `${wo.color}15` }}>{wo.priority}</span>
                </div>
                <p className="text-[8px] font-medium text-[#0A1628]">{wo.issue}</p>
                <p className="text-[7px] text-[#94A3B8]">Assigned: {wo.vendor}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="rounded-full bg-[#F5F6F8] px-1.5 py-0.5 text-[6px] font-medium text-[#555860]">{wo.status}</span>
                <p className="text-[6px] text-[#94A3B8] mt-0.5">{wo.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LeasingMock() {
  const columns = [
    { stage: 'Applied', count: 8, color: '#176FEB', cards: [
      { name: 'David L.', unit: '8A · 1BR', score: 88, date: 'Apr 8' },
      { name: 'Chen W.', unit: '6B · 2BR', score: 82, date: 'Apr 7' },
      { name: 'Alex P.', unit: '11C · Studio', score: 79, date: 'Apr 6' },
    ]},
    { stage: 'Screening', count: 5, color: '#F59E0B', cards: [
      { name: 'Emily R.', unit: '5D · 2BR', score: 94, date: 'Apr 5' },
      { name: 'Jordan T.', unit: '3A · 1BR', score: 86, date: 'Apr 4' },
      { name: 'Priya K.', unit: '9C · 2BR', score: 91, date: 'Apr 3' },
    ]},
    { stage: 'Approved', count: 3, color: '#22C55E', cards: [
      { name: 'Maria S.', unit: '2C · 3BR', score: 91, date: 'Apr 2' },
      { name: 'Tom B.', unit: '4A · 1BR', score: 89, date: 'Apr 1' },
    ]},
    { stage: 'Signed', count: 2, color: '#0B5AD4', cards: [
      { name: 'Sarah M.', unit: '5D · 2BR', score: 95, date: 'Mar 30' },
      { name: 'Jake R.', unit: '7B · 1BR', score: 87, date: 'Mar 28' },
    ]},
  ]
  return (
    <div className="flex flex-col h-[340px] bg-[#F5F6F8]">
      {/* Top stats bar */}
      <div className="flex items-center justify-between bg-white border-b border-[#E5E7EB] px-4 py-2">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-semibold text-[#0A1628]">Leasing Pipeline</p>
          <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[7px] font-bold text-[#22C55E]">18 Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-0.5 text-[7px] text-[#94A3B8]">Search applicants...</div>
          <div className="rounded-md bg-[#176FEB] px-2 py-0.5 text-[7px] font-semibold text-white cursor-default">+ New Application</div>
        </div>
      </div>
      {/* Kanban columns */}
      <div className="flex-1 flex gap-2 p-2.5 overflow-hidden">
        {columns.map((col) => (
          <div key={col.stage} className="flex-1 flex flex-col min-w-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
                <span className="text-[8px] font-semibold text-[#0A1628]">{col.stage}</span>
              </div>
              <span className="rounded-full h-4 w-4 flex items-center justify-center text-[7px] font-bold text-white" style={{ backgroundColor: col.color }}>{col.count}</span>
            </div>
            {/* Cards */}
            <div className="flex-1 space-y-1.5 overflow-hidden">
              {col.cards.map((card) => (
                <div key={card.name} className="rounded-lg bg-white border border-[#E5E7EB] p-2 cursor-default hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="h-4 w-4 rounded-full flex items-center justify-center text-[6px] font-bold text-white" style={{ backgroundColor: col.color }}>{card.name[0]}</div>
                    <span className="text-[8px] font-semibold text-[#0A1628]">{card.name}</span>
                  </div>
                  <p className="text-[7px] text-[#94A3B8] mb-1">{card.unit}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[7px] font-bold text-[#22C55E]">{card.score}</span>
                      <span className="text-[6px] text-[#94A3B8]">score</span>
                    </div>
                    <span className="text-[6px] text-[#94A3B8]">{card.date}</span>
                  </div>
                  {/* Score bar */}
                  <div className="mt-1 h-0.5 w-full rounded-full bg-[#E5E7EB] overflow-hidden">
                    <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${card.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentsMock() {
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  const incomeData = [38, 42, 40, 44, 41, 46]
  const expenseData = [14, 16, 13, 15, 14, 17]
  const transactions = [
    { name: 'Sarah M.', amount: '$1,850', method: 'Interac', date: 'Apr 10', status: 'Completed', sColor: '#22C55E' },
    { name: 'James K.', amount: '$2,100', method: 'ACH', date: 'Apr 10', status: 'Completed', sColor: '#22C55E' },
    { name: 'David L.', amount: '$1,600', method: 'Card', date: 'Apr 9', status: 'Pending', sColor: '#F59E0B' },
    { name: 'Lisa W.', amount: '$2,350', method: 'Interac', date: 'Apr 9', status: 'Completed', sColor: '#22C55E' },
    { name: 'Emily R.', amount: '$1,750', method: 'ACH', date: 'Apr 8', status: 'Completed', sColor: '#22C55E' },
  ]
  return (
    <div className="flex flex-col h-[340px] bg-[#F5F6F8]">
      {/* Stat cards */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-2.5">
        <div className="flex gap-3">
          {[
            { label: 'Net Income', value: '$200,900', color: '#0A1628', bg: 'bg-white' },
            { label: 'Income', value: '$246,900', color: '#22C55E', bg: 'bg-[#22C55E]/5' },
            { label: 'Expenses', value: '$85,621.98', color: '#EF4444', bg: 'bg-[#EF4444]/5' },
          ].map((s) => (
            <div key={s.label} className={`flex-1 rounded-lg border border-[#E5E7EB] ${s.bg} p-2`}>
              <p className="text-[7px] text-[#94A3B8] uppercase tracking-wide">{s.label}</p>
              <p className="text-[13px] font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex gap-2.5 p-3 overflow-hidden">
        {/* Bar chart */}
        <div className="w-[200px] shrink-0 rounded-lg bg-white border border-[#E5E7EB] p-2.5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[8px] font-semibold text-[#0A1628]">Income vs Expenses</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5"><div className="h-1.5 w-1.5 rounded-sm bg-[#176FEB]" /><span className="text-[6px] text-[#94A3B8]">Income</span></div>
              <div className="flex items-center gap-0.5"><div className="h-1.5 w-1.5 rounded-sm bg-[#EF4444]" /><span className="text-[6px] text-[#94A3B8]">Expenses</span></div>
            </div>
          </div>
          <div className="flex items-end gap-[6px] h-[120px]">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-0">
                <div className="w-full flex gap-[1px] items-end h-[105px]">
                  <div className="flex-1 rounded-t-sm bg-[#176FEB]" style={{ height: `${(incomeData[i] / 50) * 100}%` }} />
                  <div className="flex-1 rounded-t-sm bg-[#EF4444]" style={{ height: `${(expenseData[i] / 50) * 100}%` }} />
                </div>
                <span className="text-[6px] text-[#94A3B8] mt-1">{m}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Transaction table */}
        <div className="flex-1 rounded-lg bg-white border border-[#E5E7EB] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-2.5 py-2 border-b border-[#E5E7EB]">
            <p className="text-[8px] font-semibold text-[#0A1628]">Recent Transactions</p>
            <div className="rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-0.5 text-[7px] text-[#94A3B8]">Search...</div>
          </div>
          {/* Table header */}
          <div className="flex items-center px-2.5 py-1 bg-[#F5F6F8] border-b border-[#E5E7EB] text-[7px] font-semibold text-[#94A3B8]">
            <span className="flex-1">Name</span>
            <span className="w-[60px] text-right">Amount</span>
            <span className="w-[50px] text-center">Method</span>
            <span className="w-[45px] text-center">Date</span>
            <span className="w-[55px] text-right">Status</span>
          </div>
          {/* Rows */}
          <div className="flex-1 overflow-hidden">
            {transactions.map((tx) => (
              <div key={tx.name} className="flex items-center px-2.5 py-1.5 border-b border-[#F5F6F8] hover:bg-[#FAFBFC] text-[7px]">
                <div className="flex-1 flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[6px] font-bold text-[#176FEB]">{tx.name[0]}</div>
                  <span className="text-[#0A1628] font-medium">{tx.name}</span>
                </div>
                <span className="w-[60px] text-right font-semibold text-[#0A1628]">{tx.amount}</span>
                <span className="w-[50px] text-center"><span className="rounded bg-[#E5E7EB] px-1 py-px text-[6px] text-[#555860]">{tx.method}</span></span>
                <span className="w-[45px] text-center text-[#94A3B8]">{tx.date}</span>
                <span className="w-[55px] text-right"><span className="rounded-full px-1.5 py-px text-[6px] font-bold" style={{ color: tx.sColor, backgroundColor: `${tx.sColor}15` }}>{tx.status}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountingMock() {
  const transactions = [
    { type: 'disbursement', label: 'Owner disbursement — Maple Ridge', amount: '-$42,600', date: 'Apr 10', status: 'Sent', sColor: '#22C55E' },
    { type: 'income', label: 'Rent collection — Lakeview Terrace', amount: '+$38,200', date: 'Apr 9', status: 'Received', sColor: '#22C55E' },
    { type: 'expense', label: 'Vendor invoice — Pro Appliance Co.', amount: '-$3,450', date: 'Apr 8', status: 'Paid', sColor: '#176FEB' },
    { type: 'tax', label: 'HST remittance — Q1 2026', amount: '-$18,640', date: 'Apr 7', status: 'Filed', sColor: '#22C55E' },
    { type: 'disbursement', label: 'Owner disbursement — Harbour Pointe', amount: '-$31,800', date: 'Apr 6', status: 'Sent', sColor: '#22C55E' },
    { type: 'expense', label: 'Vendor invoice — HVAC Solutions', amount: '-$2,180', date: 'Apr 5', status: 'Paid', sColor: '#176FEB' },
  ]
  return (
    <div className="flex flex-col h-[340px] bg-[#F5F6F8]">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b border-[#E5E7EB] px-4 py-2">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-semibold text-[#0A1628]">Financial Summary — April 2026</p>
          <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[7px] font-bold text-[#22C55E]">✓ Reconciled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-0.5 text-[7px] text-[#94A3B8]">Export</div>
          <div className="rounded-md border border-[#E5E7EB] bg-[#F5F6F8] px-2 py-0.5 text-[7px] text-[#94A3B8]">Print</div>
        </div>
      </div>
      <div className="p-3 space-y-2.5 flex-1 overflow-hidden flex flex-col">
        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Total Revenue', value: '$342,800', color: '#22C55E', icon: '↑', change: '+12.3%' },
            { label: 'Total Expenses', value: '$128,450', color: '#EF4444', icon: '↓', change: '-4.1%' },
            { label: 'Net Operating Income', value: '$214,350', color: '#176FEB', icon: '↑', change: '+18.7%' },
            { label: 'Trust Balance', value: '$1,847,200', color: '#0A1628', icon: '', change: '' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-white border border-[#E5E7EB] p-2.5">
              <p className="text-[7px] text-[#94A3B8] uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-[13px] font-bold" style={{ color: s.color }}>{s.value}</p>
              {s.change && (
                <p className="text-[7px] mt-0.5" style={{ color: s.color === '#EF4444' ? '#22C55E' : s.color }}>
                  {s.icon} {s.change} vs last month
                </p>
              )}
            </div>
          ))}
        </div>
        {/* Quick summary row */}
        <div className="flex gap-2">
          {[
            { label: 'Owner Disbursements', value: '$186,400', status: 'All Sent', sColor: '#22C55E' },
            { label: 'Vendor Invoices', value: '$42,100', status: 'All Paid', sColor: '#22C55E' },
            { label: 'Tax Remittances', value: '$18,640', status: 'Filed', sColor: '#22C55E' },
          ].map((item) => (
            <div key={item.label} className="flex-1 rounded-lg bg-white border border-[#E5E7EB] px-2.5 py-2 flex items-center justify-between">
              <div>
                <p className="text-[7px] text-[#94A3B8]">{item.label}</p>
                <p className="text-[10px] font-bold text-[#0A1628]">{item.value}</p>
              </div>
              <span className="rounded-full px-1.5 py-0.5 text-[6px] font-bold" style={{ color: item.sColor, backgroundColor: `${item.sColor}15` }}>{item.status}</span>
            </div>
          ))}
        </div>
        {/* Transaction ledger */}
        <div className="flex-1 rounded-lg bg-white border border-[#E5E7EB] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-[#E5E7EB]">
            <p className="text-[8px] font-semibold text-[#0A1628]">Recent Transactions</p>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#F5F6F8] px-1.5 py-0.5 text-[6px] text-[#555860] cursor-default">All</span>
              <span className="rounded-full bg-[#F5F6F8] px-1.5 py-0.5 text-[6px] text-[#94A3B8] cursor-default">Income</span>
              <span className="rounded-full bg-[#F5F6F8] px-1.5 py-0.5 text-[6px] text-[#94A3B8] cursor-default">Expenses</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center px-2.5 py-1.5 border-b border-[#F5F6F8] text-[7px]">
                <div className="flex-1 min-w-0">
                  <p className="text-[#0A1628] font-medium truncate">{tx.label}</p>
                </div>
                <span className={`w-[60px] text-right font-bold ${tx.amount.startsWith('+') ? 'text-[#22C55E]' : 'text-[#0A1628]'}`}>{tx.amount}</span>
                <span className="w-[45px] text-center text-[#94A3B8]">{tx.date}</span>
                <span className="w-[50px] text-right"><span className="rounded-full px-1.5 py-px text-[6px] font-bold" style={{ color: tx.sColor, backgroundColor: `${tx.sColor}15` }}>{tx.status}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const tabMockups: Record<string, () => React.JSX.Element> = {
  owner: OwnerDashboardMock,
  tenant: TenantPortalMock,
  comms: CommsMock,
  maintenance: MaintenanceMock,
  leasing: LeasingMock,
  payments: PaymentsMock,
  accounting: AccountingMock,
}

/* ═══════════════════════════════════════════ */
/*  Real Figma screenshots (mobile)            */
/* ═══════════════════════════════════════════ */
const mobileScreenshots: Record<string, { src: string; alt: string }> = {
  owner: { src: '/screenshots/app/home-listings.png', alt: 'Revun owner app — property portfolio overview' },
  tenant: { src: '/screenshots/platform/tenant-app-home.png', alt: 'Revun tenant portal — payments, maintenance, lease' },
  comms: { src: '/screenshots/comms/chats-inbox.png', alt: 'Revun communications — unified inbox' },
  maintenance: { src: '/screenshots/maintenance/overview.png', alt: 'Revun maintenance — requests overview with AI triage' },
  leasing: { src: '/screenshots/leasing/time-sensitive-offers.png', alt: 'Revun leasing — time-sensitive offers with expiry' },
  payments: { src: '/screenshots/app/financial-overview.png', alt: 'Revun payments — financial overview and collections' },
  accounting: { src: '/screenshots/investment/financial-overview.png', alt: 'Revun accounting — portfolio financial summary' },
}

/* ═══════════════════════════════════════════ */
/*  Device frame helpers                       */
/* ═══════════════════════════════════════════ */
function DesktopFrame({ label, tabKey }: { label: string; tabKey: string }) {
  const MockComponent = tabMockups[tabKey]
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-[#F8F9FA] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBD2F]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="rounded border border-border bg-white px-2.5 py-0.5 text-[9px] text-[#94A3B8]">
            app.revun.com/{label.toLowerCase().replace(/\s+/g, '-')}
          </span>
        </div>
      </div>
      {/* CSS webapp mockup — height matches phone frame */}
      <div className="h-[340px] overflow-hidden">
        {MockComponent ? <MockComponent /> : null}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Simplified mobile-friendly mini mockups    */
/* ═══════════════════════════════════════════ */
const mobileMiniMockups: Record<string, () => React.JSX.Element> = {
  owner: () => (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[9px] font-bold text-[#0A1628]">Portfolio</p>
        <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-0.5 text-[6px] font-bold text-[#22C55E]">96.4%</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {[{ l: 'Properties', v: '80', c: '#176FEB' }, { l: 'Revenue', v: '$284.5K', c: '#22C55E' }, { l: 'Occupancy', v: '96.4%', c: '#22C55E' }, { l: 'Pending', v: '$12.3K', c: '#F59E0B' }].map((s) => (
          <div key={s.l} className="rounded-md bg-[#F5F6F8] p-1.5">
            <p className="text-[6px] text-[#94A3B8]">{s.l}</p>
            <p className="text-[10px] font-bold" style={{ color: s.c }}>{s.v}</p>
          </div>
        ))}
      </div>
      {[
        { name: 'Maple Ridge Apts', addr: '142 King St W', price: '$1,650/mo', occ: '98%' },
        { name: 'Lakeview Terrace', addr: '88 Queen St E', price: '$2,100/mo', occ: '95%' },
        { name: 'Harbour Pointe', addr: '310 Bay St', price: '$1,900/mo', occ: '100%' },
      ].map((p) => (
        <div key={p.name} className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2 py-1.5">
          <div>
            <p className="text-[7px] font-bold text-[#0A1628]">{p.name}</p>
            <p className="text-[6px] text-[#94A3B8]">{p.addr}</p>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-bold text-[#176FEB]">{p.price}</p>
            <p className="text-[6px] text-[#22C55E]">{p.occ}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  payments: () => (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold text-[#0A1628]">Payments</p>
        <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-0.5 text-[6px] font-bold text-[#22C55E]">97.8% on-time</span>
      </div>
      <div className="rounded-md bg-[#F5F6F8] p-2 text-center">
        <p className="text-[6px] text-[#94A3B8]">Collected this month</p>
        <p className="text-[14px] font-bold text-[#0A1628]">$284,500</p>
      </div>
      {[
        { name: 'Sarah M.', amount: '+$1,850', method: 'Interac', color: '#22C55E' },
        { name: 'James K.', amount: '+$2,100', method: 'ACH', color: '#22C55E' },
        { name: 'Unit 4B', amount: '+$1,600', method: 'Card', color: '#F59E0B' },
        { name: 'Emily R.', amount: '+$1,450', method: 'ACH', color: '#22C55E' },
      ].map((tx) => (
        <div key={tx.name} className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2 py-1.5">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[6px] font-bold text-[#176FEB]">{tx.name[0]}</div>
            <span className="text-[7px] text-[#555860]">{tx.name}</span>
            <span className="rounded bg-[#E5E7EB] px-1 py-px text-[5px] text-[#94A3B8]">{tx.method}</span>
          </div>
          <span className="text-[7px] font-bold" style={{ color: tx.color }}>{tx.amount}</span>
        </div>
      ))}
    </div>
  ),
  tenant: () => (
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">SM</div>
        <div>
          <p className="text-[9px] font-bold text-[#0A1628]">Sarah Mitchell</p>
          <p className="text-[7px] text-[#94A3B8]">Unit 5D · Maple Ridge</p>
        </div>
        <span className="ml-auto rounded-full bg-[#22C55E]/10 px-1.5 py-0.5 text-[6px] font-bold text-[#22C55E]">Active</span>
      </div>
      <div className="rounded-lg border border-[#E5E7EB] p-2">
        <p className="text-[7px] text-[#94A3B8]">Next Payment · Due May 1</p>
        <p className="text-[13px] font-bold text-[#176FEB]">$1,850</p>
        <div className="mt-1.5 rounded-md bg-[#176FEB] py-1 text-center text-[8px] font-semibold text-white">Pay Now</div>
      </div>
      <div className="space-y-1">
        {[{ l: 'Kitchen faucet', s: 'In Progress', c: '#F59E0B' }, { l: 'Lease renewal', s: 'Action', c: '#176FEB' }, { l: 'Insurance', s: 'Done', c: '#22C55E' }].map((i) => (
          <div key={i.l} className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2 py-1">
            <span className="text-[7px] text-[#555860] truncate">{i.l}</span>
            <span className="text-[6px] font-bold shrink-0" style={{ color: i.c }}>{i.s}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 pt-1">
        <div className="flex-1 rounded-md border border-[#E5E7EB] py-1 text-center text-[7px] text-[#555860]">Documents</div>
        <div className="flex-1 rounded-md border border-[#E5E7EB] py-1 text-center text-[7px] text-[#555860]">Lease</div>
      </div>
    </div>
  ),
  comms: () => (
    <div className="p-3 space-y-1.5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] font-bold text-[#0A1628]">Messages</p>
        <div className="h-5 w-5 rounded-full bg-[#176FEB] flex items-center justify-center text-[7px] text-white">+</div>
      </div>
      <div className="flex gap-1 mb-2">
        {['All', 'Tenants', 'Owners', 'Team'].map((t, i) => (
          <span key={t} className={`rounded-full px-1.5 py-0.5 text-[6px] font-medium ${i === 0 ? 'bg-[#176FEB] text-white' : 'bg-[#F5F6F8] text-[#94A3B8]'}`}>{t}</span>
        ))}
      </div>
      {[
        { name: 'James K.', role: 'Tenant', msg: 'Hallway light on floor 3 is out', time: '3:25 PM', unread: 2, online: true },
        { name: 'Sarah M.', role: 'Tenant', msg: 'Thanks for the quick fix!', time: '2:10 PM', unread: 0, online: false },
        { name: 'Pro Appliance', role: 'Vendor', msg: 'Invoice attached for unit 3A', time: '1:45 PM', unread: 1, online: false },
        { name: 'Mike R.', role: 'Owner', msg: 'Any update on the vacancy?', time: '11:20 AM', unread: 0, online: true },
        { name: 'Lisa W.', role: 'Tenant', msg: 'Rent payment sent via Interac', time: 'Yesterday', unread: 0, online: false },
      ].map((t) => (
        <div key={t.name} className="flex items-center gap-2 rounded-md bg-[#F5F6F8] px-2 py-1.5">
          <div className="relative shrink-0">
            <div className="h-6 w-6 rounded-full bg-[#176FEB]/10 flex items-center justify-center text-[7px] font-bold text-[#176FEB]">{t.name[0]}</div>
            {t.online && <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-white bg-[#22C55E]" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[7px] font-bold text-[#0A1628] truncate">{t.name}</span>
              <span className="rounded bg-[#E5E7EB] px-1 py-px text-[5px] text-[#94A3B8]">{t.role}</span>
            </div>
            <p className="text-[6px] text-[#94A3B8] truncate">{t.msg}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[5px] text-[#94A3B8]">{t.time}</p>
            {t.unread > 0 && <div className="mt-0.5 ml-auto h-3 w-3 rounded-full bg-[#176FEB] flex items-center justify-center text-[5px] font-bold text-white">{t.unread}</div>}
          </div>
        </div>
      ))}
    </div>
  ),
  accounting: () => (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[8px] font-bold text-[#0A1628]">April 2026</p>
        <span className="rounded-full bg-[#22C55E]/10 px-1.5 py-0.5 text-[6px] font-bold text-[#22C55E]">Reconciled</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {[{ l: 'Revenue', v: '$342.8K', c: '#22C55E' }, { l: 'Expenses', v: '$128.5K', c: '#EF4444' }, { l: 'NOI', v: '$214.4K', c: '#176FEB' }, { l: 'Trust', v: '$1.85M', c: '#0A1628' }].map((s) => (
          <div key={s.l} className="rounded-md bg-[#F5F6F8] p-1.5">
            <p className="text-[6px] text-[#94A3B8]">{s.l}</p>
            <p className="text-[10px] font-bold" style={{ color: s.c }}>{s.v}</p>
          </div>
        ))}
      </div>
      {[{ l: 'Disbursements', v: '$186.4K' }, { l: 'Vendor invoices', v: '$42.1K' }, { l: 'Tax filed', v: '$18.6K' }].map((i) => (
        <div key={i.l} className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2 py-1">
          <span className="text-[7px] text-[#555860]">{i.l}</span>
          <span className="text-[7px] font-bold text-[#0A1628]">{i.v}</span>
        </div>
      ))}
    </div>
  ),
  maintenance: () => (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-[#0A1628]">Today&apos;s Route</p>
        <span className="rounded-full bg-[#176FEB]/10 px-2 py-0.5 text-[7px] font-bold text-[#176FEB]">3 stops</span>
      </div>
      {[
        { id: 'WO-2851', unit: 'Unit 4B', issue: 'Leaking faucet', priority: 'High', color: '#EF4444', num: 1 },
        { id: 'WO-2849', unit: 'Unit 7C', issue: 'Dishwasher repair', priority: 'Medium', color: '#F59E0B', num: 2 },
        { id: 'WO-2847', unit: 'Unit 2A', issue: 'Smoke detector', priority: 'Low', color: '#22C55E', num: 3 },
      ].map((wo) => (
        <div key={wo.id} className="rounded-lg border border-[#E5E7EB] bg-white p-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-5 w-5 rounded-full bg-[#176FEB] flex items-center justify-center text-[7px] font-bold text-white">{wo.num}</div>
            <span className="text-[9px] font-bold text-[#0A1628]">{wo.id}</span>
            <span className="ml-auto text-[7px] font-bold" style={{ color: wo.color }}>{wo.priority}</span>
          </div>
          <p className="text-[7px] text-[#94A3B8] mb-1.5">{wo.unit} · {wo.issue}</p>
          <div className="flex gap-1">
            <div className="rounded-md bg-[#176FEB] px-2 py-0.5 text-[6px] font-semibold text-white">Navigate</div>
            <div className="rounded-md border border-[#E5E7EB] px-2 py-0.5 text-[6px] text-[#555860]">Photo</div>
            <div className="rounded-md border border-[#E5E7EB] px-2 py-0.5 text-[6px] text-[#555860]">Complete</div>
          </div>
        </div>
      ))}
    </div>
  ),
  leasing: () => (
    <div className="p-3 space-y-2">
      <p className="text-[8px] font-bold text-[#0A1628]">Leasing Pipeline</p>
      <div className="grid grid-cols-2 gap-1">
        {[{ s: 'Applied', n: 8, c: '#176FEB' }, { s: 'Screening', n: 5, c: '#F59E0B' }, { s: 'Approved', n: 3, c: '#22C55E' }, { s: 'Signed', n: 2, c: '#0B5AD4' }].map((p) => (
          <div key={p.s} className="rounded-md bg-[#F5F6F8] p-1.5 text-center">
            <p className="text-[11px] font-bold" style={{ color: p.c }}>{p.n}</p>
            <p className="text-[6px] text-[#94A3B8]">{p.s}</p>
          </div>
        ))}
      </div>
      {[{ n: 'Emily R.', u: '5D · 2BR', s: 94 }, { n: 'David L.', u: '8A · 1BR', s: 88 }, { n: 'Maria S.', u: '2C · 3BR', s: 91 }].map((a) => (
        <div key={a.n} className="flex items-center justify-between rounded-md bg-[#F5F6F8] px-2 py-1">
          <div>
            <p className="text-[7px] font-medium text-[#0A1628]">{a.n}</p>
            <p className="text-[6px] text-[#94A3B8]">{a.u}</p>
          </div>
          <span className="text-[8px] font-bold text-[#22C55E]">{a.s}</span>
        </div>
      ))}
    </div>
  ),
}

function MobileFrame({ label, tabKey }: { label: string; tabKey: string }) {
  const screenshot = mobileScreenshots[tabKey]
  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
      {/* Dynamic Island only — Figma screenshots have their own status bar */}
      <div className="flex justify-center bg-white pt-1">
        <div className="h-[14px] w-[60px] rounded-full bg-[#1a1a1a]" />
      </div>
      {/* Screenshot — locked aspect ratio */}
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {screenshot ? (
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="object-cover object-top"
            sizes="260px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-b from-[#176FEB]/5 to-[#176FEB]/10 p-4">
            <p className="text-center text-[9px] font-medium text-[#176FEB]/60">{label}</p>
          </div>
        )}
      </div>
      {/* Home indicator */}
      <div className="flex justify-center bg-white py-1.5">
        <div className="h-1 w-20 rounded-full bg-[#1a1a1a]/20" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════ */
/*  Main export                                */
/* ═══════════════════════════════════════════ */
export default function ProductScreenshotShowcase() {
  const [activeTab, setActiveTab] = useState('owner')

  const activeLabel = tabs.find((t) => t.key === activeTab)?.label ?? 'Dashboard'

  return (
    <section className="relative overflow-hidden bg-brand-off-white py-12 md:py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-grid bg-grid-mask opacity-[0.03]" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 h-[500px] w-[700px] rounded-full bg-[#176FEB]/[0.05] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={revealItem}
            className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue"
          >
            Inside the Platform
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mt-3 font-display text-4xl font-normal text-[#0A1628] md:text-5xl"
          >
            See what runs inside <span className="text-keyword">Revun</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-4 max-w-xl text-lg text-brand-graphite-mid"
          >
            Real workflows. Real dashboards. Real control.
          </motion.p>
        </RevealOnScroll>

        {/* Tabs — horizontal scroll on mobile, centered wrap on desktop */}
        <div className="mt-12 -mx-6 px-6 overflow-x-auto no-scrollbar md:mx-0 md:px-0 md:overflow-visible">
          <div className="flex items-center gap-2 md:flex-wrap md:justify-center w-max md:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'border border-border bg-white text-brand-graphite-mid hover:border-brand-blue/30 hover:text-brand-graphite'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Device frames */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Desktop — horizontal scroll on mobile so mockup stays crisp */}
              <div className="-mx-6 px-6 overflow-x-auto no-scrollbar lg:mx-0 lg:px-0 lg:overflow-visible lg:flex-1 lg:min-w-0">
                <div className="w-[640px] sm:w-full">
                  <DesktopFrame label={activeLabel} tabKey={activeTab} />
                </div>
              </div>
              {/* Mobile phone — hidden on small screens, visible on lg+ */}
              <div className="hidden lg:block w-full max-w-[260px] shrink-0">
                <MobileFrame label={activeLabel} tabKey={activeTab} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
