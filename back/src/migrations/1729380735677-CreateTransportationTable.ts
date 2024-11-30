import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransportationTable1729380735677 implements MigrationInterface {
    name = 'CreateTransportationTable1729380735677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transportation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`from_to\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`last_updated\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`transportation\``);
    }

}
