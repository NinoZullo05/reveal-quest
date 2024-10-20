import React, { useState } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Settings, HelpCircle } from 'lucide-react'

export default function GuidePopup({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState(null)

  if (!isOpen) return null; 

  const sections = [
    {
      id: 'objective',
      title: 'Obiettivo del Gioco',
      content: 'Esplora l\'intera immagine muovendoti sulla griglia per rivelare tutti i quadrati.',
      icon: null,
    },
    {
      id: 'movement',
      title: 'Movimento',
      content: 'Usa le frecce direzionali per muoverti sulla griglia.',
      icon: (
        <div className="grid grid-cols-3 gap-1 mt-2">
          <div></div>
          <ArrowUp className="text-blue-500 w-5 h-5" />
          <div></div>
          <ArrowLeft className="text-blue-500 w-5 h-5" />
          <div></div>
          <ArrowRight className="text-blue-500 w-5 h-5" />
          <div></div>
          <ArrowDown className="text-blue-500 w-5 h-5" />
          <div></div>
        </div>
      ),
    },
    {
      id: 'restart',
      title: 'Ricomincia',
      content: 'Clicca sul pulsante "Ricomincia" per iniziare un nuovo livello con una nuova immagine.',
      icon: <RotateCcw className="text-green-500 w-5 h-5 mt-2" />,
    },
    {
      id: 'settings',
      title: 'Impostazioni',
      content: 'Accedi alle impostazioni del gioco per personalizzare la tua esperienza.',
      icon: <Settings className="text-gray-500 w-5 h-5 mt-2" />,
    },
    {
      id: 'help',
      title: 'Aiuto',
      content: 'Se hai bisogno di assistenza, clicca sul pulsante "Aiuto" per visualizzare questa guida.',
      icon: <HelpCircle className="text-purple-500 w-5 h-5 mt-2" />,
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="relative max-w-md mx-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto "> {/* max-h-[80vh] and overflow-y-auto for scrollable content */}
        <button
          className="absolute top-2 right-2 text-gray-800 dark:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Guida al Gioco
        </h1>
        {sections.map((section) => (
          <div
            key={section.id}
            className={`mb-4 p-3 rounded-lg transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-blue-100 dark:bg-blue-900 shadow-md transform scale-105'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
            onMouseEnter={() => setActiveSection(section.id)}
            onMouseLeave={() => setActiveSection(null)}
          >
            <h2 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
            {section.icon && (
              <div className="flex justify-center mt-2">{section.icon}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
