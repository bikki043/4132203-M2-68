const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.sendNotification = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const { token, title, body } = req.body;
            
            if (!token || !title || !body) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            
            const message = {
                notification: {
                    title: title,
                    body: body
                },
                token: token
            };
            
            const response = await admin.messaging().send(message);
            
            // Log to Firestore
            await admin.firestore().collection('notifications').add({
                title: title,
                body: body,
                token: token,
                sentAt: admin.firestore.FieldValue.serverTimestamp(),
                messageId: response
            });
            
            res.json({ success: true, messageId: response });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    });
});

exports.sendToAll = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const { title, body } = req.body;
            
            if (!title || !body) {
                return res.status(400).json({ error: 'Missing title or body' });
            }
            
            // Get all tokens
            const tokensSnapshot = await admin.firestore().collection('tokens').get();
            const tokens = tokensSnapshot.docs.map(doc => doc.data().token);
            
            if (tokens.length === 0) {
                return res.json({ success: true, sent: 0 });
            }
            
            // Send to all
            const message = {
                notification: { title, body },
                tokens: tokens
            };
            
            const response = await admin.messaging().sendMulticast(message);
            
            // Log
            await admin.firestore().collection('broadcast-logs').add({
                title: title,
                body: body,
                recipientCount: response.successCount,
                sentAt: admin.firestore.FieldValue.serverTimestamp()
            });
            
            res.json({ 
                success: true, 
                sent: response.successCount,
                failed: response.failureCount
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    });
});
