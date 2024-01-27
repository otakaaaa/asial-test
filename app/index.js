import { input } from "@inquirer/prompts";
import { EmployeeController } from "./controller/employeeController.js";

export class Index {
  constructor() {
    this.MSG1 = '操作を選択して下さい：';
    this.MSG2 = '\nそのコマンドは許されていません。\n';
    this.MSG3 = '\n[N] 名前検索\n[Y] 入社年数\n[Q] システム終了\n';
    this.MSG4 = '検索したい名前を入力して下さい\n例：ハリー\n';
    this.MSG5 = '検索したい年数を入力して下さい\n例：2(半角で入力して下さい。)\n';
    this.emp = new EmployeeController();
  }

  // メイン処理
  async index() {
    const n = ['n', 'N'];
    const y = ['y', 'Y'];
    const q = ['q', 'Q'];
    let cnt = 0;
    let searchW = '';
    let command = await this.askForCommand(this.MSG1 + this.MSG3);
    while (n.includes(command) || y.includes(command) || q.includes(command)) {
      if (cnt > 0) {
        command = await this.askForCommand(this.MSG1 + this.MSG3);
      }
      if (n.includes(command)) {
        searchW = await this.askForCommand(this.MSG4);
        await this.emp.search(searchW, 0);
      } else if (y.includes(command)) {
        searchW = await this.askForCommand(this.MSG5)
        await this.emp.search(searchW, 1);
      } else {
        process.exit();
      }
      cnt++;
    }
  }

  /**
   * メニューを表示します。
   * @param {string} msg メッセージ
   * @returns {string} 入力コマンド
   */
  async askForCommand(msg) {
    const answer = input({
      message: msg
    });
    return answer;
  }
}

const index = new Index();
index.index();