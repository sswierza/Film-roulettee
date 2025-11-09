#!/usr/bin/env bash
set -e
echo "Film Roulette - build helper"
echo "Install eas-cli if needed: npm install -g eas-cli"
echo "Login: eas login"
echo "Optional: eas secret:create --name TMDB_API_KEY --value "YOUR_TMDB_KEY""
eas init --yes || true
eas build --platform android --profile production --non-interactive
