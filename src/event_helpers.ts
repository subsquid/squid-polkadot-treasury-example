import { EventHandlerContext } from "@subsquid/substrate-processor";
import { TreasuryBurntEvent, TreasuryDepositEvent, TreasuryProposedEvent, TreasuryRolloverEvent, TreasurySpendingEvent } from "./types/events";

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