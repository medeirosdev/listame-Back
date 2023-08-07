/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import { UserAgendaRole } from '@modules/agendas/infra/typeorm/enums/UserAgendaRoles';
import Agenda from './Agenda';

@Entity('users_agendas')
class UserAgenda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  agenda_id: string;

  @Column({
    type: 'enum',
    enum: UserAgendaRole,
  })
  role: UserAgendaRole;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Agenda)
  @JoinColumn({ name: 'agenda_id' })
  agenda: Agenda;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserAgenda;
