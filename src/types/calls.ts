import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v28 from './v28'
import * as v9110 from './v9110'

export class TreasuryApproveProposalCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'treasury.approveProposal' || this.ctx.extrinsic.name === 'treasury.approve_proposal')
  }

  /**
   *  Approve a proposal. At a later time, the proposal will be allocated to the beneficiary
   *  and the original deposit will be returned.
   * 
   *  # <weight>
   *  - Complexity: O(1).
   *  - DbReads: `Proposals`, `Approvals`
   *  - DbWrite: `Approvals`
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('treasury.approve_proposal') === 'd31c3c178e65331a6ccd6f8dca07268f945f39b38e51421afd1c9e1f5bc0f6c8'
  }

  /**
   *  Approve a proposal. At a later time, the proposal will be allocated to the beneficiary
   *  and the original deposit will be returned.
   * 
   *  # <weight>
   *  - Complexity: O(1).
   *  - DbReads: `Proposals`, `Approvals`
   *  - DbWrite: `Approvals`
   *  # </weight>
   */
  get asV0(): {proposalId: number} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {proposalId: number} {
    deprecateLatest()
    return this.asV0
  }
}

export class TreasuryProposeSpendCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'treasury.proposeSpend' || this.ctx.extrinsic.name === 'treasury.propose_spend')
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `ProposalCount`, `origin account`
   *  - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === '98e9af32f46010396e58ac70ce7c017f7e95d81b05c03d5e5aeb94ce27732909'
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `ProposalCount`, `origin account`
   *  - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   *  # </weight>
   */
  get asV0(): {value: bigint, beneficiary: Uint8Array} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `ProposalCount`, `origin account`
   *  - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   *  # </weight>
   */
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === 'c9f0fb5ad91e84a77c5f948f4140d239e238788ae3191c594dc1e6592472d5a7'
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `ProposalCount`, `origin account`
   *  - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   *  # </weight>
   */
  get asV28(): {value: bigint, beneficiary: v28.GenericMultiAddress} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Put forward a suggestion for spending. A deposit proportional to the value
   * is reserved and slashed if the proposal is rejected. It is returned once the
   * proposal is awarded.
   * 
   * # <weight>
   * - Complexity: O(1)
   * - DbReads: `ProposalCount`, `origin account`
   * - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   * # </weight>
   */
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === 'ffef9f31e8ae5085e7c0a55a685daef52218f0bf7083015ac904dafceedf09ee'
  }

  /**
   * Put forward a suggestion for spending. A deposit proportional to the value
   * is reserved and slashed if the proposal is rejected. It is returned once the
   * proposal is awarded.
   * 
   * # <weight>
   * - Complexity: O(1)
   * - DbReads: `ProposalCount`, `origin account`
   * - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   * # </weight>
   */
  get asV9110(): {value: bigint, beneficiary: v9110.MultiAddress} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {value: bigint, beneficiary: v9110.MultiAddress} {
    deprecateLatest()
    return this.asV9110
  }
}

export class TreasuryRejectProposalCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'treasury.rejectProposal' || this.ctx.extrinsic.name === 'treasury.reject_proposal')
  }

  /**
   *  Reject a proposed spend. The original deposit will be slashed.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `Proposals`, `rejected proposer account`
   *  - DbWrites: `Proposals`, `rejected proposer account`
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('treasury.reject_proposal') === 'd31c3c178e65331a6ccd6f8dca07268f945f39b38e51421afd1c9e1f5bc0f6c8'
  }

  /**
   *  Reject a proposed spend. The original deposit will be slashed.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `Proposals`, `rejected proposer account`
   *  - DbWrites: `Proposals`, `rejected proposer account`
   *  # </weight>
   */
  get asV0(): {proposalId: number} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {proposalId: number} {
    deprecateLatest()
    return this.asV0
  }
}
