import * as ss58 from "@subsquid/ss58";
import {
  EventHandlerContext,
  ExtrinsicHandlerContext,
  Store,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { HistoricalTreasuryBalance, Treasury, TreasuryProposal, TreasuryStatus } from "./model";
import { getAwardedProposalEvent, getRejectedProposalEvent, getTreasuryBurntBudget, getTreasuryDepositBudget, getTreasuryProposalIndex, getTreasuryRolloverBudget, getTreasurySpendingBudget } from './event_helpers'
import { getApproveProposalExtrinsic, getProposedSpendExtrinsic } from "./extrinsic_helpers";

const processor = new SubstrateProcessor("polkadot_treasury");

processor.setBatchSize(500);
processor.setDataSource({
  archive: lookupArchive("polkadot")[0].url,
  chain: "wss://rpc.polkadot.io",
});

processor.addEventHandler("treasury.Proposed", processProposed);
processor.addEventHandler("treasury.Spending", processSpending);
processor.addEventHandler("treasury.Awarded", processAwarded);
processor.addEventHandler("treasury.Rejected", processRejected);
processor.addEventHandler("treasury.Burnt", processBurnt);
processor.addEventHandler("treasury.Rollover", processRollover);
processor.addEventHandler("treasury.Deposit", processDeposit);

processor.addExtrinsicHandler("treasury.approve_proposal", processApproveProposal);

processor.run();

async function processProposed(ctx: EventHandlerContext): Promise<void> {
  const proposalIndex = getTreasuryProposalIndex(ctx);

  const ext = getProposedSpendExtrinsic(ctx);
  const treasuryProposal = await getOrCreate(ctx.store, TreasuryProposal, proposalIndex.toString());
  treasuryProposal.status = TreasuryStatus.PROPOSED;
  treasuryProposal.value = ext.value;
  treasuryProposal.beneficiary = encodeID(ext.beneficiaryId, 0) ?? "None";

  await ctx.store.save(treasuryProposal);
}

async function processSpending(ctx: EventHandlerContext): Promise<void> {
  const budgetRemaining = getTreasurySpendingBudget(ctx);

  // there is only one treasury, this is a 'fake' ID.
  // I don't like this solution, might change it in the future
  const treasury = await getOrCreate(ctx.store, Treasury, '1');
  treasury.balance = budgetRemaining;
  await ctx.store.save(treasury);

  const treasuryBalance = new HistoricalTreasuryBalance();
  treasuryBalance.balance = budgetRemaining;
  treasuryBalance.treasury = treasury;
  treasuryBalance.date = new Date(ctx.block.timestamp);
  await ctx.store.save(treasuryBalance);
}

async function processAwarded(ctx:EventHandlerContext): Promise<void> {
  const awardEvent = getAwardedProposalEvent(ctx);

  const proposal = await getOrCreate(ctx.store, TreasuryProposal, awardEvent.proposalIndex.toString());
  proposal.status = TreasuryStatus.AWARDED;
  await ctx.store.save(proposal);

  const treasury = await getOrCreate(ctx.store, Treasury, '1');
  treasury.balance -= awardEvent.award;
  await ctx.store.save(treasury);

  const treasuryBalance = new HistoricalTreasuryBalance();
  treasuryBalance.balance = treasury.balance;
  treasuryBalance.treasury = treasury;
  treasuryBalance.date = new Date(ctx.block.timestamp);
  await ctx.store.save(treasuryBalance);
}

async function processRejected(ctx:EventHandlerContext): Promise<void> {
  const rejEvent = getRejectedProposalEvent(ctx);

  const proposal = await getOrCreate(ctx.store, TreasuryProposal, rejEvent.proposalIndex.toString());
  proposal.status = TreasuryStatus.AWARDED;
  await ctx.store.save(proposal);

  // when a proposal is rejected, the funds used for the anti-spam mechanism are slashed.
  // we could change the treasuryBalance here, but they are added to the Treasury via a Deposit event
}

async function processBurnt(ctx:EventHandlerContext): Promise<void> {
  const burntFunds = getTreasuryBurntBudget(ctx);

  // there is only one treasury, this is a 'fake' ID.
  // I don't like this solution, might change it in the future
  const treasury = await getOrCreate(ctx.store, Treasury, '1');
  treasury.balance -= burntFunds;
  await ctx.store.save(treasury);

  const treasuryBalance = new HistoricalTreasuryBalance();
  treasuryBalance.balance = treasury.balance;
  treasuryBalance.treasury = treasury;
  treasuryBalance.date = new Date(ctx.block.timestamp);
  await ctx.store.save(treasuryBalance);
}

async function processRollover(ctx:EventHandlerContext): Promise<void> {
  const rolloverBalance = getTreasuryRolloverBudget(ctx);

  // there is only one treasury, this is a 'fake' ID.
  // I don't like this solution, might change it in the future
  const treasury = await getOrCreate(ctx.store, Treasury, '1');
  treasury.balance = rolloverBalance;
  await ctx.store.save(treasury);

  const treasuryBalance = new HistoricalTreasuryBalance();
  treasuryBalance.balance = rolloverBalance;
  treasuryBalance.treasury = treasury;
  treasuryBalance.date = new Date(ctx.block.timestamp);
  await ctx.store.save(treasuryBalance);
}

async function processDeposit(ctx:EventHandlerContext): Promise<void> {
  const value = getTreasuryDepositBudget(ctx);

  // there is only one treasury, this is a 'fake' ID.
  // I don't like this solution, might change it in the future
  const treasury = await getOrCreate(ctx.store, Treasury, '1');
  treasury.balance += value;
  await ctx.store.save(treasury);

  const treasuryBalance = new HistoricalTreasuryBalance();
  treasuryBalance.balance = treasury.balance;
  treasuryBalance.treasury = treasury;
  treasuryBalance.date = new Date(ctx.block.timestamp);
  await ctx.store.save(treasuryBalance);
}

async function processApproveProposal(ctx: ExtrinsicHandlerContext): Promise<void> {
  const proposalId = getApproveProposalExtrinsic(ctx);

  const proposal = await getOrCreate(ctx.store, TreasuryProposal, proposalId.toString());

  proposal.status = TreasuryStatus.APPROVED;
  await ctx.store.save(proposal);
}

async function getOrCreate<T extends { id: string }>(
  store: Store,
  EntityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {
  let entity = await store.get<T>(EntityConstructor, {
    where: { id },
  });

  if (entity == null) {
    entity = new EntityConstructor();
    entity.id = id;
  }

  return entity;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};

function encodeID(ID: Uint8Array, prefix: string | number) {
  let ret: string | null
  try {
      ret = ss58.codec(prefix).encode(ID)
  } catch (e) {
      ret = null
  }

  return ret
}
