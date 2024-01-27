import Redis from 'ioredis';

export class RedisClient {
  constructor() {
    this.redis = new Redis({
      port: 6379,
      host: 'redis',
    })
  }

  /**
   * Redis にキーと値を設定する。
   * 既に重複したキーが存在する場合は、上書きする。
   *
   * @param key キー
   * @param value 値
   */
  async set(key, value) {
    await this.redis.set(key, value);
  }

  /**
   * 指定したキーを削除する。
   *
   * @param key 削除対象のキー
   * @returns 削除できた場合は 1, できなかった場合は 0
   */
  async delete(key) {
    return await this.redis.del(key);
  }

  /**
   * Redis からキーに紐づく値を取得する。
   * キーが存在しない場合は、null を返す。
   *
   * @param key 取得対象のキー
   */
  async get(key) {
    return await this.redis.get(key);
  }

  /**
   * Redis へのコネクションを切断する。
   */
  async quit() {
    await this.redis.quit();
  }

  /**
   * list型を追加する。
   *
   * @param key キー
   * @param value 値
   */
  async listPush(key, value) {
    await this.redis.rpush(key, value);
  }

  /**
   * list型の値を取得する。
   *
   * @param key キー
   * @param start 開始位置
   * @param end 終了位置
   */
  async getList(key, start = 0, end = -1) {
    return await this.redis.lrange(key, start, end);
  }

  /**
   * すべてのキーを削除する。
   */
  async flushall() {
    await this.redis.flushall();
  }

  /**
   * キーの存在をチェックする。
   * @param key キー
   */
  async existKey(key) {
    return await this.redis.exists(key);
  }
}