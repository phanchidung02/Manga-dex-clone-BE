import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { MangaDexService } from 'src/services/mangadex/mangadex.service';
import * as qs from 'qs';

@Injectable()
export class AuthService {
  constructor(private readonly mangadexService: MangaDexService) {}

  async authentication(body: Record<string, string>) {
    const payload = qs.stringify({
      grant_type: 'password',
      username: body.username,
      password: body.password,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });

    try {
      // Gửi yêu cầu tới API của MangaDex
      const response = await axios.post(
        'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      // Kiểm tra xác thực
      const checkAuthData = await this.mangadexService.checkAuth(
        response.data.access_token,
      );

      const responseData = {
        ...response.data, // Giữ nguyên các trường cũ
        isAuthenticated: checkAuthData?.isAuthenticated,
      };

      return responseData;
    } catch (error) {
      console.log(error);
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        const err = error as any;
        const errMsg = err.response.data.error_description;
        throw new HttpException(
          errMsg || 'Failed to login',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async checkAuthen(userToken: string) {
    try {
      const res = await this.mangadexService.checkAuth(userToken);
      return res;
    } catch (err) {
      console.log(err);
      if (err.response.status === HttpStatus.UNAUTHORIZED) {
        const error = err as any;
        const errMsg = error.response.data.error_description;
        throw new HttpException(
          errMsg || 'Failed to check authen',
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async refreshToken(body: Record<string, string>) {
    const { refresh_token } = body;
    const payload = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });

    try {
      // Gửi yêu cầu tới API của MangaDex
      const response = await axios.post(
        'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
        payload,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
