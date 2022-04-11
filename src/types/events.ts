import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9170 from './v9170'

export class TreasuryAwardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Awarded')
  }

  /**
   *  Some funds have been allocated.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Awarded') === '86708250ac506876b8d63d9c97b4ca0fa73f0199c633da6fb2a8956aaab8c743'
  }

  /**
   *  Some funds have been allocated.
   */
  get asV0(): [number, bigint, Uint8Array] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some funds have been allocated.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Awarded') === '998b846fdf605dfbbe27d46b36b246537b990ed6d4deb2f0177d539b9dab3878'
  }

  /**
   * Some funds have been allocated.
   */
  get asV9170(): {proposalIndex: number, award: bigint, account: v9170.AccountId32} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {proposalIndex: number, award: bigint, account: v9170.AccountId32} {
    deprecateLatest()
    return this.asV9170
  }
}

export class TreasuryBurntEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Burnt')
  }

  /**
   *  Some of our funds have been burnt.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Burnt') === '47b59f698451e50cce59979f0121e842fa3f8b2bcef2e388222dbd69849514f9'
  }

  /**
   *  Some of our funds have been burnt.
   */
  get asV0(): bigint {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some of our funds have been burnt.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Burnt') === '9d1d11cb2e24085666bf949195a4030bd6e80ff41274d0386073977e7cd59a87'
  }

  /**
   * Some of our funds have been burnt.
   */
  get asV9170(): {burntFunds: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {burntFunds: bigint} {
    deprecateLatest()
    return this.asV9170
  }
}

export class TreasuryDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Deposit')
  }

  /**
   *  Some funds have been deposited.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Deposit') === '47b59f698451e50cce59979f0121e842fa3f8b2bcef2e388222dbd69849514f9'
  }

  /**
   *  Some funds have been deposited.
   */
  get asV0(): bigint {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some funds have been deposited.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Deposit') === 'd74027ad27459f17d7446fef449271d1b0dc12b852c175623e871d009a661493'
  }

  /**
   * Some funds have been deposited.
   */
  get asV9170(): {value: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {value: bigint} {
    deprecateLatest()
    return this.asV9170
  }
}

export class TreasuryProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Proposed')
  }

  /**
   *  New proposal.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Proposed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  New proposal.
   */
  get asV0(): number {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New proposal.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Proposed') === 'e9ffb62c9cf38a8abb0e419c0655e66f4415cc9c0faa1066316d07cb033b8ff6'
  }

  /**
   * New proposal.
   */
  get asV9170(): {proposalIndex: number} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {proposalIndex: number} {
    deprecateLatest()
    return this.asV9170
  }
}

export class TreasuryRejectedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Rejected')
  }

  /**
   *  A proposal was rejected; funds were slashed.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Rejected') === 'a0e51e81445baa317309351746e010ed2435e30ff7e53fbb2cf59283f3b9c536'
  }

  /**
   *  A proposal was rejected; funds were slashed.
   */
  get asV0(): [number, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A proposal was rejected; funds were slashed.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Rejected') === 'f9b7fb646bc37c38ad87edfaa08a0ca293b38294934c1114934c7a8fe00b6b79'
  }

  /**
   * A proposal was rejected; funds were slashed.
   */
  get asV9170(): {proposalIndex: number, slashed: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {proposalIndex: number, slashed: bigint} {
    deprecateLatest()
    return this.asV9170
  }
}

export class TreasuryRolloverEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Rollover')
  }

  /**
   *  Spending has finished; this is the amount that rolls over until next spend.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Rollover') === '47b59f698451e50cce59979f0121e842fa3f8b2bcef2e388222dbd69849514f9'
  }

  /**
   *  Spending has finished; this is the amount that rolls over until next spend.
   */
  get asV0(): bigint {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Spending has finished; this is the amount that rolls over until next spend.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Rollover') === 'c9e720e2b3ada12c617b4dcb70771c3afafb9e294bf362df01a9e129683a92dd'
  }

  /**
   * Spending has finished; this is the amount that rolls over until next spend.
   */
  get asV9170(): {rolloverBalance: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {rolloverBalance: bigint} {
    deprecateLatest()
    return this.asV9170
  }
}

export class TreasurySpendingEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Spending')
  }

  /**
   *  We have ended a spend period and will now allocate funds.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('treasury.Spending') === '47b59f698451e50cce59979f0121e842fa3f8b2bcef2e388222dbd69849514f9'
  }

  /**
   *  We have ended a spend period and will now allocate funds.
   */
  get asV0(): bigint {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * We have ended a spend period and will now allocate funds.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('treasury.Spending') === 'b9f599ccbbe2e4fd1004f47546e1a3100bc78745b24ac47ac03ed16ca6266290'
  }

  /**
   * We have ended a spend period and will now allocate funds.
   */
  get asV9170(): {budgetRemaining: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {budgetRemaining: bigint} {
    deprecateLatest()
    return this.asV9170
  }
}
