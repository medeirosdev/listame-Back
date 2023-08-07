import { MigrationInterface, QueryRunner } from 'typeorm';

export default class changeColumnNameOnAppoinments1643058893124
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'appointments',
      'reccurent_id',
      'recurrence_id',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'appointments',
      'recurrence_id',
      'reccurent_id',
    );
  }
}
