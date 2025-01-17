import { FactoryProvider } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { MANGA_DEX_PROVIDER } from './types/mangadex.type';
import { MANGADEX_BASE_URL } from 'src/environment';

export const MangadexProvider: FactoryProvider<AxiosInstance> = {
  provide: MANGA_DEX_PROVIDER,
  useFactory: async () => {
    const instance = axios.create({
      baseURL: MANGADEX_BASE_URL,
      timeout: 10000,
    });
    instance.interceptors.response.use(
      (response) => {
        // Return the response data if successful
        return response;
      },
      (error) => {
        // Log the error details
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error(
            `[MANGADEX] - ${error.request.path} `,
            error.response.data,
          );
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }

        return Promise.reject(error);
      },
    );

    return instance;
  },
};
