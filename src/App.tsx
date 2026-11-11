import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { StoryScenesList } from './components/StoryScenesList'
import { Footer } from './components/Footer'
import { InteractiveModal } from './components/InteractiveModal'
import { STORY_SCENES } from './data/storyScenes'
import './App.css'

export function App() {
  const [activeScene, setActiveScene] = useState<string>('scene-01')
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const introTimeout = window.setTimeout(() => setShowIntro(false), 1800)
    return () => window.clearTimeout(introTimeout)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: 0.05,
      }
    )

    STORY_SCENES.forEach((scene) => {
      const el = document.getElementById(scene.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToScene = useCallback((id: string) => {
    const cleanId = id.replace(/^#/, '')
    const el = document.getElementById(cleanId)
    if (el) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.getBoundingClientRect().height : 72
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth',
      })
    } else {
      console.warn(`[GenBright] Target section #${cleanId} not found`)
    }
  }, [])

  const handleOpenModal = useCallback((modalId: string) => {
    setActiveModal(modalId)
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  return (
    <div className="gb-app">
      {showIntro && (
        <div className="gb-site-intro" aria-hidden="true">
          <img src="/genbright-logo.png" alt="" />
        </div>
      )}
      <Header
        activeScene={activeScene}
        onScrollTo={scrollToScene}
        onOpenModal={handleOpenModal}
      />

      <StoryScenesList
        onScrollTo={scrollToScene}
        onOpenModal={handleOpenModal}
      />

      <Footer
        onScrollTo={scrollToScene}
        onOpenModal={handleOpenModal}
      />

      <InteractiveModal
        modalId={activeModal}
        onClose={handleCloseModal}
      />

      {chatOpen && (
        <section className="gb-chat-widget" aria-label="GenBright chat">
          <div className="gb-chat-widget__header">
            <span className="gb-chat-widget__avatar" aria-hidden="true">G</span>
            <div>
              <strong>GenBright</strong>
              <span>How can we help?</span>
            </div>
            <button
              type="button"
              className="gb-chat-widget__close"
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <p>Connect with our team about admissions or a campus visit.</p>
          <button
            type="button"
            className="gb-chat-widget__action"
            onClick={() => {
              setChatOpen(false)
              handleOpenModal('admissions')
            }}
          >
            Talk to our admissions team
          </button>
          <button
            type="button"
            className="gb-chat-widget__action gb-chat-widget__action--secondary"
            onClick={() => {
              setChatOpen(false)
              handleOpenModal('parent-portal')
            }}
          >
            Parent portal help
          </button>
        </section>
      )}
      <button
        type="button"
        className={`gb-chat-widget__toggle ${chatOpen ? 'is-open' : ''}`}
        onClick={() => setChatOpen((open) => !open)}
        aria-expanded={chatOpen}
        aria-label={chatOpen ? 'Close GenBright chat' : 'Open GenBright chat'}
      >
        <img src="/images/chat%20bot%20img.avif" alt="" aria-hidden="true" />
      </button>

    </div>
  )
}

export default App
