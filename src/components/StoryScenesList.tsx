import React, { useRef, useEffect, useState } from 'react'
import {
  STORY_SCENES,
  HERO_VIDEO_REELS,
  THIRTEEN_CENTRES,
  FOUR_PILLARS_DATA,
  type SceneCTA,
} from '../data/storyScenes'

const LEARNER_PROFILES = [
  {
    title: 'The Dreamer',
    subtitle: 'Creative, imaginative & poetic vision',
    tag: 'Creativity & Arts',
    description: 'Thrives in open-ended creative inquiry, visual storytelling, and connecting big ideas across disciplines.',
    imageUrl: '/images/scene-03-learner-guitar-hd.jpg',
    objectPosition: '42% 35%',
    imageAlt: 'GenBright student happily playing an acoustic guitar',
  },
  {
    title: 'The Explorer',
    subtitle: 'Curious, experiential & outdoor discovery',
    tag: 'Living Ecology',
    description: 'Learns through direct physical inquiry, botanical exploration, and hands-on scientific experimentation.',
    imageUrl: '/images/scene-03-learner-pickleball-hd.jpg',
    objectPosition: '70% 32%',
    imageAlt: 'Energetic GenBright student focused on outdoor pickleball rally',
  },
  {
    title: 'The Quiet Observer',
    subtitle: 'Reflective, precise & deep analytical focus',
    tag: 'Inquiry & Rigour',
    description: 'Absorbs subtle nuances, builds deep conceptual clarity, and approaches challenges with calm, focused determination.',
    imageUrl: '/images/scene-03-learner-reading-hd.jpg',
    objectPosition: '50% 38%',
    imageAlt: 'GenBright student reading thoughtfully in the library',
  },
  {
    title: 'The Energetic Questioner',
    subtitle: 'Bold, spirited & collaborative leadership',
    tag: 'Leadership & Voice',
    description: 'Sparks intellectual dialogue with passionate questions, rallies peer teams, and turns ideas into active movement.',
    imageUrl: '/images/scene-03-learner-hands-on-hd.jpg',
    objectPosition: '50% 35%',
    imageAlt: 'Energetic GenBright students collaborating hands-on on an inquiry project with focus and teamwork',
  },
]

const CHILDHOOD_MOTION_GALLERY = [
  {
    id: 'motion-1',
    title: 'Joyful Collaboration & Craft',
    imageUrl: '/images/scene-09-motion-paper-globe-hd.jpg',
    imageAlt: 'Two smiling GenBright students happily crafting paper-mâché globes together outdoors in the sunlit courtyard',
  },
  {
    id: 'motion-2',
    title: 'Hands-on Problem Solving',
    imageUrl: '/images/scene-09-motion-classroom-hd.jpg',
    imageAlt: 'GenBright students engaged in hands-on problem solving and Montessori learning in the classroom',
  },
  {
    id: 'motion-3',
    title: 'Scientific Wonder & Inquiry',
    imageUrl: '/images/scene-09-motion-science-inquiry-hd.jpg',
    imageAlt: 'GenBright educator and student exploring human biology and anatomy charts in the science classroom',
  },
  {
    id: 'motion-4',
    title: 'Student Work & Courage',
    imageUrl: '/images/scene-09-motion-student-work-hd.jpg',
    imageAlt: 'GenBright student proudly engaging with emotional wellbeing charts and creative student work display',
  },
  {
    id: 'motion-5',
    title: 'Active Athletics & Team Sports',
    imageUrl: '/images/scene-09-motion-football-hd.jpg',
    imageAlt: 'GenBright students and sports coach playing football together on the outdoor campus athletic field',
  },
]

const CAMPUS_SLIDESHOW = [
  {
    id: 'camp-1',
    imageUrl: '/images/scene-06-campus-sports-hd.jpg',
    alt: 'GenBright students running and playing soccer on lush green campus turf',
  },
  {
    id: 'camp-2',
    imageUrl: '/images/scene-06-classroom-puzzle-hd.jpg',
    alt: 'Student solving hands-on geometric puzzle board in Cambridge classroom',
  },
  {
    id: 'camp-3',
    imageUrl: '/images/scene-06-outdoor-craft-hd.jpg',
    alt: 'Educators and students collaborating on hands-on project outdoors',
  },
  {
    id: 'camp-4',
    imageUrl: '/images/scene-06-cricket-nets-hd.jpg',
    alt: 'Student practicing athletic skills at the campus sports cricket nets arena',
  },
]

const COMMUNITY_IMAGE = {
  imageUrl: '/images/scene-12-community-partners-hd.jpg',
  alt: 'GenBright leadership, educators, mentors and students collaborating on creative projects in the campus community',
}

const HERO_QUICK_LINKS = [
  { label: 'Calendar', icon: 'calendar', action: 'modal:bright-times' },
  { label: 'Learning', icon: 'book', action: 'scroll:scene-03' },
  { label: "Let's Talk", icon: 'chat', action: 'modal:admissions' },
  { label: 'Campus Visit', icon: 'campus', action: 'modal:admissions' },
  { label: 'Parent Portal', icon: 'parent', action: 'modal:parent-portal' },
  { label: 'Admissions', icon: 'admissions', action: 'scroll:scene-15' },
]

function HeroQuickLinkIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    calendar:
      'M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 14h.01 M12 14h.01 M16 14h.01 M8 17h.01 M12 17h.01',
    book:
      'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20 M8 7h8 M8 10h8',
    chat:
      'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z',
    campus:
      'm3 10 9-7 9 7v11H3z M9 21v-7h6v7 M7 11h2 M15 11h2',
    parent:
      'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M16 3.2a4 4 0 0 1 0 7.6 M20 21v-2a4 4 0 0 0-3-3.87',
    admissions:
      'm3 10 9-5 9 5-9 5z M7 12v5c3 3 7 3 10 0v-5 M21 10v6',
  }

  return (
    <svg
      className="gb-hero-quick-access__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

const FOUNDERS_AND_LEADERS = [
  {
    id: 'leader-1',
    num: '01',
    name: 'Dhanyabharathi Kannan',
    designation: 'Founder & Educationist',
    imageUrl: '/images/scene-07-leader-01-hd.jpg',
    objectPosition: '50% 18%',
    imageAlt: 'Dhanyabharathi Kannan, Founder & Educationist at GenBright World School',
  },
  {
    id: 'leader-2',
    num: '02',
    name: 'Dr. Ananya Sundaram',
    designation: 'Head of Cambridge & Pedagogical Research',
    imageUrl: '/images/scene-07-leader-02-hd.jpg',
    objectPosition: '50% 15%',
    imageAlt: 'Leadership team member at GenBright World School',
  },
  {
    id: 'leader-3',
    num: '03',
    name: 'Priyadarshini Ram',
    designation: 'Director of Early Childhood & Curriculum',
    imageUrl: '/images/scene-07-leader-03-hd.jpg',
    objectPosition: '50% 15%',
    imageAlt: 'Leadership team member at GenBright World School',
  },
  {
    id: 'leader-4',
    num: '04',
    name: 'Radhika Seshadri',
    designation: 'Dean of Whole-Child Well-Being & Pastoral Care',
    imageUrl: '/images/scene-07-leader-04-hd.jpg',
    objectPosition: '50% 15%',
    imageAlt: 'Leadership team member at GenBright World School',
  },
  {
    id: 'leader-5',
    num: '05',
    name: 'Executive & Campus Leadership',
    designation: 'Director of Operations & Strategic Development',
    imageUrl: '/images/scene-07-leader-05-hd.jpg',
    objectPosition: '50% 20%',
    imageAlt: 'Leadership team member at GenBright World School',
  },
]

interface StoryScenesListProps {
  onScrollTo: (id: string) => void
  onOpenModal: (modalId: string) => void
  excludeHero?: boolean
}

function SceneReferenceHeader({
  number,
  titleDark,
  titleGrey,
  centered = false,
}: {
  number: string
  titleDark: string
  titleGrey: string
  centered?: boolean
}) {
  const numInt = parseInt(number, 10) || 2
  const accentThemes = ['emerald', 'amber'] as const
  const theme = accentThemes[numInt % accentThemes.length]

  return (
    <div className={`gb-ref-header gb-ref-header--${theme} ${centered ? 'gb-ref-header--center' : ''}`}>
      <h2 className="gb-ref-title">
        <span className="gb-ref-title__dark">{titleDark} </span>
        <span className="gb-ref-title__grey">{titleGrey}</span>
      </h2>
    </div>
  )
}

function AnimatedCopy({ text, className }: { text: string; className: string }) {
  return <p className={className}>{text}</p>
}

function renderConceptIcon(pillarKey: string) {
  if (pillarKey === 'THINK') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
      </svg>
    )
  }
  if (pillarKey === 'FEEL') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
  if (pillarKey === 'MOVE') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="4" r="2" />
        <path d="M6 19l4-3.5 3 2 4.5-1.5" />
        <path d="M8 12.5l3.5-3 3 1.5 3-2" />
        <path d="M12.5 11l-1 5" />
        <path d="M6.5 11.5L4 14" />
      </svg>
    )
  }
  /* PAUSE */
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="2" />
      <rect x="14" y="4" width="4" height="16" rx="2" />
    </svg>
  )
}

