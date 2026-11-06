# Pratinjau /admin/ziarah/ (artifact claude.ai)

Sumber pratinjau halaman Tagihan Ziarah yang dibuka di Claude. Folder `_src/` tidak
disajikan ke pengunjung (diblokir `.htaccess`).

- `build.py` — membuat pratinjau dari `admin/ziarah/index.html` yang live. Jalankan dari
  akar repo: `python3 _src/admin-ziarah-preview/build.py /tmp/pratinjau`, lalu terbitkan isi
  foldernya sebagai artifact.
- `viewer.html` — panel PDF di halaman (pdf.js) dan isi yang akan ditulis ke baris permintaan.

Bedanya dengan halaman asli: tidak mengirim apa pun (Drive maupun Sheet permintaan), PDF tampil di halaman, draf
tersimpan di browser pratinjau saja.
