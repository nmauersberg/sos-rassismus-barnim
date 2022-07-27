import * as functions from 'firebase-functions';
import firestore from '@google-cloud/firestore';

const client = new firestore.v1.FirestoreAdminClient();

function backupFirestore() {
  const projectId = 'sos-rassismus-barnim';
  const databaseName = client.databasePath(projectId, '(default)');

  return client
    .exportDocuments({
      name: databaseName,
      // Add your bucket name here
      outputUriPrefix: 'gs://sos-rassismus-firestore-backup',
      // Empty array == all collections
      collectionIds: [],
    })
    .then(([response]) => {
      console.log(`Operation Name: ${response.name}`);
      return response;
    })
    .catch((err: any) => {
      console.error(err);
      throw new Error('Export operation failed');
    });
}

// Schedule the automated backup
exports.backupFirestore = functions
  .region('europe-west1')
  .pubsub.schedule('every 24 hours')
  .onRun(backupFirestore);
