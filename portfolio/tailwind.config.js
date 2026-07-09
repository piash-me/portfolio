/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--bg)',
        panel: 'var(--bg-elevated)',
        bronze: 'var(--bronze)',
        violet: 'var(--violet)',
        cyan: 'var(--cyan)',
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-faint': 'var(--fg-faint)',
        hairline: 'var(--hairline)',
        'hairline-strong': 'var(--hairline-strong)',
        'btn-primary': 'var(--btn-primary-bg)',
        'btn-primary-fg': 'var(--btn-primary-fg)',
        glass: 'var(--glass-bg)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
