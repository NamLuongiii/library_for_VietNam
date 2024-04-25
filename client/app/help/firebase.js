import { uuidv4 } from "@firebase/util";
import { initializeApp } from "firebase/app";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { stringToReadbleUrl } from "./uitilies";

const firebaseConfig = {
    apiKey: "AIzaSyBd-TdmJWmjBV8DcsE9y14eBwj62hU__wk",
    authDomain: "vlibrary-6c105.firebaseapp.com",
    projectId: "vlibrary-6c105",
    storageBucket: "vlibrary-6c105.appspot.com",
    messagingSenderId: "855567949677",
    appId: "1:855567949677:web:cb963a3d55114c754d0464"
};

const app = initializeApp(firebaseConfig);

const FILE_FOLDER = "files"
const IMAGE_FOLDER = "images"
export async function uploadSingleImage(file) {
    const storage = getStorage();

    const metadata = {
        contentType: 'image/*'
    };

    const storageRef = ref(storage, buildImageUrl(file));
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

export async function bookDocumentsUpoad(files) {
    // let fail = false
    // for (let i = 0; i < files.length; i++) {
    //     const is_e = await checkFileExsit(files[i])
    //     if (is_e) {
    //         console.log(`File is invalid because already exsit`);
    //         fail = true
    //     } 
    // }   
    // if (fail)
    //     throw Error("Upload files fail")

    const tasks = []
    files.forEach(file => {
        tasks.push(uploadSingleFile(file))
    })

    return Promise.all(tasks)
}

async function uploadSingleFile(file) {
    const storage = getStorage();

    const metadata = {
        contentType: file.type,
    };

    
    const storageRef = ref(storage, buildFileUrl(file));
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
                        error.message = "Duplicate file name"
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

async function checkFileExsit(file) {
    const storage = getStorage()
    const fileRef = ref(storage, FILE_FOLDER + file.name)

    getDownloadURL(fileRef)
    .then(url => {
      return Promise.resolve(true);
    })
    .catch(error => {
      if (error.code === 'storage/object-not-found') {
        return Promise.resolve(false);
      } else {
        return Promise.reject(error);
      }
    });
}

function buildFileUrl(file) {
    const randomId = uuidv4()
    return `${FILE_FOLDER}/${randomId}_${stringToReadbleUrl(file.name)}`
}

function buildImageUrl(file) {
    const randomId = uuidv4()
    return `${IMAGE_FOLDER}/${randomId}_${stringToReadbleUrl(file.name)}`
}