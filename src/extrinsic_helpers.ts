import {
  EventHandlerContext,
  ExtrinsicHandlerContext,
} from "@subsquid/substrate-processor";
import { TreasuryProposeSpendCall } from "./types/calls";
import { MultiAddress } from './types/v9110'
import { GenericMultiAddress } from './types/v28'

export function getProposedSpendExtrinsic(ctx: EventHandlerContext): ProposedSpend {
  if (!ctx.extrinsic) {
    throw new MissingExtrinsicError("missing extrinsic information");
  }
  let exctx: ExtrinsicHandlerContext = ctx as ExtrinsicHandlerContext;

  const extrinsic = new TreasuryProposeSpendCall(exctx);

  if (extrinsic.isV0) {
    const { value, beneficiary } = extrinsic.asV0;
    return { value, beneficiary };
  }
  if (extrinsic.isV28) {
    const { value, beneficiary } = extrinsic.asV28;

    return { value, beneficiary };
  }
  if (extrinsic.isV9110) {
    const { value, beneficiary } = extrinsic.asV9110;
    return { value, beneficiary };
  }
  throw new Error("No Runtime version found");
}

export interface ProposedSpend {
  value: bigint;
  beneficiary: Uint8Array | GenericMultiAddress | MultiAddress;
}

export class MissingExtrinsicError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MissingExtrinsicError.prototype);
  }

  sayHello() {
    return "hello " + this.message;
  }
}
