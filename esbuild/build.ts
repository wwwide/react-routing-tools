import { build } from 'esbuild'
import { esBuildConfig } from './config'

const t1 = Date.now()

build(esBuildConfig())
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => {
    console.log(`Finished in ${(Date.now() - t1) / 1000}s`)
  })
