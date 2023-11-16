import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase';
import api from '~/config/axios';

const UploadFile = ({ setProductDetail }) => {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProductDetail((prev) => {
                        return { ...prev, [name]: downloadURL };
                    });
                });
            },
        );
    };

    return (
        <div>
            <div>
                <div className="form">
                    <label className="label__change__image">
                        <input name="images" type="file" defaultValue="" onChange={handleFileChange} />
                        <span>Thay đổi</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
