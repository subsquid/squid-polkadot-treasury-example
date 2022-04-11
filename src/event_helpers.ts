import { EventHandlerContext } from "@subsquid/substrate-processor";
import { TreasuryAwardedEvent, TreasuryBurntEvent, TreasuryDepositEvent, TreasuryProposedEvent, TreasuryRejectedEvent, TreasuryRolloverEvent, TreasurySpendingEvent } from "./types/events";

export function getTreasuryProposalIndex(ctx: EventHandlerContext): number {
  const event = new TreasuryProposedEvent(ctx);
  if (event.isV0) {
    return event.asV0;
  }

  if (event.isV9170) {
    const { proposalIndex } = event.asV9170;
    return proposalIndex;
  }
  throw new Error("No Runtime version found");
}

export function getTreasurySpendingBudget(ctx: EventHandlerContext): bigint {
    const event = new TreasurySpendingEvent(ctx);

    if(event.isV0) {
        return event.asV0;
    }
    if (event.isV9170) {
        const { budgetRemaining } = event.asV9170;
        return budgetRemaining;
    }
    throw new Error("No Runtime version found");
}

export interface ProposalAward {
    proposalIndex: number
    award: bigint
    account: Uint8Array
}

export function getAwardedProposalEvent(ctx: EventHandlerContext): ProposalAward {
    const event = new TreasuryAwardedEvent(ctx);

    if(event.isV0) {
        const [proposalIndex, award, account] = event.asV0;
        return { proposalIndex, award, account };
    }
    if(event.isV9170) {
        const { proposalIndex, award, account } = event.asV9170;
        return { proposalIndex, award, account }
    }
    throw new Error("No Runtime version found");
}

export interface ProposalReject {
    proposalIndex: number
    slashed: bigint
}

export function getRejectedProposalEvent(ctx: EventHandlerContext): ProposalReject {
    const event = new TreasuryRejectedEvent(ctx);

    if(event.isV0) {
        const [proposalIndex, slashed] = event.asV0;
        return { proposalIndex, slashed };
    }
    if(event.isV9170) {
        const { proposalIndex, slashed } = event.asV9170;
        return { proposalIndex, slashed }
    }
    throw new Error("No Runtime version found");
}

export function getTreasuryBurntBudget(ctx: EventHandlerContext): bigint {
    const event = new TreasuryBurntEvent(ctx);

    if(event.isV0) {
        return event.asV0;
    }
    if (event.isV9170) {
        const { burntFunds } = event.asV9170;
        return burntFunds;
    }
    throw new Error("No Runtime version found");
}

export function getTreasuryRolloverBudget(ctx: EventHandlerContext): bigint {
    const event = new TreasuryRolloverEvent(ctx);

    if(event.isV0) {
        return event.asV0;
    }
    if (event.isV9170) {
        const { rolloverBalance } = event.asV9170;
        return rolloverBalance;
    }
    throw new Error("No Runtime version found");
}

export function getTreasuryDepositBudget(ctx: EventHandlerContext): bigint {
    const event = new TreasuryDepositEvent(ctx);

    if(event.isV0) {
        return event.asV0;
    }
    if (event.isV9170) {
        const { value } = event.asV9170;
        return value;
    }
    throw new Error("No Runtime version found");
}