// types/index.ts
export interface Artist {
  idArtist: string;
  strArtist: string;
  strArtistThumb?: string;
  strGenre?: string;
  intFormedYear?: string;
  strCountry?: string;
  strBiographyES?: string;
  strBiographyEN?: string;
  strWebsite?: string;
  strFacebook?: string;
  strTwitter?: string;
  strLastFMChart?: string;
  strStyle?: string;
  strMood?: string;
}

export interface Album {
  idAlbum: string;
  idArtist: string;
  strAlbum: string;
  strAlbumThumb?: string;
  intYearReleased?: string;
  strGenre?: string;
  strDescription?: string;
  strStyle?: string;
  strReleaseFormat?: string;
  intSales?: string;
}

export interface MusicVideo {
  idArtist: string;
  idTrack: string;
  strTrack: string;
  strTrackThumb?: string;
  strMusicVid?: string;
  strDescriptionEN?: string;
}

export interface Track {
  idTrack: string;
  idAlbum: string;
  strTrack: string;
  intDuration?: string;
  strMusicVid?: string;
  intTrackNumber?: string;
  strDescriptionEN?: string;
}

export interface ApiResponse<T> {
  artists?: Artist[];
  album?: Album[];
  mvids?: MusicVideo[];
  track?: Track[];
}
