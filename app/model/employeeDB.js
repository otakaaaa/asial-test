import * as dotenv from 'dotenv'
import { createConnection } from 'mysql2/promise';

export class EmployeeDB {
  constructor() {
    dotenv.config();
    this.dbConnect();
  }

  /**
   * DB接続します。
   */
  async dbConnect() {
    this.dbClient = null;
    this.dbSetting = {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }
    try {
      if (this.dbClient == null) {
        this.dbClient = await createConnection(this.dbSetting);
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * [employee.tbl_syain]従業員情報検索
   * @param {string} searchW 検索ワード
   */
  async searchNameByTblSyain(searchW) {
    let d = ['%' + searchW + '%'];
    const sql = `
      SELECT e.id, e.name, e.nyusya_ymd, m.role_name
      FROM tbl_syain AS e
      LEFT JOIN m_role AS m
        ON e.role_id = m.id
      WHERE e.name LIKE ?
    `;

    const [rows, fields] = await this.dbClient.execute(sql, d);
    return rows;
  }

  async searchNyusyaYearByTblSyain(searchY) {
    searchY = parseInt(searchY, 10);
    let today = new Date();
    let condition = (today.getFullYear() - searchY) + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let d = [condition];
    const sql = `
      SELECT e.id, e.name, e.nyusya_ymd, m.role_name
      FROM tbl_syain AS e
      LEFT JOIN m_role AS m
        ON e.role_id = m.id
      WHERE e.nyusya_ymd < ?
    `;
    const [rows, fields] = await this.dbClient.execute(sql, d);
    return rows;
  }
}