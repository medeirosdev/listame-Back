/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agenda_id: string;

  @ManyToOne(() => Agenda)
  @JoinColumn({ name: 'agenda_id' })
  user: Agenda;

  @Column('time with time zone')
  start_date: Date;

  @Column('time with time zone')
  end_date: Date;

  @Column()
  appointment_name: string;

  @Column()
  appointment_description: string;

  @Column()
  recurrence_id: string;

  @Column()
  notify_before: number;

  @Column()
  status: string;

  @Column()
  location: string;

  @Column('bool')
  is_private: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
