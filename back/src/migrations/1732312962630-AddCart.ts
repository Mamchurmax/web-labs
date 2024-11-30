import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCart1732312962630 implements MigrationInterface {
    name = 'AddCart1732312962630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`type\` varchar(255) NOT NULL, \`transportationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transportation_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`duration\` int NOT NULL, \`last_updated\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_entity\` ADD CONSTRAINT \`FK_11a5fd4e27294b8611563205628\` FOREIGN KEY (\`transportationId\`) REFERENCES \`transportation_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_entity\` DROP FOREIGN KEY \`FK_11a5fd4e27294b8611563205628\``);
        await queryRunner.query(`DROP TABLE \`transportation_entity\``);
        await queryRunner.query(`DROP TABLE \`cart_entity\``);
    }

}
