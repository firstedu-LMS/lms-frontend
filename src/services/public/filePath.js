const filePath = { 
    imagePath : (filename)=> {
        return `http://localhost:8000/storage/${filename}`
    },
    cvPath : (cvname) => {
        return `http://localhost:8000/storage/${cvname}`
    },
    videoPath : (videoName) => {
        return `http://localhost:8000/storage/${videoName}`
    },
    changeFileBase : async (file) => {
        return new Promise((res) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                res(reader.result)
            });
        })

    }
}
export default filePath