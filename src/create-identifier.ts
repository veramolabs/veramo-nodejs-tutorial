import { agent } from './veramo/setup.js'

async function main() {
  const identity = await agent.didManagerCreate()
  console.log(`New identity created`)
  console.log(identity)
}

main().catch(console.log)