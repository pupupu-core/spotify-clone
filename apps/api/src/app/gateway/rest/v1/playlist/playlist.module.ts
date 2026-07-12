import { Module } from '@nestjs/common';
import { PlyalistController } from './plyalist.controller';
import { CreatePlaylistWorkflow } from '$/core/workflows/playlist/create-playlist.workflow';
import { ResolvePlaylistTrackReferencesStep } from '$/core/steps/resolve-playlist-track-references.step';
import { CreateAccountPlaylistStep } from '$/core/steps/create-account-playlist.step';
import { RetrieveOwnedPlaylistStep } from '$/core/steps/retrieve-owned-playlist.step';
import { JamendoModule } from '$/infrastructure/jamendo/jamendo.module';
import { PrismaModule } from '$/infrastructure/prisma/prisma.module';
import { AuthTokenModule } from '$/infrastructure/token/auth-token.module';
import { ListAccountPlaylistsStep } from '$/core/steps/list-account-playlists.step';
import { ListAccountPlaylistsWorkflow } from '$/core/workflows/playlist/list-account-playlists.workflow';
import { GetPlaylistWorkflow } from '$/core/workflows/playlist/get-playlist.workflow';
import { DeletePlaylistWorkflow } from '$/core/workflows/playlist/delete-playlist.workflow';
import { DeleteAccountPlaylistStep } from '$/core/steps/delete-account-playlist';
import { ListCommunityPlaylistsWorkflow } from '$/core/workflows/playlist/list-community-playlists.workflow';
import { ListCommunityPlaylistsStep } from '$/core/steps/list-community-playlists.step';
import { UpdatePlaylistWorkflow } from '$/core/workflows/playlist/update-playlist.workflow';
import { UpdatePlaylistStep } from '$/core/steps/update-playlist.step';

@Module({
  imports: [PrismaModule, JamendoModule, AuthTokenModule],
  controllers: [PlyalistController],
  providers: [
    CreatePlaylistWorkflow,
    GetPlaylistWorkflow,
    ListAccountPlaylistsWorkflow,
    DeletePlaylistWorkflow,
    ListCommunityPlaylistsWorkflow,
    UpdatePlaylistWorkflow,
    ListCommunityPlaylistsStep,
    DeleteAccountPlaylistStep,
    ResolvePlaylistTrackReferencesStep,
    CreateAccountPlaylistStep,
    RetrieveOwnedPlaylistStep,
    ListAccountPlaylistsStep,
    UpdatePlaylistStep,
  ],
})
export class PlaylistModule {}
