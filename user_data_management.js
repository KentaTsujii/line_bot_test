/**
 * @fileoverview 本ファイルはユーザデータを管理するための関数群です
 */

// ユーザ情報記載シート
var SHEET_NAME = "user_info";

var LINE_ID_COL = 1;
var NAME_COL = 2;
var ROOM_NUMBER_COL = 3;

var START_ROW = 1;

/*****************共通関数 *********************/

/**
 * 指定されたパラメータで
 * @param {*} sheet 
 * @param {*} search_col 
 * @param {*} search_val 
 */
function _search_user_info(sheet, search_col, search_val)
{
  var row = 0;

  // 既存のline_id列のデータを取得
  var search_range = sheet.getRange(START_ROW, 
                                   search_col, 
                                   sheet.getLastRow()).getValues();

  // 同じline_idが存在するか確認
  for (row = 0; row < search_range.length; i++) {
    if (search_range[row][0] == search_val) {
        // 同じline_idが見つかった場合、その行のデータを取得して返す
        var existingData = sheet.getRange(row + 1, 
                                          LINE_ID_COL, 
                                          START_ROW, 
                                          ROOM_NUMBER_COL).getValues()[0];
        return {
            row: row + 1,
            data: {
                line_id: existingData[0],
                name: existingData[1],
                room_number: existingData[2]
            }
        };
    }
  }

  // 存在しない場合は最終行データだけ返す
  return {
    row: row,
    data: null
  }

}

/**
 * 情報を書き込みます
 * @param {*} sheet 
 * @param {*} row 
 * @param {*} line_id 
 * @param {*} name 
 * @param {*} room_number 
 * @returns 
 */
function _write_data(sheet, 
                     row, 
                     line_id,
                     name,
                     room_number)
{
    sheet.getRange(row, LINE_ID_COL, 1, 3).setValues(data);
    
    // 新しく追加したデータを返す
    return {
        line_id: line_id,
        name: name,
        room_number: room_number
    };
}

/***************** 外部参照関数 ***********/

/**
 * ユーザを作成します。
 * @param {str} line_id ユーザのline_id
 * @param {str} name ユーザ名
 * @param {str} room_number 部屋番号
 */
function create_user(line_id, name, room_number)
{
  // スプレッドシートを開く
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME); 
  var search_data = _search_user_info(sheet, LINE_ID_COL, line_id) ;
  
  if(search_data.row == null) {
    return _write_data(sheet, 
                       search_data.row,
                       line_id,
                       name,
                       room_number);
  }
  else {
    return search_data.data;
  }
}

/**
 * ユーザ情報を更新します
 * @param {*} line_id 
 * @param {*} name 
 * @param {*} room_number 
 */
function update_user_info(line_id, name, room_number)
{
  var sheet = ss.getSheetByName(SHEET_NAME);
  var search_data = _search_user_info(sheet, LINE_ID_COL, line_id);

  if(search_data.data){
    return _write_data(sheet, 
                       search_data.row,
                       line_id,
                       name,
                       room_number)
  }

  return null;
}

/**
 * 全ユーザの情報を取得します
 */
function get_all_user_info()
{
    
}

/**
 * ユーザIDからユーザ情報を取得します。
 * @param {*} line_id 
 */
function get_user_from_line_id(line_id)
{

}

/**
 * ユーザ名からユーザ情報を取得します。
 * @param {*} user_name 
 */
function get_user_from_user_name(user_name)
{

}
