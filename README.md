
# Automated Reminders for Split Subscriptions: A Simple Template

Spliting a subscription with friends? Keep track of payments and send automated email reminders via a simple and easy Google sheet template and a Google Apps Script. 

Just fill in the sheet template and copy the js & html into its Apps Scripts.


## Features
- :heavy_check_mark: Simple, ready to use Google Sheet template
- :heavy_check_mark: Calculates total payments
- :heavy_check_mark: Ready to run Google Apps script
- :heavy_check_mark: HTML template for emails
- :heavy_check_mark: Sends out reminder emails to other members
- :heavy_check_mark: Sends payment status report email to owner 

<img src="/images/sheetdemo.png" width="80%">
<img src="/images/notifEmail.png" width="60%">
<img src="/images/reportEmail.png" width="60%">

## Setup & Installation

1. Download the xlsx file and upload to your Google Drive.
2. Fill in the Google Sheet template.
3. **File > Save as Google Sheets**. This will copy the xlsx into a Google sheet file so that you can use a Google Apps Script with it.
4. **Extensions > Google Apps Script** to start installing the scripts.
<img src="/images/googleappsscript.png" width="30%">

### Adding the script files
1. Paste all of *notifyPeople.js* into Code.gs
2. Hit `+` and add a new HTML file. Name it notifyEmail and paste all of *notifyEmail.html*. Do the same for *ReportEmail.html*.
3. Before this script runs properly, it needs to be authenticated. Click `run` and you'll see a pop up to authenticate & `review permissions`.
4. This window like below will appear (yes, this is [perfectly normal](https://xfanatical.com/blog/how-to-add-an-apps-script-to-my-google-doc-sheets-forms-slides/#step-4-run-the-script-now)). This is to authorize the apps script to access the sheet when running it for the first time. Choose an account & click **allow**. Click on **show advanced** & **Go to [your project title]**.

<img src="/images/authentication.jpg" width="40%">


### Adding automation with Triggers
In the Apps Script page of your script,
1. Click on `Triggers` on the left toolbar menu.
2. `+ Add Trigger` on the bottom right.
3. Fill the form like below. Set the non-highlighted ones to your requirements.

<img src="/images/triggerset.png" width="40%">

### Some things you can customize
- Things under the `EDIT` comments can be customized to your liking.
- Links to the sheet can be inserted in the html of the emails.
## Feedback

If you found this helpful, please consider giving this a :star: on Github and share it with your friends :hearts:

If you have any feedback, please reach out at mmagsmbol@gmail.com

Thank you <3

