exports.databaseFileUpload = async (req, res) => {
    try {
        // fetch File
        const file = req.files.file
        console.log("File = ", file)

        const tempFile = file;
        if (tempFile.name.split(".")[1] != "db") {
            return res.status(500).json({
                success:false,
                message:"File name should be in the format xyz.db"
            })
        }

        let path = __dirname + "\\database\\" + file.name 
        console.log("PATH -> ", path)

        file.mv(path, (error) => {
            console.log(error)
        })
        res.status(200).json({
            success:true,
            message:"Database File Uploaded successfully",
            filename:path
        })

    } catch (error) {
        console.log(error)
    }
}