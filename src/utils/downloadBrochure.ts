import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { Linking, Platform } from 'react-native';

const brochureAsset = require('../assets/NOSHE-2026-Brochure-Final.pdf');
const brochureFileName = 'NOSHE-2026-Brochure-Final.pdf';

export async function downloadBrochure() {
  const asset = Asset.fromModule(brochureAsset);
  await asset.downloadAsync();

  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const uri = asset.uri;

    if (!uri) {
      throw new Error('Brochure file is not available.');
    }

    const link = document.createElement('a');
    link.href = uri;
    link.download = brochureFileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  if (!asset.localUri) {
    throw new Error('Brochure file is not available locally.');
  }

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(asset.localUri, {
      dialogTitle: 'Download NOSHE 2026 Brochure',
      mimeType: 'application/pdf',
      UTI: 'com.adobe.pdf'
    });
    return;
  }

  await Linking.openURL(asset.localUri);
}
