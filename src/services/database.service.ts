import { getConnection } from 'typeorm';

export class DbService {
  static getDatabaseType() {
    const connection = getConnection();
    return connection.options.type;
  }
}
