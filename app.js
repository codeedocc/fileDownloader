import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { upload } from './upload.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCTxwFPHF6ahbTH3EgMS4b8toqmJ072DLE',
  authDomain: 'training-download.firebaseapp.com',
  projectId: 'training-download',
  storageBucket: 'training-download.appspot.com',
  messagingSenderId: '597602799587',
  appId: '1:597602799587:web:5d1df1f6afcb2cdb731ad6',
}

const app = initializeApp(firebaseConfig)

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  loading(smth, blocks) {
    smth.forEach((f, index) => {
      const storage = getStorage()
      const storageRef = ref(storage, `images/${f.name}`)

      const uploadTask = uploadBytesResumable(storageRef, f)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0)
          const block = blocks[index].querySelector('.preview-info-progress')
          block.textContent = progress
          block.style.width = progress + '%'
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log('File available at', url)
          })
        }
      )
    })
  },
})
