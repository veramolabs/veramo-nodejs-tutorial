const { getAgent } = require('./veramo/setup')

async function main() {
  const agent = await getAgent()
  const identity = await agent.didManagerCreate()
  console.log(`New identity created`)
  console.log(identity)
}

main().catch(console.log)
export {}