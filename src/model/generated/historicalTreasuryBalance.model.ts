import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Treasury} from "./treasury.model"

@Entity_()
export class HistoricalTreasuryBalance {
  constructor(props?: Partial<HistoricalTreasuryBalance>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Index_()
  @ManyToOne_(() => Treasury, {nullable: false})
  treasury!: Treasury
}
