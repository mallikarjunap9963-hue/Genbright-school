import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_VIDEO_REELS, NAV_ITEMS, STORY_SCENES } from '../data/storyScenes'
import { StoryScenesList } from './StoryScenesList'
import { Footer } from './Footer'
import './Discover2Page.css'

interface Discover2PageProps {
  onBackHome: (targetScene?: string) => void
  onOpenModal: (modalId: string) => void
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

export function Discover2Page({ onBackHome, onOpenModal }: Discover2PageProps) {
  const stageTrackRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [alertDismissed, setAlertDismissed] = useState(false)
  const dropdownWrapRef = useRef<HTMLDivElement | null>(null)
  const dropdownTimerRef = useRef<number | null>(null)

  const currentReel = HERO_VIDEO_REELS[0]
  const heroScene = STORY_SCENES[0]

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setMobileMenuOpen(false)
      }
    }
    const onOutside = (e: MouseEvent) => {
      if (dropdownWrapRef.current && !dropdownWrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', onEscape)
    document.addEventListener('mousedown', onOutside)
    return () => {
      window.removeEventListener('keydown', onEscape)
      document.removeEventListener('mousedown', onOutside)
    }
  }, [])

  useEffect(() => {
    const track = stageTrackRef.current
    if (!track) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      track.style.setProperty('--d2-text-opacity', '1')
      track.style.setProperty('--d2-text-y', '0px')
      track.style.setProperty('--d2-expand-p', '0')
      track.style.setProperty('--d2-sheet-y', '100%')
      track.style.setProperty('--d2-sheet-opacity', '0')
      track.dataset.fullHidden = 'true'
      return
    }

    let rafId = 0

    const updateFromScroll = () => {
      rafId = 0
      const rect = track.getBoundingClientRect()
      const scrollableDistance = Math.max(1, track.offsetHeight - window.innerHeight)
      const scrolled = clamp01(-rect.top / scrollableDistance)

      // Phase 1 (0% -> 34%): initial split text fades out & video expands to full width/height
      const textFadeProgress = clamp01((scrolled - 0.02) / 0.28)
      const textOpacity = 1 - textFadeProgress
      const textTranslateY = -(textFadeProgress * 44)
      const expandProgress = clamp01(scrolled / 0.34)

      // Phase 2 (34% -> 46%): full video remains clearly visible before the green layer slides up
      // Phase 3 (46% -> 82%): translucent green overlay sheet glides up over video with text on top
      const sheetProgress = clamp01((scrolled - 0.46) / 0.36)
      const sheetY = (1 - sheetProgress) * 100
      const sheetOpacity = clamp01(sheetProgress * 1.45)

      track.style.setProperty('--d2-text-opacity', textOpacity.toFixed(4))
      track.style.setProperty('--d2-text-y', `${textTranslateY.toFixed(1)}px`)
      track.style.setProperty('--d2-expand-p', expandProgress.toFixed(4))
      track.style.setProperty('--d2-sheet-y', `${sheetY.toFixed(2)}%`)
      track.style.setProperty('--d2-sheet-opacity', sheetOpacity.toFixed(4))
      track.dataset.textHidden = textOpacity < 0.08 ? 'true' : 'false'
      track.dataset.fullHidden = sheetOpacity < 0.08 ? 'true' : 'false'
    }

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateFromScroll)
      }
    }

    updateFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const cancelDropdownClose = () => {
    if (dropdownTimerRef.current !== null) {
      window.clearTimeout(dropdownTimerRef.current)
      dropdownTimerRef.current = null
    }
  }

  const scheduleDropdownClose = () => {
    cancelDropdownClose()
    dropdownTimerRef.current = window.setTimeout(() => setDropdownOpen(false), 160)
  }

  const scrollToDiscover2Section = useCallback((id: string) => {
    const cleanId = id.replace(/^#/, '')
    if (cleanId === 'scene-01') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(cleanId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="gb-d2">
      {/* HERO-ONLY SCROLL-TO-FULLSCREEN EXPERIENCE */}
      <section
        ref={stageTrackRef}
        className="gb-d2-hero-track"
        aria-label="GenBright Discover 2 Hero"
      >
        <div className="gb-d2-hero-sticky">
          {/* Textured #829b70 Sage Green Canvas Backdrop with Original Campus Building */}
          <div className="gb-d2-canvas-bg" aria-hidden="true">
            <img
              src="/images/hero-campus-building-bg.jpg"
              alt="GenBright Campus Building"
              className="gb-d2-canvas-bg__tex"
            />
            <div className="gb-d2-canvas-bg__tint" />
          </div>

          {/* Reference Two-Tier Top Header inside Hero */}
          <div className="gb-d2-ref-header">
            <div className="gb-d2-ref-header__inner">
              {/* Left Logo Lockup */}
              <button
                type="button"
                className="gb-d2-crest-lockup"
                onClick={() => onBackHome('scene-01')}
                aria-label="GenBright World School — Return Home"
              >
                <span className="gb-d2-crest-badge">
                  <img src="/genbright-logo.png" alt="GenBright World School" />
                </span>
                <span className="gb-d2-crest-name">
                  <span>MOKILA · HYDERABAD</span>
                </span>
              </button>

              {/* Right Two-Tier Navigation */}
              <div className="gb-d2-ref-nav-stack">
                <div className="gb-d2-ref-utility-row">
                  <button
                    type="button"
                    className="gb-d2-portal-btn"
                    onClick={() => onOpenModal('parent-portal')}
                    aria-label="Parent Login"
                  >
                    <svg
                      className="gb-d2-portal-btn__icon"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Parent Login</span>
                  </button>
                  <button
                    type="button"
                    className="gb-d2-portal-btn"
                    onClick={() => onOpenModal('student-portal')}
                    aria-label="Student Login"
                  >
                    <svg
                      className="gb-d2-portal-btn__icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>Student Login</span>
                  </button>
                  <button
                    type="button"
                    className="gb-d2-apply-btn"
                    onClick={() => onOpenModal('admissions')}
                  >
                    Apply Now
                  </button>
                </div>

                <nav className="gb-d2-ref-main-row" aria-label="Discover 2 main navigation">
                  {NAV_ITEMS.map((item) => {
                    if (item.label === 'Discover') {
                      return (
                        <div
                          key={item.label}
                          ref={dropdownWrapRef}
                          className="gb-d2-dropdown-wrap"
                          onMouseEnter={() => {
                            cancelDropdownClose()
                            setDropdownOpen(true)
                          }}
                          onMouseLeave={scheduleDropdownClose}
                        >
                          <div className="gb-d2-discover-split">
                            <button
                              type="button"
                              className="gb-d2-ref-discover-btn"
                              onClick={() => {
                                setDropdownOpen(false)
                                onBackHome(item.target)
                              }}
                            >
                              <span>{item.label}</span>
                            </button>
                            <button
                              type="button"
                              className="gb-d2-ref-discover-toggle"
                              aria-label="Toggle Discover menu"
                              aria-expanded={dropdownOpen}
                              aria-haspopup="true"
                              onClick={() => setDropdownOpen((open) => !open)}
                            >
                              <svg
                                className={`gb-d2-chevron ${dropdownOpen ? 'is-open' : ''}`}
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                          </div>

                          {dropdownOpen && (
                            <div className="gb-d2-dropdown" role="menu">
                              <button
                                type="button"
                                role="menuitem"
                                className="gb-d2-dropdown__item"
                                onClick={() => {
                                  setDropdownOpen(false)
                                  onBackHome('scene-01')
                                }}
                              >
                                <strong>Discover 1</strong>
                                <span>Explore the main school story</span>
                              </button>
                              <button
                                type="button"
                                role="menuitem"
                                className="gb-d2-dropdown__item is-current"
                                onClick={() => {
                                  setDropdownOpen(false)
                                  window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                              >
                                <strong>Discover 2</strong>
                                <span>Full-screen campus video showcase</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    }
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => scrollToDiscover2Section(item.target)}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </div>

              <button
                type="button"
                className="gb-d2-mobile-toggle"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="gb-d2-mobile-panel">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Discover 2
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onBackHome('scene-01')
                  }}
                >
                  Discover 1
                </button>
                {NAV_ITEMS.map((item) => (
                  item.label === 'Discover' ? null :
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      scrollToDiscover2Section(item.target)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right-Side Framed Video Expanding Smoothly to Full-Screen on Scroll */}
          <div className="gb-d2-video-frame">
            <video
              ref={videoRef}
              className="gb-d2-video"
              poster={currentReel.poster}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={currentReel.videoUrl} type="video/mp4" />
              <source src={currentReel.fallbackUrl} type="video/mp4" />
            </video>
            <div className="gb-d2-video-vignette" aria-hidden="true" />

            <button
              type="button"
              className="gb-d2-video-toggle"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="7 4 20 12 7 20 7 4" />
                </svg>
              )}
            </button>
          </div>

          {/* Left-Edge Subtle Admissions Alert Tab */}
          {!alertDismissed && (
            <div className="gb-d2-alert-tab">
              <button
                type="button"
                className="gb-d2-alert-tab__bell"
                onClick={() => onOpenModal('admissions')}
                aria-label="Admissions 2027-28 Alert"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <button
                type="button"
                className="gb-d2-alert-tab__text"
                onClick={() => onOpenModal('admissions')}
              >
                Admissions 2027–28
              </button>
              <button
                type="button"
                className="gb-d2-alert-tab__close"
                onClick={() => setAlertDismissed(true)}
                aria-label="Dismiss notice"
              >
                ×
              </button>
            </div>
          )}

          {/* Overlapping Editorial Typography ("THEY GROW UP / Only Once.") */}
          <div className="gb-d2-hero-type">
            <span className="gb-d2-hero-kicker">THEY GROW UP</span>
            <h1 className="gb-d2-hero-serif">Only Once.</h1>
          </div>

          {/* Rising Translucent Green Overlay Sheet With Scene 01 Text & CTAs */}
          <div className="gb-d2-green-sheet">
            <div className="gb-container gb-d2-green-sheet__inner">
              <div className="gb-hero-overlay__inner gb-d2-green-sheet__content">
                <h2 className="gb-hero-overlay__title gb-d2-expanded-title">
                  <span className="gb-hero-overlay__title-light gb-d2-expanded-title-light">
                    {heroScene.titleDark}
                  </span>{' '}
                  <span className="gb-hero-overlay__title-gold gb-d2-expanded-title-gold">
                    {heroScene.titleGrey}
                  </span>
                </h2>
                <p className="gb-hero-overlay__copy">{heroScene.copy}</p>
                <div className="gb-cta-group gb-feature-ctas gb-hero-overlay__ctas">
                  <button
                    type="button"
                    className="gb-btn gb-btn--primary-gold gb-hero-first-btn"
                    onClick={() => scrollToDiscover2Section(heroScene.primaryCta.target)}
                  >
                    {heroScene.primaryCta.label}
                  </button>
                  <button
                    type="button"
                    className="gb-btn gb-btn--outline-light gb-hero-second-btn"
                    onClick={() => onOpenModal(heroScene.secondaryCta.target)}
                  >
                    {heroScene.secondaryCta.label}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="gb-d2-sheet-down-btn"
                onClick={() => scrollToDiscover2Section('scene-02')}
                aria-label="Scroll to next story section"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INDEX PAGE SECTIONS (SCENES 02–15 + FOOTER) AS-IS */}
      <StoryScenesList
        excludeHero
        onScrollTo={scrollToDiscover2Section}
        onOpenModal={onOpenModal}
      />

      <Footer
        onScrollTo={scrollToDiscover2Section}
        onOpenModal={onOpenModal}
      />
    </div>
  )
}
