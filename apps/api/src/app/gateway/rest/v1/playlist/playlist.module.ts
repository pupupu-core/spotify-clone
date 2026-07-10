import { Module } from '@nestjs/common';
import { PlyalistController } from './plyalist.controller';
import { CreatePlaylistWorkflow } from '$/core/workflows/playlist/create-playlist.workflow';
import { ResolvePlaylistTrackReferencesStep } from '$/core/steps/resolve-playlist-track-references.step';
import { CreateAccountPlaylistStep } from '$/core/steps/create-account-playlist.step';
import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';

@Module({
  imports: [PrismaModule, JamendoModule, AuthTokenModule],
  controllers: [PlyalistController],
  providers: [
    CreatePlaylistWorkflow,
    ResolvePlaylistTrackReferencesStep,
    CreateAccountPlaylistStep,
    RetrieveOwnedPlaylistStep,
  ],
})
export class PlaylistModule {}
