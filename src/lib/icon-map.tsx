import {
  Home,
  Building2,
  Handshake,
  FileText,
  Wrench,
  TrendingUp,
  Layers,
  Sparkles,
  Calendar,
  Wallet,
  Plug,
  MapPin,
  Users,
  CreditCard,
  BarChart3,
  BookOpen,
} from 'lucide-react'

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building2,
  Handshake,
  FileText,
  Wrench,
  TrendingUp,
  Layers,
  Sparkles,
  Calendar,
  Wallet,
  Plug,
  MapPin,
  Users,
  CreditCard,
  BarChart3,
  BookOpen,
}

export function renderIcon(name: string | undefined, className = 'h-5 w-5') {
  if (!name) return null
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon className={className} />
}
