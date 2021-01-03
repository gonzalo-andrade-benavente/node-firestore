const Firestore = require('@google-cloud/firestore');
const admin = require('firebase-admin');
require('dotenv').config();

const db = new Firestore({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEY_FILENAME
});

const product = require('./resources/6403641.json');

const createDocRef = async () => {

    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

}

const createDocProd = async (prd) => {
    /*
    const res = await db.collection('products').add({
        name: 'Lenovo T450',
        country: 'Japan',
        price: 29990.0,
        sku: '880123678',
        timestamp: Date.now()
    });
    */
    const res = await db.collection('products').add(prd);
    console.log('Added document with ID: ', res.id);
}

const updateProd = async (document) => {

    const skuUnion = await document.update({
        attributes: admin.firestore.FieldValue.arrayUnion({
            id: 'blableblibloblu',
            value: 'Valor de prueba'
        })
    });

}

const findDocProd = async (sku) => {

    const productsRef = db.collection('products');
    const snapshot = await productsRef.where('sku', '==', sku).get();
    
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }

    snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data());
        let skuRef = db.collection('products').doc(doc.id);  
        updateProd(skuRef);
    });

    console.log('Doc updated');


}

console.log('Hello NodeJs-Example with GCP and Cloud Firestore');
//createDocProd(product);
findDocProd('6403641');


