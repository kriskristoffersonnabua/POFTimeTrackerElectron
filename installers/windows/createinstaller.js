const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'pof-time-tracker-win32-ia32/'),
    authors: 'Jenelyn Contillo',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'pof-time-tracker.exe',
    setupExe: 'POFTimeTrackerInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}