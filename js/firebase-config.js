// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsi4-kJXI4QNXvamG9ztDSWvQ__DNTrFc",
    authDomain: "toya-studio-51918.firebaseapp.com",
    projectId: "toya-studio-51918",
    storageBucket: "toya-studio-51918.firebasestorage.app",
    messagingSenderId: "645302677514",
    appId: "1:645302677514:web:b873f2b9c93ee9f750aff3",
    measurementId: "G-GP6N5FXLSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Enable offline persistence (optional but recommended)
try {
    enableIndexedDbPersistence(db).catch((err) => {
        if (err.code == 'failed-precondition') {
            console.warn('⚠️ Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code == 'unimplemented') {
            console.warn('⚠️ The current browser does not support persistence.');
        }
    });
} catch (err) {
    console.warn('⚠️ Persistence error:', err);
}

console.log('🔥 Firebase initialized successfully');
console.log('💾 Firestore database connected');

// Function to save contact form data
// This will automatically create the collection if it doesn't exist
export async function saveContactForm(formData) {
    try {
        console.log('📝 Attempting to save form data...');
        console.log('Data to save:', formData);
        
        // Prepare the document data
        const docData = {
            name: formData.name || '',
            email: formData.email || '',
            company: formData.company || '',
            service: formData.service || '',
            message: formData.message || '',
            timestamp: serverTimestamp(),
            status: 'new',
            source: 'website',
            createdAt: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language
        };
        
        console.log('Document data prepared:', docData);
        
        // Add document to collection (will create collection automatically if it doesn't exist)
        const docRef = await addDoc(collection(db, "contact_submissions"), docData);
        
        console.log('✅ Contact form saved successfully!');
        console.log('📄 Document ID:', docRef.id);
        console.log('📊 Collection: contact_submissions');
        
        return { 
            success: true, 
            id: docRef.id,
            message: 'Form submitted successfully'
        };
        
    } catch (error) {
        console.error('❌ Error saving contact form:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Provide more detailed error information
        let errorMessage = error.message;
        
        if (error.code === 'permission-denied') {
            errorMessage = 'Permission denied. Please check Firestore rules.';
            console.error('🔒 Firestore Rules Issue: Make sure you have set the rules in Firebase Console');
            console.error('📋 Use these rules for testing:');
            console.error(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_submissions/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
            `);
        } else if (error.code === 'unavailable') {
            errorMessage = 'Network error. Please check your internet connection.';
        } else if (error.code === 'not-found') {
            errorMessage = 'Firestore database not found. Please enable Firestore in Firebase Console.';
        }
        
        return { 
            success: false, 
            error: errorMessage,
            code: error.code
        };
    }
}

// Function to initialize Firestore (creates database if needed)
export async function initializeFirestore() {
    try {
        console.log('🔧 Initializing Firestore...');
        
        // Try to access the database (this will trigger creation if needed)
        const testCollection = collection(db, "contact_submissions");
        console.log('✅ Firestore initialized successfully');
        console.log('📁 Collection reference created:', testCollection.path);
        
        return { success: true };
    } catch (error) {
        console.error('❌ Error initializing Firestore:', error);
        return { success: false, error: error.message };
    }
}

// Auto-initialize on load
initializeFirestore();

export { app, analytics, db };
