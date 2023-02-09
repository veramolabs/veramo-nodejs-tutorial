const { getAgent } = require('./veramo/setup')

async function main() {
  const agent = await getAgent()
  const identifier = await agent.didManagerCreate({ alias: 'default' })
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))
}

main().catch(console.log)
export {}