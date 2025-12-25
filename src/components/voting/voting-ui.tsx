'use client'

import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useVotingProgram } from './voting-data-access'

export function VotingCreate() {
  return (
    <div className="alert alert-info">
      <span>Voting creation is under construction.</span>
    </div>
  )
}

export function VotingList() {
  return (
    <div className="alert alert-warning">
      <span>Voting list is under construction.</span>
    </div>
  )
}
