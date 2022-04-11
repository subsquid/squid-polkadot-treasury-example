import * as ss58 from "@subsquid/ss58";
import {
  EventHandlerContext,
  Store,
  SubstrateProcessor,
} from "@subsquid/substrate-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { HistoricalTreasuryBalance, Treasury, TreasuryProposal, TreasuryStatus } from "./model";
import { getTreasuryBurntBudget, getTreasuryDepositBudget, getTreasuryProposalIndex, getTreasuryRolloverBudget, getTreasurySpendingBudget } from './event_helpers'
import { getProposedSpendExtrinsic } from "./extrinsic_helpers";

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

processor.run();

async function processProposed(ctx: EventHandlerContext): Promise<void> {
  const proposalIndex = getTreasuryProposalIndex(ctx);
  
  console.log(ctx.extrinsic);
  console.log(ctx.extrinsic?.args);

  const ext = getProposedSpendExtrinsic(ctx);
  const treasuryProposal = await getOrCreate(ctx.store, TreasuryProposal, proposalIndex.toString());
  treasuryProposal.status = TreasuryStatus.PROPOSED;
  treasuryProposal.value = ext.value;
  // treasuryProposal.beneficiary = encodeID(ext.beneficiary, 0);

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
  
}

async function processRejected(ctx:EventHandlerContext): Promise<void> {
  
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
