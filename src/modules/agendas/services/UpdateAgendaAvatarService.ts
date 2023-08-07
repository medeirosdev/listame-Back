/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Agenda from '@modules/agendas/infra/typeorm/entities/Agenda';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAgendasRepository from '../repositories/IAgendasRepository';

const agendaAvatarFolder = 'agendas/avatars';

interface Request {
  user_id: string;
  agendaId: string;
  avatarFileName: string;
}

@injectable()
class UpdateAgendaAvatarService {
  constructor(
    @inject('AgendasRepository')
    private agendasRepository: IAgendasRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    agendaId,
    avatarFileName,
  }: Request): Promise<Agenda> {
    const agenda = await this.agendasRepository.findByIds([agendaId]);

    if (!agenda) {
      throw new AppError('Agenda does not exist');
    }

    if (agenda[0].avatar) {
      await this.storageProvider.deleteFile(
        agenda[0].avatar,
        agendaAvatarFolder,
      );
    }

    const fileName = await this.storageProvider.saveFile(
      avatarFileName,
      agendaAvatarFolder,
    );

    agenda[0].avatar = fileName;

    await this.agendasRepository.save(agenda[0]);

    return agenda[0];
  }
}

export default UpdateAgendaAvatarService;
