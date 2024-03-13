// import thư viện
const express = require('express');
const mongoose = require('mongoose');
//tao doi tuong moi cho express
const app = express();
// ket noi voi csdl mongodb
mongoose.connect('mongodb+srv://daihgph36944:hgd15022k4@lab2.5aesvta.mongodb.net/?retryWrites=true&w=majority&appName=Lab2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Ket noi thanh cong voi mongodb");
}).catch((err) => {
    console.error("Loi: ", err);
});
// truy van csdl
// chon csdl de thao tac
const db1 = mongoose.connection.useDb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema = new mongoose.Schema({
    masv: String,
    tensv: String
});
//anh xa model vao bang du lieu
const SinhVien = db1.model('sinhvien', SinhVienSchema);
//tao linh de trieu goi tren trinh duyet (API)
app.get('/', async (req, res) => {
    try {
        const sinhvien = await SinhVien.find(); //doc du lieu tu bang sinh vien
        if (sinhvien.length > 0) {//neu nhu co ton tai du lieu
            res.json(sinhvien);//api tra ve ket qua
        } else {
            res.status(404).json({ error: "Khong co sinh vien" });
        }
    } catch (error) {
        console.error("Loi doc du lieu: ");
        res.status(500).json({ error: "Doc du lieu loi" });
    }
});
//khoi chayj may chu
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Sever dang chay o cong 3000");
})
module.exports = app;
