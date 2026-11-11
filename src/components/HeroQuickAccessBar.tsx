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

interface HeroQuickAccessBarProps {
  onScrollTo: (id: string) => void
  onOpenModal: (modalId: string) => void
}

export function HeroQuickAccessBar({ onScrollTo, onOpenModal }: HeroQuickAccessBarProps) {
  const handleQuickLink = (action: string) => {
    const [type, target] = action.split(':')
    if (type === 'scroll') onScrollTo(target)
    if (type === 'modal') onOpenModal(target)
  }

  return (
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
  )
}

