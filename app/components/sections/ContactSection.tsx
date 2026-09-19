const links = [
  {
    label: "GitHub",
    handle: "github.com/ishaan-jindal",
    href: "https://github.com/ishaan-jindal",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/jindal-ishaan",
    href: "https://linkedin.com/in/jindal-ishaan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M14.82 0H1.18C.53 0 0 .52 0 1.17v13.66C0 15.48.53 16 1.18 16h13.64c.65 0 1.18-.52 1.18-1.17V1.17C16 .52 15.47 0 14.82 0ZM4.74 13.63H2.38V6h2.36v7.63ZM3.56 4.98a1.37 1.37 0 1 1 0-2.74 1.37 1.37 0 0 1 0 2.74Zm10.07 8.65h-2.36V9.92c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95v3.78H6.26V6h2.27v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.4 0 2.84 1.58 2.84 3.63v4.19Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "ishaanjindal2006@gmail.com",
    href: "mailto:ishaanjindal2006@gmail.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="0.75" y="2.75" width="14.5" height="10.5" />
        <path d="m1 3.5 7 5.5 7-5.5" />
      </svg>
    ),
  },
];

const ContactSection = () => {
  return (
    <div>
      <p className="eyebrow">
        <span className="text-[var(--accent)]">04</span> / 04
      </p>
      <h2 className="section-title mt-4">Get in touch</h2>
      <p className="mt-5 max-w-[34ch] text-sm leading-6 text-[var(--muted)]">
        Open to internships, collaborations, and interesting projects. Reach me
        directly — no forms, no spam folders.
      </p>

      <ul className="mt-9 flex flex-col gap-5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith("mailto:")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="contact-link"
            >
              {link.icon}
              <span>{link.handle}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactSection;
