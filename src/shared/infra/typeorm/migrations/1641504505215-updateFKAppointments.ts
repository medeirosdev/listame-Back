import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class updateFKAppointments1641504505215
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentUserId');
    await queryRunner.dropColumn('appointments', 'user_id');
    await queryRunner.dropColumn('appointments', 'group_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'reccurent_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'notify_before',
        type: 'integer',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'agenda_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentAgendaId',
        columnNames: ['agenda_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'agendas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentAgendaId');
    await queryRunner.dropColumn('appointments', 'agenda_id');
    await queryRunner.dropColumn('appointments', 'notify_before');
    await queryRunner.dropColumn('appointments', 'reccurent_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUserId',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
