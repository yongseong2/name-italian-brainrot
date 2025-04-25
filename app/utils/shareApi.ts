import { ShareData } from '@/app/utils/types';
import axios from 'axios';

export async function storeShareData(data: ShareData): Promise<string> {
  try {
    const response = await axios.post('/api/share', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.id;
  } catch (error) {
    console.error('Failed to store share data:', error);
    throw error;
  }
}

export async function getShareData(id: string): Promise<ShareData> {
  try {
    const response = await axios.get(`/api/share/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get share data:', error);
    throw error;
  }
}
