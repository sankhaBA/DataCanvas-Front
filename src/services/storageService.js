import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from './../firebase';

export const firebaseImageUpload = (file, folderName, fileName, setUploadPercentage = () => { }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storage = getStorage(app);

            const storageRef = ref(storage, `/${folderName}/` + fileName + '.jpg');
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadPercentage(progress);
                },
                (error) => {
                    console.error('Error uploading image: ', error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        } catch (error) {
            console.error('Error uploading image: ', error);
            reject(error);
        }
    });
};

export const firebaseImageDelete = (imageUrl, folderName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storage = getStorage(app);

            const fileName = imageUrl.split('%2F')[1].split('?')[0];

            const storageRef = ref(storage, `/${folderName}/` + fileName);

            deleteObject(storageRef).then(() => {
                resolve();
            }).catch((error) => {
                console.error('Error deleting image: ', error);
                reject(error);
            });
        } catch (error) {
            console.error('Error uploading image: ', error);
            reject(error);
        }
    });
};