export const StoryScenesList = React.memo(function StoryScenesList({
  onScrollTo,
  onOpenModal,
  excludeHero = false,
}: StoryScenesListProps) {
  const mainRef = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [campusSlideIndex, setCampusSlideIndex] = useState(0)
  const [isCampusPaused, setIsCampusPaused] = useState(false)

  const handleQuickLink = (action: string) => {
    const [type, target] = action.split(':')
    if (type === 'scroll') onScrollTo(target)
    if (type === 'modal') onOpenModal(target)
  }

  const handlePrevCampusSlide = () => {
    setCampusSlideIndex((prev) => (prev - 1 + CAMPUS_SLIDESHOW.length) % CAMPUS_SLIDESHOW.length)
  }

  const handleNextCampusSlide = () => {
    setCampusSlideIndex((prev) => (prev + 1) % CAMPUS_SLIDESHOW.length)
  }

  useEffect(() => {
    if (isCampusPaused) return
    const timer = setInterval(() => {
      setCampusSlideIndex((prev) => (prev + 1) % CAMPUS_SLIDESHOW.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isCampusPaused])

  // Pause Hero video when not visible in viewport to prevent GPU/CPU background decoding lag
  useEffect(() => {
    const video = videoRef.current
    if (!video || typeof IntersectionObserver === 'undefined') return
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )
    videoObserver.observe(video)
    return () => videoObserver.disconnect()
  }, [])

  // Optimized scene entrance observer: once visible, keep it visible to avoid thrashing CSS styles during fast scrolling
  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const scenes = root.querySelectorAll<HTMLElement>('.gb-scene')
    if (typeof IntersectionObserver === 'undefined') {
      scenes.forEach((s) => s.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '100px 0px' }
    )
    scenes.forEach((s, index) => {
      if (index < 2) s.classList.add('is-visible')
      observer.observe(s)
    })
    return () => observer.disconnect()
  }, [])

  const handleCta = (cta: SceneCTA) => {
    if (cta.actionType === 'scroll') {
      onScrollTo(cta.target)
    } else {
      onOpenModal(cta.target)
    }
  }

  const currentHeroReel = HERO_VIDEO_REELS[0]

  const visibleScenes = excludeHero
    ? STORY_SCENES.filter((scene) => scene.number !== '01')
    : STORY_SCENES

  return (
    <main ref={mainRef} className="gb-story-main">
      {visibleScenes.map((scene) => {
        const isImageScene = scene.hasImage
        const num = parseInt(scene.number, 10)
        const bgSurfaceClass =
          scene.number === '01'
            ? 'gb-scene--hero-fullvideo'
            : [3, 5, 7, 9, 12].includes(num)
              ? 'gb-scene--alabaster'
              : 'gb-scene--white'

        return (
          <section
            key={scene.id}
            id={scene.id}
            className={`gb-scene ${bgSurfaceClass} ${isImageScene ? 'gb-scene--with-image' : 'gb-scene--no-image'
              } ${scene.number === '05' || scene.number === '10' ? 'gb-scene--fluid' : ''} ${scene.number === '10' || scene.number === '15' ? 'gb-scene--fullwidth' : ''} ${scene.number === '15' ? 'gb-scene--attached-footer' : ''}`}
          >
            {/* SCENE 01: HERO FILM */}
            {scene.number === '01' ? (
              <div className="gb-hero-fullvideo-stage">
                <video
                  ref={videoRef}
                  key={currentHeroReel.id}
                  className="gb-hero-fullvideo__media"
                  poster={currentHeroReel.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={currentHeroReel.videoUrl} type="video/mp4" />
                  <source src={currentHeroReel.fallbackUrl} type="video/mp4" />
                </video>
                <div className="gb-hero-fullvideo__scrim" aria-hidden="true" />

                <div className="gb-container gb-hero-overlay">
                  <div className="gb-hero-overlay__inner">
                    <h1 className="gb-hero-overlay__title">
                      <span className="gb-hero-overlay__title-light">{scene.titleDark}</span>{' '}
                      <span className="gb-hero-overlay__title-gold">{scene.titleGrey}</span>
                    </h1>
                    <AnimatedCopy text={scene.copy} className="gb-hero-overlay__copy" />
                    <div className="gb-cta-group gb-feature-ctas gb-hero-overlay__ctas">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-gold gb-hero-first-btn"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-light gb-hero-second-btn"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                </div>
                <nav className="gb-hero-quick-access" aria-label="Hero quick links">
                  <div className="gb-hero-quick-access__links">
                    {HERO_QUICK_LINKS.map((link) => (
                      <button
                        key={link.label}
                        type="button"
                        className="gb-hero-quick-access__link"
                        onClick={() => handleQuickLink(link.action)}
                      >
                        <HeroQuickLinkIcon name={link.icon} />
                        <span>{link.label}</span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            ) : (
              <div className={scene.number === '05' || scene.number === '10' || scene.number === '15' ? 'gb-container-fluid gb-scene__container--fluid' : 'gb-container gb-scene__container'}>
                {/* SCENE 08: 13 LEARNING CENTRES */}
                {scene.number === '08' ? (
                  <div className="gb-layout-scene08">
                    <div className="gb-scene08-header-centered">
                      <div className="gb-ref-header gb-ref-header--emerald gb-ref-header--center">
                        <h2 className="gb-ref-title gb-scene08-ref-title">
                          <span className="gb-ref-title__dark gb-scene08-title--inline">What will they </span>
                          <span className="gb-ref-title__grey gb-scene08-title--inline">discover here?</span>
                        </h2>
                      </div>
                      <AnimatedCopy text={scene.copy} className="gb-scene08-lead-copy-centered" />

                      {/* Buttons placed ABOVE the carousel images */}
                      <div className="gb-cta-group gb-scene08-centered__ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    <div className="gb-centres-carousel" role="region" aria-label="13 Learning Centres">
                      <div
                        className="gb-centres-carousel__track"
                        id="learning-centres-carousel"
                        role="list"
                        aria-label="Learning centre cards"
                        tabIndex={0}
                      >
                        {THIRTEEN_CENTRES.map((centre, index) => (
                          <article
                            key={centre.num}
                            className="gb-centre-slide"
                            role="listitem"
                            aria-label={`${index + 1} of ${THIRTEEN_CENTRES.length}: ${centre.name}`}
                          >
                            <img
                              className="gb-centre-slide__image"
                              src={centre.imageUrl}
                              alt={`${centre.name} learning centre`}
                              loading={index < 5 ? 'eager' : 'lazy'}
                              decoding="async"
                            />
                            <div className="gb-centre-slide__content">
                              <span className="gb-centre-slide__number">{centre.num}</span>
                              <h3>{centre.name}</h3>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : scene.number === '02' ? (
                  <div className="container gb-container gb-scene02-layout-wrap">
                    <div className="gb-scene02-layout">
                      <div className="gb-scene02-layout__content">
                        <SceneReferenceHeader
                          number={scene.number}
                          titleDark={scene.titleDark}
                          titleGrey={scene.titleGrey}
                        />
                        <AnimatedCopy text={scene.copy} className="gb-lead-copy" />

                        <div className="gb-cta-group gb-scene02-ctas">
                          <button
                            type="button"
                            className="gb-btn gb-btn--primary-forest"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="gb-btn gb-btn--outline-dark"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>

                      <div className="gb-scene02-layout__triptych" aria-label="Photo showcase of joyful GenBright children">
                        <div className="gb-scene02-triptych__col gb-scene02-triptych__col--side">
                          <img
                            src="/images/scene-02-happy-craft-hd.jpg"
                            alt="Happy GenBright students collaborating on a hands-on classroom model"
                            style={{ objectPosition: '32% 35%' }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="gb-scene02-triptych__col gb-scene02-triptych__col--center">
                          <img
                            src="/images/scene-02-happy-blocks-hd.jpg"
                            alt="GenBright student joyfully building with colorful classroom blocks"
                            style={{ objectPosition: '50% 42%' }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="gb-scene02-triptych__col gb-scene02-triptych__col--side">
                          <img
                            src="/images/scene-02-happy-swim-hd.jpg"
                            alt="GenBright student swimming happily with a kickboard in the pool"
                            style={{ objectPosition: '52% 55%' }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '03' ? (
                  /* SCENE 03: WHAT IF THEY LEARN DIFFERENTLY? */
                  <div className="gb-learning-profiles">
                    <div className="gb-learning-profiles__intro">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                        centered
                      />
                      <AnimatedCopy text={scene.copy} className="gb-body-copy" />

                      {/* Buttons placed ABOVE the images */}
                      <div className="gb-cta-group gb-feature-ctas gb-learning-profiles__ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* Single parent div container wrapping all four images with sticky scroll interaction */}
                    <div className="gb-learner-sticky-block">
                      <ul
                        className="gb-learner-card-grid"
                        aria-label="Different ways children learn"
                      >
                        {LEARNER_PROFILES.map((profile) => (
                          <li className="gb-learner-card" key={profile.title}>
                            <article>
                              <img
                                className="gb-learner-card__image"
                                src={profile.imageUrl}
                                alt={profile.imageAlt}
                                style={{ objectPosition: profile.objectPosition }}
                                loading="lazy"
                                decoding="async"
                              />
                            </article>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : scene.number === '04' ? (
                  /* SCENE 04: A WHOLE-CHILD PHILOSOPHY (GLASSMORPHISM OVERLAPPING CARDS MATCHING REFERENCE) */
                  <div className="gb-scene04-stage">
                    {/* TOP SPLIT: TEXT ON LEFT, WIDE NATURE PHOTO ON RIGHT */}
                    <div className="gb-scene04-top">
                      <div className="gb-scene04-top__text">
                        <h2 className="gb-scene04-title">
                          <span className="gb-scene04-title__dark">{scene.titleDark}</span>
                          <span className="gb-scene04-title__grey">{scene.titleGrey}</span>
                        </h2>

                        <AnimatedCopy text={scene.copy} className="gb-lead-copy gb-scene04-lead" />

                        <div className="gb-cta-group gb-scene04-ctas">
                          <button
                            type="button"
                            className="gb-btn gb-btn--primary-forest"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="gb-btn gb-btn--outline-dark"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>

                      <div className="gb-scene04-top__visual">
                        <div className="gb-scene04-photo-frame">
                          <img
                            src="/images/scene-04-whole-child-inquiry-hd.jpg"
                            alt="Four GenBright students gathered together in classroom inquiry, observing and discussing a globe model"
                            className="gb-scene04-photo"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4 CARDS: FIRST 2 ARE SOLID, ONLY LAST 2 ARE GLASSMORHPIC OVER IMAGE */}
                    <div className="gb-scene04-glass-grid" aria-label="Four Pillars of Whole-Child Philosophy">
                      {FOUR_PILLARS_DATA.map((pillar, pIdx) => {
                        const isLastTwo = pIdx >= 2
                        const variantClass = isLastTwo
                          ? (pIdx === 2 ? 'gb-glass-pillar-card--glass-white' : 'gb-glass-pillar-card--glass-alabaster')
                          : (pIdx === 0 ? 'gb-glass-pillar-card--white' : 'gb-glass-pillar-card--alabaster')

                        return (
                          <div
                            key={pillar.key}
                            className={`gb-glass-pillar-card ${isLastTwo ? 'gb-glass-pillar-card--over-image gb-glass-pillar-card--glass' : ''} ${variantClass}`}
                          >
                            <div className="gb-glass-pillar-card__head">
                              <div
                                className="gb-glass-pillar-card__concept-icon"
                                aria-hidden="true"
                              >
                                {renderConceptIcon(pillar.key)}
                              </div>
                            </div>
                            <div className="gb-glass-pillar-card__body">
                              <div className="gb-glass-pillar-card__kicker">{pillar.kicker}</div>
                              <h3 className="gb-glass-pillar-card__title">{pillar.title}</h3>
                              <p className="gb-glass-pillar-card__desc">{pillar.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : scene.number === '05' ? (
                  /* SCENE 05: ACADEMIC RIGOUR (50/50 DARK SPLIT DESIGN MATCHING USER REFERENCE) */
                  <div className="gb-scene05-dark-split">
                    {/* LEFT FULL-HEIGHT CLASSROOM PHOTO */}
                    <div className="gb-scene05-dark-split__media">
                      <img
                        src="/images/academically-prepared-students-hd.jpg"
                        alt="GenBright students reading and exploring books together in classroom"
                        className="gb-scene05-dark-split__img"
                        style={{ objectPosition: '52% 35%' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* RIGHT DARK COLUMN */}
                    <div className="gb-scene05-dark-split__content">
                      <h2 className="gb-scene05-dark-split__title">
                        <span className="gb-scene05-dark-split__title-white">WILL THEY BE</span><br />
                        <span className="gb-scene05-dark-split__title-silver">ACADEMICALLY PREPARED?</span>
                      </h2>

                      <p className="gb-scene05-dark-split__copy">
                        {scene.copy}
                      </p>

                      <div className="gb-cta-group gb-scene05-dark-split__ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '06' ? (
                  /* SCENE 06: CAMPUS & CHILDHOOD — NORMAL IMAGE SHAPE, STRICTLY SPECIFIED CONTENT */
                  <div className="gb-scene06-layout">
                    {/* LEFT CONTENT COLUMN: STRICTLY TITLE, BODY COPY, AND CTAS */}
                    <div className="gb-scene06-content">
                      <h2 className="gb-scene06-title">
                        <span className="gb-scene06-title__dark">{scene.titleDark} </span>
                        <span className="gb-scene06-title__grey">{scene.titleGrey}</span>
                      </h2>

                      <AnimatedCopy text={scene.copy} className="gb-scene06-copy" />

                      <div className="gb-cta-group gb-scene06-ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: PREVIOUS ARCH SHAPED IMAGE STYLE WITH SLIDING CAROUSEL */}
                    <div className="gb-scene06-media">
                      <div
                        className="gb-scene06-arch-frame"
                        role="region"
                        aria-label="Campus photos carousel"
                        onMouseEnter={() => setIsCampusPaused(true)}
                        onMouseLeave={() => setIsCampusPaused(false)}
                      >
                        <div
                          className="gb-scene06-slider-track"
                          style={{ transform: `translateX(-${campusSlideIndex * 100}%)` }}
                        >
                          {CAMPUS_SLIDESHOW.map((slide, idx) => (
                            <div key={slide.id} className="gb-scene06-slider-slide">
                              <img
                                src={slide.imageUrl}
                                alt={slide.alt}
                                className="gb-scene06-arch-img"
                                loading={idx === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                              />
                            </div>
                          ))}
                        </div>

                        {/* SLIDER NAVIGATION ARROWS */}
                        <button
                          type="button"
                          className="gb-scene06-arrow gb-scene06-arrow--prev"
                          onClick={handlePrevCampusSlide}
                          aria-label="Previous campus photo"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="gb-scene06-arrow gb-scene06-arrow--next"
                          onClick={handleNextCampusSlide}
                          aria-label="Next campus photo"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>

                        {/* SLIDER DOTS */}
                        <div className="gb-scene06-dots" aria-label="Campus photo indicators">
                          {CAMPUS_SLIDESHOW.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`gb-scene06-dot ${dotIdx === campusSlideIndex ? 'is-active' : ''}`}
                              onClick={() => setCampusSlideIndex(dotIdx)}
                              aria-label={`Go to slide ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '07' ? (
                  /* SCENE 07: WHO ARE THE PEOPLE BEHIND THIS SCHOOL (STATIC SINGLE FOUNDER IMAGE) */
                  <div className="gb-scene07-clean-layout">
                    {/* LEFT SINGLE FOUNDER IMAGE (STATIC, NO SLIDING) */}
                    <div
                      className="gb-scene07-carousel-container"
                      aria-label="People behind this school"
                    >
                      <div className="gb-scene07-carousel-frame">
                        <div className="gb-scene07-carousel-slide">
                          <img
                            src={FOUNDERS_AND_LEADERS[0].imageUrl}
                            alt={FOUNDERS_AND_LEADERS[0].imageAlt}
                            className="gb-scene07-carousel-img"
                            style={{ objectPosition: FOUNDERS_AND_LEADERS[0].objectPosition }}
                            loading="eager"
                            decoding="async"
                          />
                          <div className="gb-scene07-slide__scrim" />

                          {/* Bottom Name & Designation Panel */}
                          <div className="gb-scene07-slide__info">
                            <div className="gb-scene07-slide__header-row">
                              <span className="gb-scene07-slide__kicker">PEOPLE BEHIND THIS SCHOOL</span>
                            </div>
                            <h3 className="gb-scene07-slide__name">{FOUNDERS_AND_LEADERS[0].name}</h3>
                            <p className="gb-scene07-slide__designation">{FOUNDERS_AND_LEADERS[0].designation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="gb-scene07-clean-content">
                      <h2 className="gb-scene07-clean-heading">
                        <span className="gb-ref-title__dark">Who are the people</span>{' '}
                        <span className="gb-ref-title__grey">behind this school?</span>
                      </h2>

                      <p className="gb-scene07-clean-copy">
                        {scene.copy}
                      </p>

                      {/* 3 Metric Columns matching user reference (17 / 85 / 537 style) */}
                      <div className="gb-scene07-clean-metrics" aria-label="Key school heritage metrics">
                        <div className="gb-scene07-clean-metric">
                          <strong>35+</strong>
                          <span>Years Experience</span>
                        </div>
                        <div className="gb-scene07-clean-metric">
                          <strong>5</strong>
                          <span>Chennai Schools</span>
                        </div>
                        <div className="gb-scene07-clean-metric">
                          <strong>15+</strong>
                          <span>Years Mentorship</span>
                        </div>
                      </div>

                      <div className="gb-cta-group gb-scene07-clean-ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '09' ? (
                  /* SCENE 09: CHILDHOOD IN MOTION (5-IMAGE MOSAIC MATCHING USER REFERENCE: 1 BIG ON LEFT, 2X2 ON RIGHT) */
                  <div className="gb-scene09-mosaic-stage">
                    {/* Header Stack: Title + Copy + CTA Buttons placed ABOVE gallery */}
                    <div className="gb-scene09-mosaic-header">
                      <h2 className="gb-scene09-mosaic-headline">
                        <span className="gb-scene09-headline__dark">Childhood</span>{' '}
                        <span className="gb-scene09-headline__gold">in Motion</span>
                      </h2>
                      <p className="gb-scene09-mosaic-copy">
                        {scene.copy}
                      </p>

                      <div className="gb-cta-group gb-scene09-mosaic-ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* 5-Image Mosaic Grid matching reference (1 Big on Left, 2x2 on Right, badge pills removed as requested) */}
                    <div className="gb-scene09-mosaic-grid" aria-label="Childhood in Motion Gallery">
                      {/* Left Big Card */}
                      <div className="gb-mosaic-card gb-mosaic-card--big">
                        <img
                          src={CHILDHOOD_MOTION_GALLERY[0].imageUrl}
                          alt={CHILDHOOD_MOTION_GALLERY[0].imageAlt}
                          className="gb-mosaic-card__img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Right 2x2 Subgrid */}
                      <div className="gb-mosaic-subgrid">
                        {CHILDHOOD_MOTION_GALLERY.slice(1).map((item) => (
                          <div key={item.id} className="gb-mosaic-card gb-mosaic-card--small">
                            <img
                              src={item.imageUrl}
                              alt={item.imageAlt}
                              className="gb-mosaic-card__img"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : scene.number === '10' ? (
                  /* SCENE 10: FULL-WIDTH NEWS & HAPPENINGS BANNER */
                  <div className="gb-scene10-banner">
                    <div className="gb-scene10-banner__card">
                      <div className="gb-scene10-banner__inner">
                        <div className="gb-scene10-banner__content">
                          <h2 className="gb-scene10-banner__title">
                            <span className="gb-scene10-title--dark">{scene.titleDark} </span>
                            <span className="gb-scene10-title--gold">{scene.titleGrey}</span>
                          </h2>
                          <AnimatedCopy text={scene.copy} className="gb-scene10-banner__copy" />
                        </div>

                        <div className="gb-scene10-banner__actions">
                          <div className="gb-cta-group gb-scene10-ctas">
                            <button
                              type="button"
                              className="gb-btn gb-btn--primary-forest"
                              onClick={() => handleCta(scene.primaryCta)}
                            >
                              {scene.primaryCta.label}
                            </button>
                            <button
                              type="button"
                              className="gb-btn gb-btn--outline-dark"
                              onClick={() => handleCta(scene.secondaryCta)}
                            >
                              {scene.secondaryCta.label}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '11' ? (
                  /* SCENE 11: GENBRIGHT LITTLE CIRCLE (EXACT 4-IMAGE PINWHEEL COLLAGE MATCHING USER REFERENCE) */
                  <div className="gb-scene11-pinwheel-stage">
                    <div className="gb-scene11-collage-container">
                      {/* TOP-LEFT IMAGE: EARLY-YEARS COLLABORATIVE MONTESSORI & PUZZLE LEARNING */}
                      <div className="gb-scene11-img-slot gb-scene11-img-slot--tl">
                        <img
                          src="/images/scene-11-montessori-map-table-hd.jpg"
                          alt="GenBright students collaborating on world map puzzles and Montessori materials in early childhood classroom"
                          className="gb-scene11-img"
                          style={{ objectPosition: '50% 32%' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* TOP-RIGHT IMAGE: STRATEGIC PEER COLLABORATION & LOGIC PLAY */}
                      <div className="gb-scene11-img-slot gb-scene11-img-slot--tr">
                        <img
                          src="/images/scene-11-students-boardgame-hd.jpg"
                          alt="Two GenBright students collaborating and playing a strategy board game in the classroom"
                          className="gb-scene11-img"
                          style={{ objectPosition: 'center 42%' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* BOTTOM-LEFT IMAGE: NURTURING EDUCATORS & PRESCHOOL CIRCLE */}
                      <div className="gb-scene11-img-slot gb-scene11-img-slot--bl">
                        <img
                          src="/images/scene-06-circle-assembly-hd.jpg"
                          alt="Early childhood educators, mentors and preschool community in a collaborative circle"
                          className="gb-scene11-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* BOTTOM-RIGHT IMAGE: JOYFUL OUTDOOR NATURE PLAY & FRIENDSHIP */}
                      <div className="gb-scene11-img-slot gb-scene11-img-slot--br">
                        <img
                          src="/images/scene-06-outdoor-craft-hd.jpg"
                          alt="Preschool children and educators collaborating on creative outdoor making"
                          className="gb-scene11-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* CENTER OVERLAPPING WHITE CONTENT CARD */}
                      <div className="gb-scene11-center-card">
                        <h2 className="gb-scene11-center-card__title">
                          <span className="gb-ref-title__dark">{scene.titleDark}</span>
                          <span className="gb-ref-title__grey">{scene.titleGrey}</span>
                        </h2>

                        <p className="gb-scene11-center-card__kicker">Preschool Partnership Alliance · GenBright</p>

                        <p className="gb-scene11-center-card__copy">{scene.copy}</p>

                        <div className="gb-cta-group gb-scene11-center-card__ctas">
                          <button
                            type="button"
                            className="gb-btn gb-btn--primary-forest"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="gb-btn gb-btn--outline-dark"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '12' ? (
                  /* SCENE 12: IT TAKES A COMMUNITY — OVERLAPPING DARK CARD & IMAGE LAYOUT MATCHING USER REFERENCE */
                  <div className="gb-scene12-ref-stage">
                    {/* Overlapping Dark Content Card (Left) */}
                    <div className="gb-scene12-ref__card">
                      <h2 className="gb-scene12-ref__title">
                        <span className="gb-scene12-ref__title-white">{scene.titleDark}</span>{' '}
                        <span className="gb-scene12-ref__title-gold">{scene.titleGrey}</span>
                      </h2>

                      <p className="gb-scene12-ref__copy">
                        {scene.copy}
                      </p>

                      <div className="gb-cta-group gb-scene12-ref__ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-gold"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-white"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* Main Photo Outer Container with Underlapping Wireframe Box */}
                    <div className="gb-scene12-ref__media-outer">
                      {/* Decorative Wireframe Box tucked directly behind photo bottom-left corner */}
                      <div className="gb-scene12-ref__wireframe" aria-hidden="true" />

                      {/* Main Photo Wrapper with Slider (Right) */}
                      {/* Main Featured Photo (Single image, no multi-image carousel) */}
                      <div className="gb-scene12-ref__media-wrap">
                        <img
                          src={COMMUNITY_IMAGE.imageUrl}
                          alt={COMMUNITY_IMAGE.alt}
                          className="gb-scene12-ref__img"
                          style={{ objectPosition: 'center 26%' }}
                          loading="eager"
                          decoding="async"
                        />

                        {/* Overlapping Bottom-Right Dark Button with Down Arrow */}
                        <button
                          type="button"
                          className="gb-scene12-ref__corner-btn"
                          onClick={() => onScrollTo('scene-13')}
                          aria-label="Scroll to next chapter"
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '13' ? (
                  /* SCENE 13: WHAT IF TEACHING COULD BE A JOURNEY OF DISCOVERY, TOO? (2 IMAGES LAYOUT) */
                  <div className="gb-scene13-layout">
                    <div className="gb-scene13-text">
                      <div className="gb-ref-header gb-ref-header--amber">
                        <h2 className="gb-ref-title gb-scene13-ref-title">
                          <span className="gb-scene13-title-line gb-ref-title__dark">What if teaching could be</span>
                          <span className="gb-scene13-title-line gb-ref-title__grey">a journey of</span>
                          <span className="gb-scene13-title-line gb-ref-title__grey">discovery, too?</span>
                        </h2>
                      </div>
                      <AnimatedCopy text={scene.copy} className="gb-lead-copy gb-scene13-copy" />

                      <div className="gb-cta-group gb-scene13-ctas">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    {/* 2 IMAGES MATCHING USER REQUEST "this section adding 2 images" */}
                    <div className="gb-scene13-media-wrap" aria-label="Educator journey and collaboration">
                      <div className="gb-scene13-media-card gb-scene13-media-card--1">
                        <img
                          src="/images/scene-13-educator-mentoring-craft-hd.jpg"
                          alt="GenBright educator guiding students in hands-on crafting and collaborative learning outdoors"
                          className="gb-scene13-img"
                          style={{ objectPosition: '51% 38%' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="gb-scene13-media-card gb-scene13-media-card--2">
                        <img
                          src="/images/scene-13-educator-mentorship-hd.jpg"
                          alt="GenBright educator warmly mentoring an elementary student crafting a globe in outdoor workshop"
                          className="gb-scene13-img"
                          style={{ objectPosition: '50% 32%' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                ) : scene.number === '14' ? (
                  /* SCENE 14: LIVING ARCHIVES (MATCHING USER REFERENCE BANNER WITH ARCHIVE ARTIFACT BACKGROUND) */
                  <div className="gb-scene14-banner">
                    <div className="gb-scene14-banner__card">
                      {/* Background Visual: Handcrafted ceramic artifacts and publications */}
                      <div className="gb-scene14-banner__bg" aria-hidden="true">
                        <img
                          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=85"
                          alt="Ceramic memory artifacts and publications representing living school archives"
                          className="gb-scene14-banner__bg-img"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="gb-scene14-banner__overlay" />
                      </div>

                      {/* Centered Content Stack matching user reference */}
                      <div className="gb-scene14-banner__content">
                        <h2 className="gb-scene14-banner__title">
                          Some moments deserve<br />
                          <span>to be remembered.</span>
                        </h2>
                        <p className="gb-scene14-banner__copy">
                          {scene.copy}
                        </p>

                        {/* Primary and Secondary CTA Buttons on the same line */}
                        <div className="gb-cta-group gb-scene14-banner__ctas">
                          <button
                            type="button"
                            className="gb-btn gb-btn--primary-forest"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="gb-btn gb-btn--outline-white"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : scene.number === '15' ? (
                  /* SCENE 15: YOUR NEXT CHAPTER STARTS HERE — STAGE DESIGN (MATCHING USER REFERENCE) */
                  <div className="gb-scene15-stage">
                    <div className="gb-scene15-stage__bg" aria-hidden="true">
                      <img
                        src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85"
                        alt="Parents and family looking ahead across the sunlit green campus landscape"
                        className="gb-scene15-stage__bg-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="gb-scene15-stage__gradient" />
                    </div>

                    <div className="gb-scene15-stage__inner">
                      <div className="gb-scene15-stage__content">
                        <h2 className="gb-scene15-stage__title">
                          <span className="gb-scene15-line1">Perhaps their next chapter</span>
                          <span className="gb-scene15-line2">begins here.</span>
                        </h2>
                        <p className="gb-scene15-stage__copy">{scene.copy}</p>

                        <div className="gb-cta-group gb-scene15-stage__ctas">
                          <button
                            type="button"
                            className="gb-btn gb-btn--primary-forest"
                            onClick={() => handleCta(scene.primaryCta)}
                          >
                            {scene.primaryCta.label}
                          </button>
                          <button
                            type="button"
                            className="gb-btn gb-btn--outline-white"
                            onClick={() => handleCta(scene.secondaryCta)}
                          >
                            {scene.secondaryCta.label}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isImageScene ? (
                  /* IMAGE SCENES (03, 05, 07, 09, 11, 13, 15): STRICTLY PDF HEADLINE + PDF COPY + PDF CTAS + IMAGE */
                  <div className="gb-split-scene">
                    <div className="gb-split-scene__text">
                      <SceneReferenceHeader
                        number={scene.number}
                        titleDark={scene.titleDark}
                        titleGrey={scene.titleGrey}
                      />
                      <AnimatedCopy text={scene.copy} className="gb-body-copy" />

                      <div className="gb-cta-group">
                        <button
                          type="button"
                          className="gb-btn gb-btn--primary-forest"
                          onClick={() => handleCta(scene.primaryCta)}
                        >
                          {scene.primaryCta.label}
                        </button>
                        <button
                          type="button"
                          className="gb-btn gb-btn--outline-dark"
                          onClick={() => handleCta(scene.secondaryCta)}
                        >
                          {scene.secondaryCta.label}
                        </button>
                      </div>
                    </div>

                    <div className="gb-split-scene__visual">
                      <div className="gb-fixa-media-card">
                        <img src={scene.imageUrl} alt={scene.imageAlt} />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TEXT SCENES (02, 04, 06, 10, 12, 14): STRICTLY PDF HEADLINE + PDF COPY + PDF CTAS */
                  <div className="gb-section-header-stack">
                    <SceneReferenceHeader
                      number={scene.number}
                      titleDark={scene.titleDark}
                      titleGrey={scene.titleGrey}
                    />
                    <AnimatedCopy text={scene.copy} className="gb-lead-copy" />

                    <div className="gb-cta-group">
                      <button
                        type="button"
                        className="gb-btn gb-btn--primary-forest"
                        onClick={() => handleCta(scene.primaryCta)}
                      >
                        {scene.primaryCta.label}
                      </button>
                      <button
                        type="button"
                        className="gb-btn gb-btn--outline-dark"
                        onClick={() => handleCta(scene.secondaryCta)}
                      >
                        {scene.secondaryCta.label}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )
      })}
    </main>
  )
})
