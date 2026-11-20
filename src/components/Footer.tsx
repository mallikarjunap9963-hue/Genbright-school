import React from 'react'
import { BRAND_INFO } from '../data/storyScenes'

interface FooterProps {
  onScrollTo: (id: string) => void
  onOpenModal: (modalId: string) => void
}

export const Footer = React.memo(function Footer({ onScrollTo, onOpenModal }: FooterProps) {
  return (
    <footer className="gb-ref-footer" role="contentinfo">
      <div className="gb-ref-footer__container">
        {/* BRAND HEADER: LOGO, TAGLINE, SOCIALS & ADMISSIONS CTA */}
        <div className="gb-ref-footer__brand-header">
          <div className="gb-ref-footer__brand-left">
            <button
              type="button"
              className="gb-ref-footer__logo-btn"
              onClick={() => onScrollTo('scene-01')}
              aria-label="GenBright World School - Back to top"
            >
              <img
                src="/genbright-logo.png"
                alt="GenBright World School Logo"
                className="gb-ref-footer__logo"
                loading="lazy"
                decoding="async"
              />
            </button>
            <div className="gb-ref-footer__brand-meta">
              <span className="gb-ref-footer__school-name">GenBright World School</span>
              <span className="gb-ref-footer__school-tagline">
                Admissions 2027–28 · Nursery to Grade 8 · Mokila, Hyderabad
              </span>
            </div>
          </div>

          <div className="gb-ref-footer__brand-right">
            {/* SOCIAL ICONS (MATCHING REFERENCE STYLE) */}
            <div className="gb-ref-footer__socials" aria-label="Follow GenBright on social media">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gb-ref-footer__social-link"
                aria-label="Twitter / X"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gb-ref-footer__social-link"
                aria-label="LinkedIn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gb-ref-footer__social-link"
                aria-label="GitHub"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gb-ref-footer__social-link"
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              className="gb-btn gb-btn--primary-forest gb-ref-footer__cta-btn"
              onClick={() => onOpenModal('admissions')}
            >
              Enquire for 2027–28
            </button>
          </div>
        </div>

        {/* 4 COLUMNS */}
        <div className="gb-ref-footer__grid gb-ref-footer__grid--4col">
          {/* COLUMN 1 - DISCOVER */}
          <div className="gb-ref-footer__col">
            <h3 className="gb-ref-footer__heading">Discover</h3>
            <ul className="gb-ref-footer__list">
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-01')}>Story</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-07')}>Founders</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-04')}>Philosophy</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-05')}>Academics</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-06')}>Campus</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-15')}>Admissions</button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 - CONNECT */}
          <div className="gb-ref-footer__col">
            <h3 className="gb-ref-footer__heading">Connect</h3>
            <ul className="gb-ref-footer__list">
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-09')}>Gallery</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-10')}>News &amp; Events</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-14')}>Archives</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-11')}>Little Circle</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-12')}>Community Partnerships</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-13')}>Careers</button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 - OUR COMMUNITY */}
          <div className="gb-ref-footer__col">
            <h3 className="gb-ref-footer__heading">Our Community</h3>
            <ul className="gb-ref-footer__list">
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onScrollTo('scene-12')}>Weekend Club</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onOpenModal('parent-portal')}>Parent Portal</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onOpenModal('student-portal')}>Student Portal</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onOpenModal('bright-times')}>Bright Times</button>
              </li>
              <li>
                <span className="gb-ref-footer__dot">•</span>
                <button type="button" onClick={() => onOpenModal('admissions')}>Contact</button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 - VISIT US */}
          <div className="gb-ref-footer__col gb-ref-footer__col--visit">
            <h3 className="gb-ref-footer__heading">Visit Us</h3>
            <div className="gb-ref-footer__visit-stack">
              {/* ADDRESS */}
              <div className="gb-ref-footer__visit-row">
                <span className="gb-ref-footer__visit-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC548" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="gb-ref-footer__visit-text">{BRAND_INFO.address}</span>
              </div>

              {/* EMAIL */}
              <div className="gb-ref-footer__visit-row">
                <span className="gb-ref-footer__visit-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC548" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <a href={`mailto:${BRAND_INFO.email}`} className="gb-ref-footer__visit-link">
                  {BRAND_INFO.email}
                </a>
              </div>

              {/* WEBSITE */}
              <div className="gb-ref-footer__visit-row">
                <span className="gb-ref-footer__visit-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC548" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <a
                  href={`https://${BRAND_INFO.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gb-ref-footer__visit-link"
                >
                  {BRAND_INFO.website}
                </a>
              </div>

              {/* DIRECTIONS BUTTON */}
              <div className="gb-ref-footer__visit-row gb-ref-footer__visit-row--cta">
                <button
                  type="button"
                  className="gb-ref-footer__directions-action"
                  onClick={() => onOpenModal('admissions')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span>Directions</span>
                  <span className="gb-ref-footer__link-arrow" aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="gb-ref-footer__bottom">
          <div className="gb-ref-footer__copyright">
            © 2026 {BRAND_INFO.schoolName}. All rights reserved.
          </div>
          <div className="gb-ref-footer__legal-group">
            <button type="button" onClick={() => onOpenModal('privacy')}>Privacy Policy</button>
            <span className="gb-ref-footer__bar-dot">•</span>
            <button type="button" onClick={() => onOpenModal('privacy')}>Child Safeguarding</button>
            <span className="gb-ref-footer__bar-dot">•</span>
            <button type="button" onClick={() => onOpenModal('terms')}>Terms</button>
            <span className="gb-ref-footer__bar-dot">•</span>
            <button type="button" onClick={() => onOpenModal('privacy')}>Accessibility and Website Policies</button>
          </div>
        </div>
      </div>
    </footer>
  )
})
