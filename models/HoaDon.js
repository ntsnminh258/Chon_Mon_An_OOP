function HoaDon(maMonAn, tenMonAn, soLuong, giaTien) {
  this.maMonAn = maMonAn;
  this.tenMonAn = tenMonAn;
  this.soLuong = soLuong;
  this.giaTien = giaTien;
  this.thanhTien = function () {
    var tTien = Number(this.soLuong) * Number(this.giaTien);
    return tTien;
  };
}
