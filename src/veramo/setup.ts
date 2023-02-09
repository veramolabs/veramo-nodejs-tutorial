// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '33aab9e0334c44b0a2e0c57c15302608'

// This will be the secret key for the KMS
const KMS_SECRET_KEY =
  'c0710059b687bf53009f7b935903ba48334e569780851008392f3e7f595c347a'
const { Resolver } = require('did-resolver')
const { getResolver: ethrDidResolver } = require('ethr-did-resolver')
const { getResolver: webDidResolver } = require('web-did-resolver')
import { TAgent, IDIDManager, IResolver, IDataStore, IKeyManager } from '@veramo/core-types'

async function getAgent2(): Promise<TAgent<IDIDManager & IKeyManager & IDataStore & IResolver>> {
  // Core interfaces
  const { createAgent } = await import('@veramo/core')

  // Core identity manager plugin
  const { DIDManager } = await import('@veramo/did-manager')

  // Ethr did identity provider
  const { EthrDIDProvider } = await import('@veramo/did-provider-ethr')

  // Web did identity provider
  const { WebDIDProvider } = await import('@veramo/did-provider-web')

  // Core key manager plugin
  const { KeyManager } = await import('@veramo/key-manager')

  // Custom key management system for RN
  const { KeyManagementSystem, SecretBox } = await import('@veramo/kms-local')

  // Custom resolvers
  const { DIDResolverPlugin } = await import('@veramo/did-resolver')


  // Storage plugin using TypeOrm
  const { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } = await import('@veramo/data-store')

  // TypeORM is installed with `@veramo/data-store`
  const { createConnection } = await import('typeorm')

  
  const dbConnection = createConnection({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
    })

  const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IResolver>({
    plugins: [
      new KeyManager({
        // @ts-ignore
        store: new KeyStore(dbConnection),
        kms: {
          local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
        },
      }),
      new DIDManager({
        store: new DIDStore(dbConnection),
        defaultProvider: 'did:ethr:rinkeby',
        providers: {
          'did:ethr:rinkeby': new EthrDIDProvider({
            defaultKms: 'local',
            network: 'rinkeby',
            rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
          }),
          'did:web': new WebDIDProvider({
            defaultKms: 'local',
          }),
        },
      }),
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
          ...webDidResolver(),
        }),
      }),
    ],
  })
  return agent
}
module.exports.getAgent = getAgent2