const functions = require('firebase-functions');
let fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebasse);

exports.sendPushNotification = functions.database.ref('stations/{id}')
.onUpdate(event=>{
    const root = event.data.ref.root

    var messages = []

    //return the main Promise
    return root.child('/users').once('value').then(snapshot=>{
        snapshot.forEach(childSnapshot=>{
            var expoToken = childSnapshot.val().expoToken

            if(expoToken){
                messages.push({
                    "to":expoToken,
                    "body":"New Notification"
                })
            }
        })

        return Promise.all(message)
    }).then(messages => {

        fetch('https://exp.host/--/api/v2/push/send', {

            method: "POST",
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages)
        })
    })

})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
