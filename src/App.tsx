import { useState, useEffect, useCallback } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Header } from './components/Header'
import { StoryScenesList } from './components/StoryScenesList'
import { Footer } from './components/Footer'
import { InteractiveModal } from './components/InteractiveModal'
import { BrandLoader } from './components/BrandLoader'
import { Discover2Page } from './components/Discover2Page'
import { STORY_SCENES } from './data/storyScenes'
import './App.css'

type ActiveView = 'home' | 'discover2' | 'discover3'

function getInitialView(): ActiveView {
  if (typeof window === 'undefined') return 'home'
  if (
    window.location.pathname === '/discover-2' ||
    window.location.hash.startsWith('#discover-2')
  ) {
    return 'discover2'
  }
  if (
    window.location.pathname === '/discover-3' ||
    window.location.hash.startsWith('#discover-3')
  ) {
    return 'discover3'
  }
  if (
    window.location.pathname === '/discover-1' ||
    window.location.hash.startsWith('#discover-1') ||
    window.location.hash.startsWith('#scene-')
  ) {
    return 'home'
  }
  if (window.location.pathname === '/' && !window.location.hash) {
    return 'discover3'
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

  useEffect(() => {
    if (window.location.pathname === '/' && !window.location.hash) {
      window.history.replaceState(null, '', '/#discover-3')
    }
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 2200,
      easing: 'ease-out-cubic',
      offset: 120,
      delay: 0,
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    })

    return () => AOS.refreshHard()
  }, [])

  useEffect(() => {
    window.requestAnimationFrame(() => AOS.refreshHard())
  }, [activeView])

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const frameId = window.requestAnimationFrame(() => {
      const textSelectors = [
        '.gb-scene h1',
        '.gb-scene h2',
        '.gb-scene h3',
        '.gb-scene p',
        '.gb-d2 h1',
        '.gb-d2 h2',
        '.gb-d2 h3',
        '.gb-d2 p',
        '.gb-ref-footer h1',
        '.gb-ref-footer h2',
        '.gb-ref-footer h3',
        '.gb-ref-footer p',
        '.gb-ref-footer__brand-meta',
      ]

      document.querySelectorAll(textSelectors.join(',')).forEach((element) => {
        const htmlElement = element as HTMLElement
        const scene = htmlElement.closest('.gb-scene')
        const sceneId = scene?.id
        const isVerticalSection =
          sceneId === 'scene-03' ||
          sceneId === 'scene-08' ||
          sceneId === 'scene-09'
        const textStartsFromRight =
          sceneId === 'scene-05' ||
          sceneId === 'scene-07'

        htmlElement.setAttribute(
          'data-aos',
          isVerticalSection
            ? 'fade-down'
            : textStartsFromRight
              ? 'fade-left'
              : 'fade-right'
        )
        htmlElement.setAttribute('data-aos-duration', '1400')
        htmlElement.setAttribute('data-aos-offset', '70')
      })

      const mediaSelectors = [
        '#scene-02 .gb-scene02-collage',
        '#scene-03 .gb-learner-card',
        '#scene-04 .gb-scene04-top__media',
        '#scene-05 .gb-scene05-dark-split__media',
        '#scene-06 .gb-scene06-media',
        '#scene-07 .gb-scene07-carousel-container',
        '#scene-08 .gb-centres-carousel',
        '#scene-09 .gb-scene09-mosaic-grid',
        '#scene-12 .gb-scene12-ref__media-outer',
        '#scene-13 .gb-scene13-media-wrap',
      ]

      document.querySelectorAll(mediaSelectors.join(',')).forEach((element) => {
        const htmlElement = element as HTMLElement
        const sceneId = htmlElement.closest('.gb-scene')?.id
        const isVerticalSection =
          sceneId === 'scene-03' ||
          sceneId === 'scene-08' ||
          sceneId === 'scene-09'
        const mediaStartsFromLeft =
          sceneId === 'scene-05' ||
          sceneId === 'scene-07'

        htmlElement.setAttribute(
          'data-aos',
          isVerticalSection
            ? 'fade-up'
            : mediaStartsFromLeft
              ? 'fade-right'
              : 'fade-left'
        )
        htmlElement.setAttribute('data-aos-duration', '1400')
        htmlElement.setAttribute('data-aos-offset', '70')
      })

      AOS.refreshHard()

      const animatedText = document.querySelectorAll<HTMLElement>('[data-aos]')
      if (!('IntersectionObserver' in window)) {
        animatedText.forEach((element) => element.classList.add('aos-animate'))
        return
      }

      const textObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('aos-animate')
              textObserver.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '0px 0px -5% 0px', threshold: 0 }
      )

      observer = textObserver
      animatedText.forEach((element) => textObserver.observe(element))
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      observer?.disconnect()
    }
  }, [activeView])

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
      window.history.pushState(null, '', '/#discover-2')
    }
  }, [])

  const handleOpenDiscover3 = useCallback(() => {
    setActiveView('discover3')
    setChatOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (window.location.hash !== '#discover-3') {
      window.history.pushState(null, '', '/#discover-3')
    }
  }, [])

  const handleBackHome = useCallback(
    (targetScene?: string) => {
      setActiveView('home')
      if (window.location.hash !== '#discover-1') {
        window.history.pushState(null, '', '/#discover-1')
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
      setActiveView(getInitialView())
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
          onOpenDiscover2={handleOpenDiscover2}
          onOpenDiscover3={handleOpenDiscover3}
        />
      ) : activeView === 'discover3' ? (
        <Discover2Page
          variant="discover3"
          onBackHome={handleBackHome}
          onOpenModal={handleOpenModal}
          onOpenDiscover2={handleOpenDiscover2}
          onOpenDiscover3={handleOpenDiscover3}
        />
      ) : (
        <>
          <Header
            activeScene={activeScene}
            onScrollTo={scrollToScene}
            onOpenModal={handleOpenModal}
            onOpenDiscover2={handleOpenDiscover2}
            onOpenDiscover3={handleOpenDiscover3}
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
