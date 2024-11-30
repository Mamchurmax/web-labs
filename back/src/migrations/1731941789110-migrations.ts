import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731941789110 implements MigrationInterface {
  name = 'Migrations1731941789110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transportation\` DROP COLUMN \`from_to\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transportation\` ADD \`location\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transportation\` ADD \`duration\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transportation\` DROP COLUMN \`duration\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transportation\` DROP COLUMN \`location\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transportation\` ADD \`from_to\` varchar(255) NOT NULL`,
    );
  }
}
