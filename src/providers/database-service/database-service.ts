import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  constructor(private sqlite: SQLite) { }
  getDB(): Promise<any> {
    return this.sqlite.create({
      name: 'myData.db', location: 'default'
    })
  }

  baseExecuteSql(sql: string, params: any) {
    this.getDB().then(function (db: SQLiteObject) {
      db.executeSql(sql, params);
    });

  }

  baseTransaction(sqls) {
    let thisService = this;
    this.getDB().then(function (db: SQLiteObject) {
      db.sqlBatch(sqls);
    });
  }

  createTable() {
    this.baseExecuteSql("create table a(id integer PRIMARY KEY AUTOINCREMENT,col  TEXT,colT TEXT )", "");
  }

  insertList(params: Array<any>) {
    let sql: string = "insert INTO a (col,colT) values (?,?)";
    let myList = [];
    params.forEach(item => {
      let dto: Array<any> = [];
      dto.push(sql);
      dto.push(item);
      console.info(dto);
      myList.push(dto);
    });
    this.baseTransaction(myList);
  }
  
}