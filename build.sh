npm run lint
npm run test
rm -rf ./dist
webpack --config ./webpack.config.ts --mode=production
rm -rf ./dist/__tests__
rm -rf ./dist/report-*
rm -rf ./dist/stats-*
rm -rf ./dist/webpack.config.d.ts
mv ./dist/src/* ./dist
rm -rf ./dist/src