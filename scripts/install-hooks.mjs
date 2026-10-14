import { copyFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const hookSrc = join(root, '.githooks', 'pre-push')
const hooksDir = join(root, '.git', 'hooks')
const hookDest = join(hooksDir, 'pre-push')

if (!existsSync(hookSrc)) process.exit(0)

mkdirSync(hooksDir, { recursive: true })
copyFileSync(hookSrc, hookDest)
chmodSync(hookDest, 0o755)
