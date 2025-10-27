"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface ItineraryItem {
  day: number
  title: string
  activities: string[]
  icon: string
}

interface ItineraryAccordionProps {
  items: ItineraryItem[]
}

export default function ItineraryAccordion({ items }: ItineraryAccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([1])

  const toggleItem = (day: number) => {
    setOpenItems((prev) => (prev.includes(day) ? prev.filter((item) => item !== day) : [...prev, day]))
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.day} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(item.day)}
            className="w-full px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-montserrat font-semibold text-lg">
                  Día {item.day}: {item.title}
                </h3>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${openItems.includes(item.day) ? "rotate-180" : ""}`}
            />
          </button>

          {openItems.includes(item.day) && (
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
              <ul className="space-y-2">
                {item.activities.map((activity, index) => (
                  <li key={index} className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mr-3" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
