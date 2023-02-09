const { getAgent } = require('./veramo/setup')

async function main() {
  const agent = await getAgent()
  const identifiers = await agent.didManagerFind()

  console.log(`There are ${identifiers.length} identifiers`)

  if (identifiers.length > 0) {
    identifiers.map((id: any) => {
      console.log(id)
      console.log('..................')
    })
  }
}

main().catch(console.log)
export {}