import { FarcasterCast, FarcasterUser } from '../types/farcaster';

// BaseDeveloper API configuration
const BASE_DEVELOPER_API_KEY = import.meta.env.VITE_BASE_DEVELOPER_API_KEY;
const BASE_API_URL = '/api/v1';

export class FarcasterService {
  static async getTrendingCasts(limit = 25): Promise<FarcasterCast[]> {
    // If no API key is configured, use mock data
    if (!BASE_DEVELOPER_API_KEY || 
        BASE_DEVELOPER_API_KEY === 'your_base_developer_api_key_here' || 
        BASE_DEVELOPER_API_KEY === 'bnMscCac7AGZNIg5sD2ulI3CWEpGS8EC') {
      console.log('Using mock data - add your BaseDeveloper API key to .env file');
      return this.getMockCasts();
    }

    try {
      // Using BaseDeveloper API for Farcaster data
      const response = await fetch(`${BASE_API_URL}/farcaster/casts/trending?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${BASE_DEVELOPER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        // Fallback to mock data for development if API fails
        return this.getMockCasts();
      }
      
      const data = await response.json();
      return this.transformCasts(data.casts || []);
    } catch (error) {
      console.error('Error fetching trending casts:', error);
      return this.getMockCasts();
    }
  }

  static async searchCasts(query: string, limit = 25): Promise<FarcasterCast[]> {
    // If no API key is configured, use mock data
    if (!BASE_DEVELOPER_API_KEY || 
        BASE_DEVELOPER_API_KEY === 'your_base_developer_api_key_here' || 
        BASE_DEVELOPER_API_KEY === 'bnMscCac7AGZNIg5sD2ulI3CWEpGS8EC') {
      return this.getMockSearchResults(query);
    }

    try {
      const response = await fetch(`${BASE_API_URL}/farcaster/casts/search?q=${encodeURIComponent(query)}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${BASE_DEVELOPER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        return this.getMockSearchResults(query);
      }
      
      const data = await response.json();
      return this.transformCasts(data.casts || []);
    } catch (error) {
      console.error('Error searching casts:', error);
      return this.getMockSearchResults(query);
    }
  }

  static async getCastByHash(hash: string): Promise<FarcasterCast | null> {
    try {
      const response = await fetch(`${BASE_API_URL}/farcaster/casts/${hash}`, {
        headers: {
          'Authorization': `Bearer ${BASE_DEVELOPER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return this.transformCast(data.cast);
    } catch (error) {
      console.error('Error fetching cast:', error);
      return null;
    }
  }

  static async getUserByFid(fid: number): Promise<FarcasterUser | null> {
    try {
      const response = await fetch(`${BASE_API_URL}/farcaster/users/${fid}`, {
        headers: {
          'Authorization': `Bearer ${BASE_DEVELOPER_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return this.transformUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Transform API response to our internal types
  private static transformCasts(apiCasts: any[]): FarcasterCast[] {
    return apiCasts.map(cast => this.transformCast(cast));
  }

  private static transformCast(apiCast: any): FarcasterCast {
    return {
      hash: apiCast.hash || apiCast.id,
      text: apiCast.text || apiCast.content,
      timestamp: apiCast.timestamp || apiCast.created_at,
      author: this.transformUser(apiCast.author || apiCast.user),
      replies: apiCast.replies || apiCast.reply_count || 0,
      reactions: apiCast.reactions || apiCast.like_count || 0,
      recasts: apiCast.recasts || apiCast.recast_count || 0,
      embeds: apiCast.embeds || []
    };
  }

  private static transformUser(apiUser: any): FarcasterUser {
    return {
      fid: apiUser.fid || apiUser.id,
      username: apiUser.username || apiUser.handle,
      displayName: apiUser.displayName || apiUser.display_name || apiUser.name,
      pfpUrl: apiUser.pfpUrl || apiUser.pfp_url || apiUser.avatar_url || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      followerCount: apiUser.followerCount || apiUser.follower_count || 0,
      followingCount: apiUser.followingCount || apiUser.following_count || 0
    };
  }

  // Mock data for development/fallback
  private static getMockCasts(): FarcasterCast[] {
    return [
      {
        hash: '0x1234567890abcdef',
        text: 'Just deployed my first smart contract on Base! The gas fees are incredibly low compared to mainnet. Building on Base feels like the future of onchain apps. 🚀',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author: {
          fid: 1,
          username: 'basebuilder',
          displayName: 'Base Builder',
          pfpUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          followerCount: 1250,
          followingCount: 340
        },
        replies: 23,
        reactions: 156,
        recasts: 45,
        embeds: []
      },
      {
        hash: '0xabcdef1234567890',
        text: 'The Base ecosystem is growing so fast! Love seeing all the new dApps launching. The developer experience is smooth and the community is amazing. Who else is building on Base?',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        author: {
          fid: 2,
          username: 'cryptodev',
          displayName: 'Crypto Developer',
          pfpUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          followerCount: 890,
          followingCount: 567
        },
        replies: 34,
        reactions: 203,
        recasts: 67,
        embeds: []
      },
      {
        hash: '0x567890abcdef1234',
        text: 'Tipping creators should be as easy as liking a post. Imagine if every great cast could earn its creator some ETH instantly. That would change everything about content creation incentives.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        author: {
          fid: 3,
          username: 'web3creator',
          displayName: 'Web3 Creator',
          pfpUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          followerCount: 2340,
          followingCount: 123
        },
        replies: 45,
        reactions: 312,
        recasts: 89,
        embeds: []
      }
    ];
  }

  private static getMockSearchResults(query: string): FarcasterCast[] {
    const mockCasts = this.getMockCasts();
    return mockCasts.filter(cast => 
      cast.text.toLowerCase().includes(query.toLowerCase()) ||
      cast.author.displayName.toLowerCase().includes(query.toLowerCase()) ||
      cast.author.username.toLowerCase().includes(query.toLowerCase())
    );
  }
}