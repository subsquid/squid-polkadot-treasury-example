import {
  EventHandlerContext,
  ExtrinsicHandlerContext,
} from "@subsquid/substrate-processor";
import { TreasuryApproveProposalCall, TreasuryProposeSpendCall, TreasuryRejectProposalCall } from "./types/calls";

export function getProposedSpendExtrinsic(ctx: EventHandlerContext): ProposedSpend {
  if (!ctx.extrinsic) {
    throw new MissingExtrinsicError("missing extrinsic information");
  }
  let exctx: ExtrinsicHandlerContext = ctx as ExtrinsicHandlerContext;

  const extrinsic = new TreasuryProposeSpendCall(exctx);

  if (extrinsic.isV0) {
    const { value, beneficiary } = extrinsic.asV0;
    return { value, beneficiaryId : beneficiary };
  }
  if (extrinsic.isV28) {
    const { value, beneficiary } = extrinsic.asV28;
    if (beneficiary.__kind == "Index") throw new Error("Wrong Account address")
    const beneficiaryId = beneficiary.value

    return { value, beneficiaryId };
  }
  if (extrinsic.isV9110) {
    const { value, beneficiary } = extrinsic.asV9110;
    if (beneficiary.__kind == "Index") throw new Error("Wrong Accunt address")
    const beneficiaryId = beneficiary.value

    return { value, beneficiaryId };
  }
  throw new Error("No Runtime version found");
}

export interface ProposedSpend {
    value: bigint;
    beneficiaryId: Uint8Array;
  }

export function getApproveProposalExtrinsic(ctx: ExtrinsicHandlerContext): number {
  if (!ctx.extrinsic) {
    throw new MissingExtrinsicError("missing extrinsic information");
  }

  const extrinsic = new TreasuryApproveProposalCall(ctx);

  if (extrinsic.isV0) {
    const { proposalId } = extrinsic.asV0;
    return proposalId;
  }
  throw new Error("No Runtime version found");
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
