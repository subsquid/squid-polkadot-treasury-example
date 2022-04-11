module.exports = class Data1649688063973 {
  name = 'Data1649688063973'

  async up(db) {
    await db.query(`CREATE TABLE "treasury_proposal" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "status" character varying(8) NOT NULL, CONSTRAINT "PK_99099b9e22458fa003fcec56e70" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "treasury" ("id" character varying NOT NULL, "balance" numeric NOT NULL, CONSTRAINT "PK_55655557260341eb45eb7306810" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "historical_treasury_balance" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "treasury_id" character varying NOT NULL, CONSTRAINT "PK_80c46cebecbc7c9ffc7cd9a17d8" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2de383b7efa316d2e283047a64" ON "historical_treasury_balance" ("treasury_id") `)
    await db.query(`ALTER TABLE "historical_treasury_balance" ADD CONSTRAINT "FK_2de383b7efa316d2e283047a649" FOREIGN KEY ("treasury_id") REFERENCES "treasury"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "treasury_proposal"`)
    await db.query(`DROP TABLE "treasury"`)
    await db.query(`DROP TABLE "historical_treasury_balance"`)
    await db.query(`DROP INDEX "public"."IDX_2de383b7efa316d2e283047a64"`)
    await db.query(`ALTER TABLE "historical_treasury_balance" DROP CONSTRAINT "FK_2de383b7efa316d2e283047a649"`)
  }
}
