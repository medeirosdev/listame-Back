import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addMembersColumnOnAgendasTable1642620840981
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'agendas',
      new TableColumn({
        name: 'members',
        type: 'integer',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('agendas', 'members');
  }
}
