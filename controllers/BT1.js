var arrMonAnBT1 = [];

function luuStorage() {
  var sMonAn = JSON.stringify(arrMonAnBT1);
  localStorage.setItem('mangMonAn', sMonAn);
}

function layStorage() {
  if (localStorage.getItem('mangMonAn')) {
    var sMonAn = localStorage.getItem('mangMonAn');
    arrMonAnBT1 = JSON.parse(sMonAn);
    renderTable(arrMonAnBT1);
  }
}

layStorage();

function xoaMonAn(maMonAn) {
  for (i = 0; i < arrMonAnBT1.length; i++) {
    var monAn = arrMonAnBT1[i];
    if (monAn.maMonAn === maMonAn) {
      arrMonAnBT1.splice(i, 1);
      luuStorage();
    }
  }
  renderTable(arrMonAnBT1);
}

function clearInput() {
  document.querySelector('#maMonAn').value = '';
  document.querySelector('#tenMonAn').value = '';
  document.querySelector('#giaTien').value = '';
  document.querySelector('#linkAnh').value = '';
}

function renderTable(arrMonAnBT1) {
  var kq = '';
  for (i = 0; i < arrMonAnBT1.length; i++) {
    var ma = arrMonAnBT1[i];

    var monAn = new MonAn(ma.maMonAn, ma.tenMonAn, ma.giaTien, ma.hinhAnh);

    kq += `<tr>
        <td>${monAn.maMonAn}</td>
        <td>${monAn.tenMonAn}</td>
        <td>${monAn.giaTien}</td>
        <td><img style="width: 100px;height:100px;" src="${monAn.hinhAnh}" /></td>
        <td><button class="btn btn-danger" onclick="xoaMonAn('${monAn.maMonAn}')">Xoá</button></td>
    </tr>`;
  }
  document.querySelector('tbody').innerHTML = kq;
}

document.querySelector('#btnThemMonAn').addEventListener('click', function () {
  var monAn = new MonAn();
  monAn.maMonAn = document.querySelector('#maMonAn').value;
  monAn.tenMonAn = document.querySelector('#tenMonAn').value;
  monAn.giaTien = document.querySelector('#giaTien').value;
  monAn.hinhAnh = document.querySelector('#linkAnh').value;

  arrMonAnBT1.push(monAn);
  luuStorage();
  renderTable(arrMonAnBT1);
  clearInput();
});
