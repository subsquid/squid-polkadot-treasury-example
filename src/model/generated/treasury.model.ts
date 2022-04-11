import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {HistoricalTreasuryBalance} from "./historicalTreasuryBalance.model"

@Entity_()
export class Treasury {
  constructor(props?: Partial<Treasury>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @OneToMany_(() => HistoricalTreasuryBalance, e => e.treasury)
  historicalBalances!: HistoricalTreasuryBalance[]
}
