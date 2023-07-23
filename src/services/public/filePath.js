const filePath = { 
    imagePath : (filename)=> {
        return `http://localhost:8000/storage/${filename}`
    }
}
export default filePath