npm run lint
npm run test
npm run ts-check
rm -rf ./dist
ts-node ./esbuild/build.ts
rm -rf ./dist/__tests__
# mv ./dist/src/* ./dist
# rm -rf ./dist/src