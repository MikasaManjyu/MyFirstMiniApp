export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  followerCount: number;
  followingCount: number;
}

export interface FarcasterCast {
  hash: string;
  text: string;
  timestamp: string;
  author: FarcasterUser;
  replies: number;
  reactions: number;
  recasts: number;
  embeds?: Array<{
    url?: string;
    castId?: {
      fid: number;
      hash: string;
    };
  }>;
}

export interface TipTransaction {
  id: string;
  castHash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  txHash: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
}