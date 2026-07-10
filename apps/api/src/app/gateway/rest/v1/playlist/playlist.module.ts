import { Module } from '@nestjs/common';
import { PlyalistController } from './plyalist.controller';
import { CreatePlaylistWorkflow } from '$/core/workflows/playlist/create-playlist.workflow';

@Module({
  controllers: [PlyalistController],
  providers: [CreatePlaylistWorkflow],
})
export class PlaylistModule {}
