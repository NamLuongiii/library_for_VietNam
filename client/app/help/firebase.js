import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBd-TdmJWmjBV8DcsE9y14eBwj62hU__wk",
    authDomain: "vlibrary-6c105.firebaseapp.com",
    projectId: "vlibrary-6c105",
    storageBucket: "vlibrary-6c105.appspot.com",
    messagingSenderId: "855567949677",
    appId: "1:855567949677:web:cb963a3d55114c754d0464"
};

const app = initializeApp(firebaseConfig);

export async function uploadSingleImage(file) {
    const storage = getStorage();

    const metadata = {
        contentType: 'image/*'
    };

    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        error.message = "Duplicate image name"
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }

                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}
