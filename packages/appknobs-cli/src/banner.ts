import * as cfonts from 'cfonts'

const isBannerRequired = () =>
  process.argv.slice(2).length === 0 ||
  ['--help', '-h', 'help'].includes(process.argv[2])

export const banner = () => {
  if (!isBannerRequired()) {
    return
  }

  cfonts.say('Appknobs', {
    font: 'block',
    align: 'left',
    colors: ['#1890FF', '#F0F2F5'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
  })
}
