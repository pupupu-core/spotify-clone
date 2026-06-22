export type AccountRole = 'USER' | 'CREATOR' | 'ADMIN';
export type AccountStatus = 'ACTIVE' | 'DELETED' | 'BANNED';
export type AccountCreatorStatus = 'ACTIVE' | 'SUSPENDED' | 'REVOKED';

export interface AccountMeResponse {
  id: string;
  role: AccountRole;
  status: AccountStatus;
  profile: AccountMeProfile | null;
  creatorProfile: AccountMeCreatorProfile | null;
}

export interface AccountMeProfile {
  id: string;
  handle: string | null;
  displayName: string | null;
  email: string | null;
  country: string | null;
  city: string | null;
  avatarUrl: string | null;
}

export interface AccountMeCreatorProfile {
  id: string;
  status: AccountCreatorStatus;
  artistName: string | null;
  description: string | null;
}
