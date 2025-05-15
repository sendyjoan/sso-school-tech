# SSO School Tech

## Deskripsi Proyek
SSO School Tech adalah sebuah proyek yang bertujuan untuk menyediakan solusi Single Sign-On (SSO) untuk institusi pendidikan. Proyek ini dirancang untuk mempermudah akses pengguna ke berbagai layanan digital dengan satu kali login.

## Fitur Utama
- **Autentikasi SSO**: Login tunggal untuk berbagai aplikasi.
- **Manajemen Pengguna**: CRUD pengguna dengan peran dan izin.
- **Keamanan Tinggi**: Implementasi standar keamanan modern.
- **Integrasi Mudah**: Dukungan untuk integrasi dengan aplikasi pihak ketiga.

## Teknologi yang Digunakan
- **Backend**: NodeJs, PrismaOrm, Express.
- **Frontend**: VueJs, Vuex, Vue Router.
- **Database**: MySQL.
- **Autentikasi**: OAuth2, JWT.

## Cara Instalasi
1. Clone repositori:
    ```bash
    git clone https://github.com/sendyjoan/sso-school-tech.git
    ```
2. Masuk ke direktori proyek:
    ```bash
    cd sso-school-tech
    ```
3. Instal dependensi:
    ```bash
    npm install
    ```
4. Konfigurasi file environment `.env` dengan cara melakukan copy paste file `.env.development` dan mengubah isi dari file tersebut.
5. Lakukan migration prisma orm
    ```bash
    npx prisma generate
    ```
5. Jalankan aplikasi:
    ```bash
    npm start
    ```

## Kontribusi
Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk diskusi lebih lanjut.

## Lisensi
Proyek ini dilisensikan di bawah PT. SchoolTech Indonesia.

## Kontak
Untuk informasi lebih lanjut, hubungi admin@schooltechindonesia.com atau kunjungi https://schooltechindonesia.com.
```