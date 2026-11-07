#!/bin/sh
# src/game.html（ゲーム本体）と src/site-head.txt（ホーム画面アイコン等の head）から、公開用の index.html を作る
set -e
cd "$(dirname "$0")"
node tools/check.js
{ cat src/site-head.txt; cat src/game.html; printf '\n</html>\n'; } > index.html
touch .nojekyll
echo "index.html を作り直しました"
