import { networks } from '@safe-global/protocol-kit/dist/src/utils/eip-3770/config'
/**
 * A static shortName<->chainId dictionary
 * E.g.:
 *
 * {
 *   eth: '1',
 *   gor: '5',
 *   ...
 * }
 */
type Chains = Record<string, string>

const chains = networks.reduce<Chains>((result, { shortName, chainId }) => {
  result[shortName] = chainId.toString()
  return result
}, {})

const ChainLogos = {
  [chains.brock]: '/images/networks/brock.png',
  [chains.brocktest]: '/images/networks/brock.png',
}

export const getChainLogo = (chainId: string) => {
  return ChainLogos[chainId]
}

export default chains
