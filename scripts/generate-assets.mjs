import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

/**
 * Regenerates the résumé PDF and the social-share image using headless
 * Chrome or Edge. Run with: npm run assets
 *
 * Override the browser path with CHROME_PATH if neither default is found.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const browserCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/microsoft-edge',
].filter(Boolean)

const browser = browserCandidates.find((candidate) => existsSync(candidate))

if (!browser) {
  console.error(
    'No Chrome or Edge executable found. Set CHROME_PATH to a Chromium browser and try again.',
  )
  process.exit(1)
}

const profileDir = mkdtempSync(path.join(tmpdir(), 'pavandeep-portfolio-assets-'))

function run(args) {
  execFileSync(browser, args, { stdio: 'ignore' })
}

try {
  const resumeSource = path.join(root, 'public', 'resume', 'resume.html')
  const resumeOutput = path.join(root, 'public', 'resume', 'Pavandeep-B-Resume.pdf')

  run([
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${profileDir}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${resumeOutput}`,
    pathToFileURL(resumeSource).href,
  ])

  const resumeBytes = readFileSync(resumeOutput, 'latin1')
  const pageMarkers = (resumeBytes.match(/\/Type\s*\/Page(?!s)/g) ?? []).length
  console.log(
    `Resume PDF written (${Math.round(statSync(resumeOutput).size / 1024)} KB, ${pageMarkers} page${
      pageMarkers === 1 ? '' : 's'
    }).`,
  )

  const ogSource = path.join(root, 'scripts', 'og-image.html')
  const ogOutput = path.join(root, 'public', 'og-image.png')

  run([
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--force-device-scale-factor=1',
    `--user-data-dir=${profileDir}`,
    '--window-size=1200,630',
    '--virtual-time-budget=3000',
    `--screenshot=${ogOutput}`,
    pathToFileURL(ogSource).href,
  ])

  const png = readFileSync(ogOutput)
  const width = png.readUInt32BE(16)
  const height = png.readUInt32BE(20)
  console.log(`Social card written (${width}×${height}).`)

  if (width !== 1200 || height !== 630) {
    console.warn('Warning: social card is not exactly 1200×630. Check the browser screenshot size.')
  }

  const touchSource = path.join(root, 'scripts', 'touch-icon.html')
  const touchOutput = path.join(root, 'public', 'apple-touch-icon.png')

  run([
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--force-device-scale-factor=1',
    `--user-data-dir=${profileDir}`,
    '--window-size=180,180',
    '--virtual-time-budget=2000',
    `--screenshot=${touchOutput}`,
    pathToFileURL(touchSource).href,
  ])

  const touch = readFileSync(touchOutput)
  console.log(`Apple touch icon written (${touch.readUInt32BE(16)}×${touch.readUInt32BE(20)}).`)
} finally {
  rmSync(profileDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 })
}
