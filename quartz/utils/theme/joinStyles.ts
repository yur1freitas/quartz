import type { Theme } from '~/types/theme'

import { DEFAULT_MONO, DEFAULT_SANS_SERIF } from '~/consts'

import { getFontSpecificationName } from './getFontSpecificationName'

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
    return `
${stylesheet.join('\n\n')}

:root {
  --highlight: ${theme.colors.lightMode.highlight};
  --text-highlight: ${theme.colors.lightMode.textHighlight};

  --titleFont: "${getFontSpecificationName(theme.typography.title || theme.typography.header)}", ${DEFAULT_SANS_SERIF};
  --headerFont: "${getFontSpecificationName(theme.typography.header)}", ${DEFAULT_SANS_SERIF};
  --bodyFont: "${getFontSpecificationName(theme.typography.body)}", ${DEFAULT_SANS_SERIF};
  --codeFont: "${getFontSpecificationName(theme.typography.code)}", ${DEFAULT_MONO};

  --border: ${theme.colors.lightMode.border};

  --foreground: ${theme.colors.lightMode.foreground};
  --background: ${theme.colors.lightMode.background};

  --link: ${theme.colors.lightMode.link};
  --link-hover: ${theme.colors.lightMode.linkHover};

  --red: ${theme.colors.lightMode.red};
  --orange: ${theme.colors.lightMode.orange};
  --yellow: ${theme.colors.lightMode.yellow};
  --lime: ${theme.colors.lightMode.lime};
  --green: ${theme.colors.lightMode.green};
  --cyan: ${theme.colors.lightMode.cyan};

  --callout-padding: ${theme.colors.lightMode.calloutPadding};
  --callout-border-radius: ${theme.colors.lightMode.calloutBorderRadius};
  --callout-content-background: ${theme.colors.lightMode.calloutContentBackground};

  --shadow: ${theme.colors.lightMode.shadow};

  --h1-size: 1.5rem;
  --h1-color: var(--red);

  --h2-size: 1.25rem;
  --h2-color: var(--orange);

  --h3-size: 1.025rem;
  --h3-color: var(--yellow);

  --h4-size: 1rem;
  --h4-color: var(--lime);

  --h5-size: 1rem;
  --h5-color: var(--green);

  --h6-size: 1rem;
  --h6-color: var(--cyan);
}

:root[saved-theme="dark"] {
   --highlight: ${theme.colors.darkMode.highlight};
   --text-highlight: ${theme.colors.darkMode.textHighlight};

   --border: ${theme.colors.darkMode.border};

   --foreground: ${theme.colors.darkMode.foreground};
   --background: ${theme.colors.darkMode.background};

   --link: ${theme.colors.darkMode.link};
   --link-hover: ${theme.colors.darkMode.linkHover};

   --red: ${theme.colors.darkMode.red};
   --orange: ${theme.colors.darkMode.orange};
   --yellow: ${theme.colors.darkMode.yellow};
   --lime: ${theme.colors.darkMode.lime};
   --green: ${theme.colors.darkMode.green};
   --cyan: ${theme.colors.darkMode.cyan};

   --callout-padding: ${theme.colors.darkMode.calloutPadding};
   --callout-border-radius: ${theme.colors.darkMode.calloutBorderRadius};
   --callout-content-background: ${theme.colors.darkMode.calloutContentBackground};

   --shadow: ${theme.colors.darkMode.shadow};
}
`
}
