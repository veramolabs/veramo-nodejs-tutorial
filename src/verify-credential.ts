import { agent } from './veramo/setup.js'

async function main() {
  const result = await agent.verifyCredential({
    credential: {
        "credentialSubject": {
          "you": "Rock",
          "id": "did:web:example.com"
        },
        "issuer": {
          "id": "did:ethr:sepolia:0x02bd224258f3b0ae8fa5388342783d9697dac9133eb476c7946eeed9ac7b864ce1"
        },
        "type": [
          "VerifiableCredential"
        ],
        "@context": [
          "https://www.w3.org/2018/credentials/v1"
        ],
        "issuanceDate": "2024-06-04T14:37:27.000Z",
        "proof": {
          "type": "JwtProof2020",
          "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MTc1MTE4NDcsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHgwMmJkMjI0MjU4ZjNiMGFlOGZhNTM4ODM0Mjc4M2Q5Njk3ZGFjOTEzM2ViNDc2Yzc5NDZlZWVkOWFjN2I4NjRjZTEifQ.rbpmqCNl8snAH_-rgSgbkj9IPpHIps6tLu1DptmP9JtVkQxj4FpN2y9cvHfDKa5Ekb8qWrgUcyLSOLpk6LO3_Q"
        }
      }
  })
  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)