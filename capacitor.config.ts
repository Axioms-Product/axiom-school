
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.axiomsproduct.axiomschool',
  appName: 'Axioms School',
  webDir: 'dist',
  server: {
    url: 'https://2b62e72d-1dcf-46b6-9d09-40e65e3a46d0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff'
    }
  }
};

export default config;
