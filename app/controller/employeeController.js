import { RedisClient } from '../model/redisClient.js'
import { EmployeeDB } from '../model/employeeDB.js';

export class EmployeeController {
  constructor() {
    this.emp = new EmployeeDB;
    this.redis = new RedisClient;
  }

  /**
   * 検索
   * @param {string} searchW 検索ワード
   * @param {number} mode    モード(0:名前検索、1:入社年数検索)
   */
  async search (searchW, mode) {
    if (searchW == '' || searchW == '%') {
      return console.log('空または%で検索できません。\n');
    }

    let result = [];
    let searchResult = await this.redis.getList(searchW);
    let existKey = await this.redis.existKey(searchW);
    // キーが存在したらredis、存在しなかったらDBから取得する。
    if (existKey) {
      result = searchResult;
    } else {
      searchResult = mode ? await this.emp.searchNyusyaYearByTblSyain(searchW)
                          : await this.emp.searchNameByTblSyain(searchW);
      searchResult.forEach((e, i) => {
        let syainData = e.id + '\t' + e.name + '\t' + e.nyusya_ymd.toLocaleString() + '\t' + e.role_name;
        result.push(syainData);
        this.redis.listPush(searchW, syainData);
      });
    }

    // 検索結果を表示。
    console.log('\nid\t名前\t入社年月日\t役職');
    result.forEach((e, i) => {
      console.log(e);
    });
    console.log("\n");
  }
}