import { ShareData } from '@/app/services/types';
import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

export async function storeShareData(data: ShareData): Promise<string> {
  try {
    const baseUrl = getBaseUrl();
    const response = await axios.post(`${baseUrl}/api/share`, data, {
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
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/share/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get share data:', error);
    throw error;
  }
}
