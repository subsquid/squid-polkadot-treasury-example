import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {TreasuryStatus} from "./_treasuryStatus"

@Entity_()
export class TreasuryProposal {
  constructor(props?: Partial<TreasuryProposal>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  value!: bigint

  @Column_("text", {nullable: false})
  beneficiary!: string

  @Column_("varchar", {length: 8, nullable: false})
  status!: TreasuryStatus
}
