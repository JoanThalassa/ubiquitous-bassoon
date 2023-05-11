// Khai báo thư viện http của node
const http=require("http");
// Khai báo cổng của dịch vụ
const port=8080;
// Khai báo thư viện Xử lý tập tin của node
const fs=require("fs");
// Xây dựng dịch vụ
const dich_vu= http.createServer((req,res)=>{
    let method=req.method;
    let url=req.url;
    let ketqua=`Dịch vụ NodeJS - Method:${method} - Url:${url}`;
    // Cấp quyền
    res.setHeader("Access-Control-Allow-Origin", '*');
    if(method=="GET"){
        if(url=="/dsTivi"){
            ketqua=fs.readFileSync('./data/Tivi.json',"utf8");
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(ketqua);
        }else if(url=="/dsHocsinh"){
            ketqua=fs.readFileSync('./data/Hocsinh.json',"utf8");
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(ketqua);
        }else if(url=="/dsMathang"){
            ketqua=fs.readFileSync('./data/Mat_hang.json',"utf8");
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(ketqua);
        }else if(url=="/Cuahang"){
            ketqua=fs.readFileSync('./data/Cua_hang.json',"utf8");
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(ketqua);
        }else if(url=="/dsDienthoai"){
            ketqua=fs.readFileSync('./data/Dien_thoai.json',"utf8");
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(ketqua);
        }else{
            res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            res.end(ketqua);
        }
    }else if(method=="POST"){
        // Lấy dữ liệu client gởi về
        let noi_dung_nhan=``;
        req.on("data",(dulieu)=>{
            noi_dung_nhan+= dulieu
        })

        if(url=="/Dangnhap"){
            req.on("end",()=>{
                let user=JSON.parse(noi_dung_nhan);
                let dsUser=JSON.parse(fs.readFileSync("./data/Nguoi_dung.json","utf8"));
                let nguoidung=dsUser.find(x=>x.Ten_Dang_nhap==user.Ten_Dang_nhap && x.Mat_khau==user.Mat_khau);
                let kq={
                    "noi_dung": false
                }
                if(nguoidung){
                    kq.noi_dung=true
                }
                res.end(JSON.stringify(kq));
            })
        }else{
            res.end(ketqua);
        }
        
    }else{
        res.end(ketqua);
    }
    
})

dich_vu.listen(port,()=>{
    console.log(`Service Runing http://localhost:${port}`)
})

const sendMail=require("./sendMail");

else if(url == "/Lienhe"){
            req.on("end",function(){
                let thongTin=JSON.parse(Noi_dung_Nhan);
                let Ket_qua = { "Noi_dung": true };
                let from=`ltv.javascript@gmail.com`;
                let to=`ltv.javascript@gmail.com`;
                let subject=thongTin.tieude;
                let body=thongTin.noidung
                sendMail.Goi_Thu_Lien_he(from,to,subject,body).then(result=>{
                    console.log(result)
                    res.end(JSON.stringify(Ket_qua));
                }).catch(err=>{
                    console.log(err);
                    Ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(Ket_qua));
                })
            })
        }
