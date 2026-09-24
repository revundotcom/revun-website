'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, MapPin, X } from 'lucide-react'
import { searchLocations, type ResolvedLocation } from '@/lib/location-search'

interface Props {
  value: ResolvedLocation | null
  onChange: (location: ResolvedLocation | null) => void
  error?: string
  required?: boolean
  className?: string
  inputClassName?: string
}

export function CityAutocomplete({
  value,
  onChange,
  error,
  required = true,
  className = '',
  inputClassName = '',
}: Props) {
  const [inputValue, setInputValue] = useState(value?.displayText || '')
  const [results, setResults] = useState<ResolvedLocation[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [hasSearched, setHasSearched] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Sync external value changes (e.g. form reset)
  useEffect(() => {
    if (value) {
      setInputValue(value.displayText)
    } else if (!inputValue) {
      setInputValue('')
    }
  }, [value])

  // Debounce search with ~120ms delay
  useEffect(() => {
    const query = inputValue.trim()

    // If query matches current resolved location text, no need to reopen search
    if (value && query.toLowerCase() === value.displayText.toLowerCase()) {
      return
    }

    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      setActiveIndex(-1)
      setHasSearched(false)
      return
    }

    const timer = setTimeout(() => {
      const hits = searchLocations(query, 35)
      setResults(hits)
      setIsOpen(true)
      setActiveIndex(-1)
      setHasSearched(true)
    }, 120)

    return () => clearTimeout(timer)
  }, [inputValue, value])

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll<HTMLLIElement>('li')
      const target = items[activeIndex]
      if (target) {
        target.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [activeIndex])

  function handleSelect(item: ResolvedLocation) {
    setInputValue(item.displayText)
    onChange(item)
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function handleClear() {
    setInputValue('')
    onChange(null)
    setResults([])
    setIsOpen(false)
    setActiveIndex(-1)
    setHasSearched(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && inputValue.trim().length >= 2) {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length > 0) {
        setActiveIndex((prev) => (prev + 1) % results.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length > 0) {
        setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results.length > 0) {
        const itemToSelect = activeIndex >= 0 && activeIndex < results.length ? results[activeIndex] : results[0]
        if (itemToSelect) {
          handleSelect(itemToSelect)
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setInputValue(val)
    // If user edited text away from selected location, un-verify
    if (value && val.trim().toLowerCase() !== value.displayText.toLowerCase()) {
      onChange(null)
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="mb-1 block text-xs font-semibold text-slate-600">
        City / Residential Location {required && <span className="text-red-500">*</span>}
      </label>

      {/* Single clean Google Places-style input field */}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center text-slate-400">
          <MapPin className="h-4 w-4" aria-hidden="true" />
        </div>

        <input
          ref={inputRef}
          type="text"
          name="residential_location_display"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0 && inputValue.trim().length >= 2) {
              setIsOpen(true)
            }
          }}
          autoComplete="off"
          placeholder="Search city or province (e.g. Toronto, Jaipur, Ontario)..."
          className={`w-full rounded-lg border ${
            error ? 'border-red-500' : 'border-slate-200'
          } bg-slate-50 py-2 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#176FEB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#176FEB]/20 transition-colors ${inputClassName}`}
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 transition-colors"
            title="Clear location"
            aria-label="Clear location"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Hidden inputs to guarantee FormData passes all resolved keys */}
      <input type="hidden" name="city" value={value?.city || ''} />
      <input type="hidden" name="state" value={value?.state || ''} />
      <input type="hidden" name="province" value={value?.province || ''} />
      <input type="hidden" name="state_province" value={value?.state_province || ''} />
      <input type="hidden" name="country" value={value?.country || ''} />
      <input type="hidden" name="country_code" value={value?.country_code || ''} />
      <input type="hidden" name="residential_location" value={value?.residential_location || ''} />

      {/* Error message */}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}

      {/* Dropdown popup underneath */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <ul ref={listRef} role="listbox" className="py-1">
              {results.map((item, index) => {
                const isItemActive = index === activeIndex
                const isSelected = value?.id === item.id

                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`group flex cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors ${
                      isItemActive
                        ? 'bg-[#176FEB]/10 text-slate-900'
                        : isSelected
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {/* Country Code Badge */}
                    <span className="shrink-0 rounded border border-slate-200/90 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                      [{item.country_code}]
                    </span>

                    {/* MapPin Icon */}
                    <MapPin
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isItemActive || isSelected ? 'text-[#176FEB]' : 'text-slate-400 group-hover:text-[#176FEB]'
                      }`}
                      aria-hidden="true"
                    />

                    {/* Bold Name & Subtle text */}
                    <div className="min-w-0 flex-1 truncate">
                      <span className="font-bold text-slate-900">{item.boldText}</span>
                      <span className="ml-1.5 text-xs text-slate-500 font-normal">{item.subtleText}</span>
                    </div>

                    {/* Checkmark for currently selected item */}
                    {isSelected && (
                      <Check className="ml-auto h-4 w-4 shrink-0 text-[#176FEB]" aria-hidden="true" />
                    )}
                  </li>
                )
              })}
            </ul>
          ) : hasSearched ? (
            <div className="p-4 text-center">
              <p className="text-xs font-medium leading-relaxed text-slate-500">
                No matching location found. Try searching for a nearby major city, district, or your state/province name.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
