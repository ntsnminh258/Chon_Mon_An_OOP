var arrMonAn = [
  { maMonAn: 1, tenMonAn: 'Nước lẩu haidilao', giaTien: 100 },
  { maMonAn: 2, tenMonAn: 'Mì cay thành đô', giaTien: 200 },
  { maMonAn: 3, tenMonAn: 'Mực bạch ngọc', giaTien: 300 },
];

function renderTableMenu(arrMonAn) {
  var kq = '';
  for (i = 0; i < arrMonAn.length; i++) {
    var ma = arrMonAn[i];

    kq += `<div class="row mt-3">
      <div class="col-3">${ma.maMonAn}</div>
      <div class="col-3">${ma.tenMonAn}</div>
      <div class="col-3">${ma.giaTien}</div>
      <div class="col-3">
          <button class="bg-danger text-white btn" onclick="themMon(${ma.maMonAn})">+</button>
          <button class="bg-danger text-white btn" onclick="xoaMon(${ma.maMonAn})">-</button>
      </div>
  </div>`;
  }
  //   += ---> append
  document.querySelector('#menu').innerHTML += kq;
}

renderTableMenu(arrMonAn);

/**---------------------------------------------------- */

var arrHoaDon = [];

function renderTableHoaDon(arrHoaDon) {
  var kq = '';
  for (i = 0; i < arrHoaDon.length; i++) {
    var hd = arrHoaDon[i];

    var hoaDon = new HoaDon(hd.maMonAn, hd.tenMonAn, hd.soLuong, hd.giaTien);

    kq += `<tr>
        <td>${hoaDon.maMonAn}</td>
        <td>${hoaDon.tenMonAn}</td>
        <td>${hoaDon.soLuong}</td>
        <td>${hoaDon.thanhTien()}</td>
    </tr>`;
  }
  document.querySelector('#tblHoaDon').innerHTML = kq;
}

function renderTableThanhTien() {
  var tTien = 0;
  for (i = 0; i < arrHoaDon.length; i++) {
    var hd = arrHoaDon[i];
    tTien += hd.thanhTien();
  }

  var kq = `<tr>
  <tr>
      <td></td>
      <td></td>
      <td id="txtThanhTien" class="font-weight-bold">Thành tiền</td>
      <td>${tTien}</td>
  </tr>
</tr>`;

  document.querySelector('tfoot').innerHTML = kq;
}

renderTableThanhTien();

function themMon(maMonAn) {
  for (i = 0; i < arrMonAn.length; i++) {
    var monAn = arrMonAn[i];
    // Kiểm tra xem nút thêm món có match với obj món ăn trong arrMonAn chưa
    if (monAn.maMonAn === maMonAn) {
      // Kiểm tra xem món ăn này đã được thêm vào arrHoaDon chưa
      if (
        arrHoaDon.filter(function (e) {
          return e.maMonAn === maMonAn;
        }).length > 0
      ) {
        // Nếu món ăn đã được thêm, tìm vị trí của obj chứa giá trị maMonAn đó
        objIndex = arrHoaDon.findIndex(function (obj) {
          return obj.maMonAn === maMonAn;
        });

        // Cập nhật số lượng của món ăn đó lên 1 đơn vị
        arrHoaDon[objIndex].soLuong += 1;
      }
      // Nếu món ăn chưa được thêm, thêm món ăn đó vào arrHoaDon
      else {
        var hoaDon = new HoaDon();
        hoaDon.maMonAn = monAn.maMonAn;
        hoaDon.tenMonAn = monAn.tenMonAn;
        hoaDon.soLuong = 1;
        hoaDon.giaTien = monAn.giaTien;
        arrHoaDon.push(hoaDon);
      }
    }
  }
  renderTableHoaDon(arrHoaDon);
  renderTableThanhTien();
}

function xoaMon(maMonAn) {
  // Xác định vị trí của obj cần xóa trong mảng
  objIndex = arrHoaDon.findIndex(function (obj) {
    return obj.maMonAn === maMonAn;
  });

  // Nếu obj có tồn tại và số lượng > 1 thì giảm số lượng xuống 1 đơn vị
  if (objIndex !== -1 && arrHoaDon[objIndex].soLuong > 1) {
    arrHoaDon[objIndex].soLuong -= 1;
  }
  // Nếu obj có tồn tại và số lượng = 1 thì xóa obj ra khỏi mảng
  else if (objIndex !== -1 && arrHoaDon[objIndex].soLuong === 1) {
    for (i = 0; i < arrHoaDon.length; i++) {
      var hd = arrHoaDon[i];
      if (hd.maMonAn === maMonAn) {
        arrHoaDon.splice(i, 1);
      }
    }
  }
  // Trường hợp còn lại thì không làm gì
  else {
    return;
  }
  renderTableHoaDon(arrHoaDon);
  renderTableThanhTien();
}
