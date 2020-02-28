# LTHD-Tech-Security
# Tài liệu về RSA - PGP của đồ án nhóm 1 môn lập trình công nghệ hiện đại 

Tài Liệu này mô tả về cách thức giao tiếp của với api của nhóm 1

Đối với nhóm dùng RSA xem tại đây: [RSA guide](RSA/guide.md)

Đối với nhóm dùng PGP xem tại đây: [PGP guide](PGP/guide.md)

Nói sơ qua về  2 cơ chế RSA và PGP này:

* Về cơ bản `RSA` hay `PGP` là một dạng mã hóa bất đối xứng. Cả 2 bên đều có 1 cặp key được gọi là `public key` và `private key`

* `public key` dùng để trao đổi giữa các hệ thống khác nhau. `private key` được giữ lại làm khóa bí mật. Nhưng cách dùng các `key` của `RSA` và `PGP` khác nhau. `RSA` dùng `public key` để mã hóa `private key` để giải mã. `PGP` thì ngược lại dùng `public key` để giải mã còn `private key` để mã hóa , ký(sign).

# RSA

Đối với `RSA` sau khi trao đối `public key` với hệ thống `RSA` khác. Khi trao đổi dữ liệu giữa 2 hệ thống này sẽ dùng `public key` của hệ thống đã trao đổi để mã hóa dữ liệu, hoặc sign (ký lên dữ liệu). Sau đó sẽ dùng `private key` của mình để giải mã. Ví dụ ta có 2 hệ thống sau, Hệ thống **T** có `public key` là **A** và `private key` là **B**. Hệ Thống **M** có `public key` là **C** và `private key` là **D**. Sau khi **T và M** trao đổi `public key` **T** muốn gửi dữ liệu cho **M** sẽ dùng `public key` đã trao đổi lúc đầu là **C** để mã hóa gửi cho **M** sau đó **M** dùng `private key` là **D** để giải mã cho dữ liệu nhận được. Tương tự **M** dùng `public key` là **A** để mã hóa sau đó gửi dữ liệu cho **T**.

# PGP

Đối với `PGP` sau khi trao đối `public key` với hệ thống `PGP` khác. Khi trao đổi dữ liệu giữa 2 hệ thống này sẽ dùng `private key` của mình để hóa dữ liệu, hoặc sign (ký lên dữ liệu). Dùng `public key` của hệ thống đã trao đổi để giải mã. Ví dụ ta có 2 hệ thống sau, Hệ thống **T** có `public key` là **A** và `private key` là **B**. Hệ Thống **M** có `public key` là **C** và `private key` là **D**. Sau khi **T và M** trao đổi `public key` **T** muốn gửi dữ liệu cho **M** sẽ dùng `private key` là **B** để mã hóa gửi cho **M** sau đó **M** dùng `public key` là **A** đã trao trổi với **T** lúc đầu để giải mã cho dữ liệu nhận được. Tương tự **M** dùng `private key` là **D** để mã hóa sau đó gửi dữ liệu cho **T**.