
/*
 * Twilio
 */
  var twilioconfig = require('../../config/local/twilio');
exports.twilio = function(req, res){
 var body = req.query.Body;
  var currentTasks = getOpenTasks(req.query.From); /* potentially make a call if we move dataapi */
  var returnmsg = '';
  var multitask = true;
  console.log(req.query.From + ' says ' + body);
  switch(body) {
    case '1': /* logic to find out if user has multiple open challenges */
      if (multitask) {
        returnmsg = 'You currently have multiple tasks running. Prefix your response with Task # {listoftasks}'
        break;
      }
      returnmsg = 'Great! I have updated your goal for today. Only {numdaysleft} to go!';
      break;
    case '2': /* logic to find out if user has multiple open challenges */
      returnmsg = 'Get on it! Another reminder will be sent 2 hours.';
      break;
    case '3': /* logic to find out if user has multiple open challenges */
      returnmsg = 'Boo! This has set you back 3 days, you now have {numdaysleft} to go!';
      break;
    case 'stop':
      returnmsg = 'Unsubscribe?? *not currently working*'
      break;
    case 'challenges':
      for (task in currentTasks) {
        returnmsg += '(' + currentTasks[task][0] + ') - ' + currentTasks[task][1] + '\n';
      }
      break;
    case 'commands':
      /* logic to find out if user has multiple open challenges */
      returnmsg = '(1) - Complete challenge for today\n(2) - Get reminder in 2 hours for your task\n(3) - Did not complete task today\n(challenges) - List of challenges and short-versions\n(commands) - This list of commands\n(stop)Stop receiving these messages';
      break;
    default:
      firstChar = body.charAt( 0 );
      lastChar = body.charAt( body.length - 1 );
      currentTaskShort = _.pluck(currentTasks,0);
      possibleOptions = ['1','2','3']
      if (body.length == 2 && _.indexOf(currentTaskShort,firstChar) != -1 && _.indexOf(possibleOptions,lastChar) != -1) { //only if 2 chars long
        switch (lastChar) {
          case '1': /* logic to find out if user has multiple open challenges */
            returnmsg = 'Great! I have updated your goal for today. Only {numdaysleft} to go!';
            break;
          case '2': /* logic to find out if user has multiple open challenges */
            returnmsg = 'Get on it! Another reminder will be sent 2 hours.';
            break;
          case '3': /* logic to find out if user has multiple open challenges */
            returnmsg = 'Boo! This has set you back 3 days, you now have {numdaysleft} to go!';
            break;
          default:
            returnmsg = 'You have found a hole in the matrix. Run now';
        }
      } else {
        returnmsg = 'I did not understand your response. Use (commands) for a list of all commands';
      }
  }

  res.contentType('application/xml');

  res.write('<?xml version="1.0" encoding="UTF-8"?>');
  res.write('<Response><Sms>' + returnmsg + '</Sms></Response>');
  res.end();
};

exports.twiliosend = function(req, res) {

  var TwilioClient = require('twilio').Client,
      Twiml = require('twilio').Twiml,
      sys = require('sys');
  var client = new TwilioClient(twilioconfig.accountsid, twilioconfig.authtoken,twilioconfig.hostname);
  var phone = client.getPhoneNumber(twilioconfig.mynumber);
  var notifyList = getEndorsersToNotify();
  for (user in notifyList) { //[challenge name, participant name, endorser name, endorser phone number, amount] 
    var endorserphone = notifyList[user][3];
    var endorsername = notifyList[user][2];
    var taskname = notifyList[user][0];
    var multitask = true; //make dynamic 
    var taskuser = notifyList[user][1];
    var endorseramount = notifyList[user][4];
    var url = 'http://bit.ly/a34ch';
    var usermsg = 'Awesome! Your friend ' + taskuser + ' completed his task ' + taskname + ' that you pledged ' + endorseramount + ' for! Please go to ' + url + ' and pay up!';
    phone.sendSms(endorserphone, usermsg, null, function(sms) {
        sms.on('processed', function(reqParams, response) {
          console.log('Message processed, request params follow');
          console.log(reqParams);
        });
    });
    res.write('sent to ' + endorsername + ' :: ' + usermsg);
  }
  res.end();
};

exports.twiliosendreminder = function(req, res) {
  var notifyList = getChallengesForNotifications();
  var TwilioClient = require('twilio').Client,
      Twiml = require('twilio').Twiml,
      sys = require('sys');
  var client = new TwilioClient(twilioconfig.accountsid, twilioconfig.authtoken,twilioconfig.hostname);
  var phone = client.getPhoneNumber(twilioconfig.mynumber);
  for (user in notifyList) { // [challenge name, challenge shortkey, name, phone number]
    var remindphone = notifyList[user][3];
    var remindname = notifyList[user][2];
    var taskname = notifyList[user][0];
    var multitask = true; //make dynamic 
    var taskchar = notifyList[user][1];
    var spacer = '';
    var yesmsg = '1';
    var notyetmsg = '2';
    var nomsg = '3';
    if (multitask) {
      yesmsg = taskchar + spacer + yesmsg;
      nomsg = taskchar + spacer + nomsg;
      notyetmsg = taskchar + spacer + notyetmsg;
    }
    var remindmsg = 'Hey ' + remindname + ', Did you ' + taskname + ' today?\n"' + yesmsg + '" for yes\n"' + notyetmsg + '" for not yet (reminder in 2hours)\n"' + nomsg + '" for no :[';
    phone.sendSms(remindphone, remindmsg, null, function(sms) {
        sms.on('processed', function(reqParams, response) {
          console.log('Message processed, request params follow');
          console.log(reqParams);
        });
    });
    res.write('sent reminder to ' + remindphone + ' : ' + remindmsg);
  }
  res.end();
};

/* helper dao functions [no dao yet]*/

function getOpenTasks(phonenumber) {
  return [['A','run a mile every day'],['B','stop smoking'],['C','only 1 soft drink a day'],['D','do not eat fish']];
}

function getChallengesForNotifications() { 
   /* return a list of all [challenge name, challenge shortkey, name, phone number]  that should get a notification */
   return [
    ['run a mile every day', 'A', 'Mark', '6782301030']
   ];
}

function getEndorsersToNotify() { 
   /* return a list of all [challenge name, participant name, endorser name, endorser phone number, amount]  that should get a notification */
   return [
    ['run a mile every day', 'Mark', 'Jack', '6782301030','$10'],
    ['run a mile every day', 'Mark', 'Brett', '6782301030','$100']
   ];
}