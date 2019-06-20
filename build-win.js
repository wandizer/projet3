const packager = require('electron-packager');
const rebuild = require('electron-rebuild');

packager({
  dir: './',
  overwrite: true,
  asar: false,
  platform: 'win32',
  arch: 'ia32',
  prune: true,
  out: 'build',
  executableName: 'Erpion',
  icon: 'public/assets/favicon.ico',
  afterCopy: [(buildPath, electronVersion, platform, arch, callback) => {
    rebuild.rebuild({ buildPath, electronVersion, arch })
      .then(() => callback())
      .catch((error) => callback(error));
  }],
});
