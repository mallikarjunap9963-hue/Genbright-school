import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { StoryScenesList } from './components/StoryScenesList'
import { Footer } from './components/Footer'
import { InteractiveModal } from './components/InteractiveModal'
import { BrandLoader } from './components/BrandLoader'
import { Discover2Page } from './components/Discover2Page'
import { STORY_SCENES } from './data/storyScenes'
import './App.css'

type ActiveView = 'home' | 'discover2'

function getInitialView(): ActiveView {
  if (typeof window === 'undefined') return 'home'
  if (
    window.location.pathname === '/discover-2' ||
    window.location.hash.startsWith('#discover-2')
  ) {
    return 'discover2'
  }
  return 'home'
}

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>(getInitialView)
  const [activeScene, setActiveScene] = useState<string>('scene-01')
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
  }, [])

  useEffect(() => {
    if (activeView !== 'home') return

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
  }, [activeView])

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

  const handleOpenDiscover2 = useCallback(() => {
    setActiveView('discover2')
    setChatOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (window.location.hash !== '#discover-2') {
      window.history.pushState(null, '', '#discover-2')
    }
  }, [])

  const handleBackHome = useCallback(
    (targetScene?: string) => {
      setActiveView('home')
      if (window.location.hash === '#discover-2' || window.location.pathname === '/discover-2') {
        window.history.pushState(null, '', '/')
      }
      if (targetScene && targetScene !== 'scene-01') {
        window.setTimeout(() => scrollToScene(targetScene), 60)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    [scrollToScene]
  )

  useEffect(() => {
    const onNavSync = () => {
      if (
        window.location.pathname === '/discover-2' ||
        window.location.hash.startsWith('#discover-2')
      ) {
        setActiveView('discover2')
      } else {
        setActiveView('home')
      }
    }
    window.addEventListener('popstate', onNavSync)
    window.addEventListener('hashchange', onNavSync)
    return () => {
      window.removeEventListener('popstate', onNavSync)
      window.removeEventListener('hashchange', onNavSync)
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
      {showLoader && <BrandLoader onComplete={handleLoaderComplete} />}

      {activeView === 'discover2' ? (
        <Discover2Page
          onBackHome={handleBackHome}
          onOpenModal={handleOpenModal}
        />
      ) : (
        <>
          <Header
            activeScene={activeScene}
            onScrollTo={scrollToScene}
            onOpenModal={handleOpenModal}
            onOpenDiscover2={handleOpenDiscover2}
          />

          <StoryScenesList
            onScrollTo={scrollToScene}
            onOpenModal={handleOpenModal}
          />

          <Footer
            onScrollTo={scrollToScene}
            onOpenModal={handleOpenModal}
          />
        </>
      )}

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
      {activeView === 'home' && (
        <button
          type="button"
          className={`gb-chat-widget__toggle ${chatOpen ? 'is-open' : ''}`}
          onClick={() => setChatOpen((open) => !open)}
          aria-expanded={chatOpen}
          aria-label={chatOpen ? 'Close GenBright chat' : 'Open GenBright chat'}
        >
          <img src="/images/chat%20bot%20img.avif" alt="" aria-hidden="true" />
        </button>
      )}

    </div>
  )
}

export default App
