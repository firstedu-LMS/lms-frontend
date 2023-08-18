const filePath = { 
    imagePath : (filename)=> {
        return `http://localhost:8000/storage/${filename}`
    },
    cvPath : (cvname) => {
        return `http://localhost:8000/storage/${cvname}`
    },
    videoPath : (videoName) => {
        return `http://localhost:8000/storage/${videoName}`
    }
}
export default filePath