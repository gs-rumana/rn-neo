import {
  withInfoPlist,
  withXcodeProject,
  withDangerousMod,
  IOSConfig,
  type ConfigPlugin,
} from '@expo/config-plugins';
import * as fs from 'fs';
import * as path from 'path';

const fonts = ['NeoIcons.ttf'];
// This resolves to the absolute path of your library's font folder
const fontSourceDir = path.resolve(__dirname, '..', '..', 'assets', 'fonts');

const withNeoIosFonts: ConfigPlugin = (config) => {
  return withInfoPlist(config, (plistConfig) => {
    const existing = (plistConfig.modResults.UIAppFonts as string[]) || [];
    fonts.forEach((font) => {
      if (!existing.includes(font)) existing.push(font);
    });
    plistConfig.modResults.UIAppFonts = existing;
    return plistConfig;
  });
};

const withNeoIosXcodeProject: ConfigPlugin = (config) => {
  return withXcodeProject(config, (xcodeConfig) => {
    const project = xcodeConfig.modResults;
    const platformProjectRoot = xcodeConfig.modRequest.platformProjectRoot;

    IOSConfig.XcodeUtils.ensureGroupRecursively(project, 'Resources');

    fonts.forEach((font) => {
      const absoluteSrcPath = path.join(fontSourceDir, font);
      // Create a path relative from the "ios" folder to your node_modules asset
      const relativePath = path.relative(platformProjectRoot, absoluteSrcPath);

      IOSConfig.XcodeUtils.addResourceFileToGroup({
        filepath: relativePath,
        groupName: 'Resources',
        project,
        isBuildFile: true,
      });
    });

    return xcodeConfig;
  });
};

const withNeoAndroidFonts: ConfigPlugin = (config) => {
  // Android still requires the physical file to be copied into the assets directory
  return withDangerousMod(config, [
    'android',
    (androidConfig) => {
      const dest = path.join(
        androidConfig.modRequest.platformProjectRoot,
        'app',
        'src',
        'main',
        'assets',
        'fonts'
      );

      fs.mkdirSync(dest, { recursive: true });

      fonts.forEach((font) => {
        const srcPath = path.join(fontSourceDir, font);
        const destPath = path.join(dest, font);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
        }
      });
      return androidConfig;
    },
  ]);
};

const withNeoFonts: ConfigPlugin = (config) => {
  config = withNeoIosFonts(config);
  config = withNeoIosXcodeProject(config);
  config = withNeoAndroidFonts(config);
  return config;
};

export default withNeoFonts;
