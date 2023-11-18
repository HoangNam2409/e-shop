import multer from "multer";

// Thiết lập storage cho Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // Đường dẫn lưu trữ tệp tin tải lên
    },
    filename: function (req, file, cb) {
        // Đặt tên cho tệp tin
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split('.')[0]
        cb(null, filename + "-" + uniqueSuffix + ".png");
    },
});

// Tạo một middleware Multer với storage đã thiết lập
const upload = multer({ storage: storage });
export default upload;
