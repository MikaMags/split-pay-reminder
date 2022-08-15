/** 
 * Google App Script Template for shared subscription
 *  - sends out email notifications to everyone in the subscription who hasnt paid for the month
 *  - this script is to be attached to a Google Sheet of the template
 *  - best to be paired with an installed trigger that runs every month
 *   
 * @author Mika Mags 2022  
 *         https://github.com/MikaMags/
*/
/*********** CHANGE AND PUT YOUR VALUES HERE  ******************/
const NOTIF_EMAIL_SUBJECT = "Pay this month's subscription" //subject of email to be sent to others 
const REPORT_EMAIL_SUBJECT = "Shared Subscription report" //subject of email to be sent to the owner.
const LAST_ROW = 7 //last relevant row number of users (from 1). by default 7 for 6 people.

/***************************************************************/

var arrUnpaid = []; //emails of people who haven't paid for the month
var arrStatus = ['Paid 💰', 'Paid 💰', 'Paid 💰', 'Paid 💰', 'Paid 💰']; 
      //status of payment from sheet; defaulted to Paid for report
var arrUsers = []; //names of all users to get from sheet

const EMAILS_COL = 15; //col number where the emails are
const firstRow = 3, lastRow = LAST_ROW, //first row of friends
      bossRow = 2, //row of owner of subscription
      firstCol = 2, lastCol = 13; //relevant data. start index 1. 


function main() {

  //initialize active sheet to current year's sheet
  try{
    SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(new Date().getFullYear()));
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  } catch(err) {
    Logger.log(err.message);
    return;
  }

  Logger.log("current active sheet : " + SpreadsheetApp.getActiveSheet().getSheetName()); //debug

  //get current month and relevant col
  const currentMonth = new Date().getMonth(); //as number from 0-11
  
  const monthCol = currentMonth + 2;  //col number of relevant month
  const strMonth = sheet.getRange(1, monthCol).getValue();
  // Logger.log("current month: " + strMonth); //debugging

  arrUsers.push(sheet.getRange(bossRow,1).getValue()); //get owner's name

  //go thru rows of the month and push email if not labeled "Paid"
  for (var row = firstRow; row <= lastRow; row++) {

    var currentVal = sheet.getRange(row, monthCol).getValue(); //get value of relevant cell in row
    var currentEmail = sheet.getRange(row, EMAILS_COL).getValue(); //get email of row 

    // Logger.log(currentEmail + " : " + currentVal); ////debugging

    if (currentVal != 'Paid') {
      arrUnpaid.push(currentEmail);  //push email in arr if not labeled "paid"
      arrStatus[row-3] = 'Not Paid ❌';   //change status for report
    }

    arrUsers.push(sheet.getRange(row,1).getValue()); //get name
  }

  Logger.log("unpaid emails: " + arrUnpaid.length + " out of 5"); //debugging 

  //send out emails to everyone who hasn't paid
  emailNotifs();

  //send report to owner
  emailReport(strMonth, arrStatus, sheet.getRange(bossRow, EMAILS_COL).getValue());

}

/** send out emails to friends */
function emailNotifs() {
  try {
    //create template from html
    const template = HtmlService.createTemplateFromFile('notifEmail');
    template.ownerName = arrUsers[0];
    const htmlBody = template.evaluate().getContent();

    //send emails to arrUnpaid addresses
    for(var i = 0; i<arrUnpaid.length; i++) 
    {
      MailApp.sendEmail(
        arrUnpaid[i],                                         //to
        `${NOTIF_EMAIL_SUBJECT} [automated]`,                   //subject
          //alternate messsage if the html fails to display:
        "Reminder to pay and update the sheet",
        { htmlBody: htmlBody }      //html
      );

      Logger.log(arrUnpaid[i] + " sent"); ///debugging

    }
  Logger.log("emailed reminder emails");

  } catch (err) {
    Logger.log(err.message);
    return;
  }
}

/** sends out report to subscription owner */
function emailReport(currentMonth, arrStatus, email) {
  //create template from html
  const temp = HtmlService.createTemplateFromFile('ReportEmail');

  temp.currentMonth = currentMonth;
  temp.arrStatus = arrStatus;
  temp.users = arrUsers;

  const msg = temp.evaluate().getContent();

  //send email
  try {
    MailApp.sendEmail(
    email,
    // Session.getActiveUser().getEmail(),    //debugging: own email
    `${REPORT_EMAIL_SUBJECT} [automated]`,
    // alternate message if html fails:
    "Payment status info as seen in sheet. relevant reminder emails sent.",
    {htmlBody : msg}
    );

    Logger.log("emailed report");

  }catch (err) {
    Logger.log(err.message);
    return;
  }
}

