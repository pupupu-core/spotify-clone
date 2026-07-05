import { Injectable } from '@nestjs/common';
import { ArtistAlbumsResponse } from '@streaming-service/model';
import { FetchAlbumsArtistStep } from '$/core/steps/fetch-albums-artist.step';
import { FetchTracksAlbumsStep } from '$/core/steps/fetch-tracks-albums.step';

@Injectable()
export class GetAlbumArtistWorkflow {
  public constructor(
    private readonly fetchAlbumArtistStep: FetchAlbumsArtistStep,
    private readonly fetchTracksAlbumsStep: FetchTracksAlbumsStep,
  ) {}

  public async execute(artistId: number): Promise<ArtistAlbumsResponse> {
    const artistAlbums = await this.fetchAlbumArtistStep.execute(artistId);
    const albumIds = artistAlbums.albums.map(album => Number(album.albumId));
    const albums = await this.fetchTracksAlbumsStep.execute(albumIds);

    const albumsMap = new Map(albums.map(album => [album.id, album]));

    return {
      ...artistAlbums,
      albums: artistAlbums.albums.map(album => ({
        ...album,
        tracksCount: albumsMap.get(album.albumId)?.tracks.length ?? 0,
        albumImageUrl: albumsMap.get(album.albumId)?.imageUrl ?? album.albumImageUrl,
      })),
    };
  }
}
