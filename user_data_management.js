/**
 * @fileoverview 本ファイルはユーザデータを管理するための関数群です
 */

const SPREAD_SHEET_ID_PROP_KEY = "SPREAD_SHEET_ID";

// ユーザ情報記載シート
const SHEET_NAME = "user_info";

const LINE_ID_COL = 1;
const NAME_COL = 2;
const ROOM_NUMBER_COL = 3;

const START_ROW = 2;

// グローバル変数
var spread_sheet_obj = null;

function get_sheet_obj()
{
    if(!spread_sheet_obj)
    {
        var spread_sheet_id = PropertiesService.
                              getScriptProperties().
                              getProperty(SPREAD_SHEET_ID_PROP_KEY);
        var book = SpreadsheetApp.openById(spread_sheet_id);
        spread_sheet_obj = book.getSheetByName(SHEET_NAME);
    }

    return spread_sheet_obj;
}

/*****************共通関数 *********************/

/**
 * 指定されたパラメータでユーザデータを取得します
 * @param {*} search_col 
 * @param {*} search_val 
 */
function _search_user_info(search_col, search_val)
{
  var row = 0;
  var sheet = get_sheet_obj();

  // 既存のline_id列のデータを取得
  var search_range = sheet.getRange(1, 
                                   search_col, 
                                   sheet.getLastRow()).getValues();

  // 同じline_idが存在するか確認
  for (row = START_ROW - 1; row < search_range.length; row++) {
    if (search_range[row][0] == search_val) {
        // 同じline_idが見つかった場合、その行のデータを取得して返す
        var existingData = sheet.getRange(row + 1, 
                                          LINE_ID_COL, 
                                          1, 
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
    row: row + 1,
    data: null
  }

}

/**
 * 情報を書き込みます
 * @param {*} row 
 * @param {*} line_id 
 * @param {*} name 
 * @param {*} room_number 
 * @returns 
 */
function _write_data(row, 
                     line_id,
                     name,
                     room_number)
{
    var sheet = get_sheet_obj();

    sheet.getRange(row, LINE_ID_COL, 1, 3)
         .setValues([[line_id, name, room_number]]);
    
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
  var search_data = _search_user_info(LINE_ID_COL, line_id) ;
  
  if(search_data.data == null) {
    return _write_data(search_data.row,
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
  var search_data = _search_user_info(LINE_ID_COL, line_id);

  if(search_data.data){
    return _write_data(search_data.row,
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
  var sheet = get_sheet_obj();

  // 既存のline_id列のデータを取得
  var search_range = sheet.getRange(START_ROW, 
                                   LINE_ID_COL, 
                                   sheet.getLastRow() - 1,
                                   ROOM_NUMBER_COL).getValues();

  console.log(search_range);
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
