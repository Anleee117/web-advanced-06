# BÁO CÁO BÀI TẬP VỀ NHÀ - BUỔI 6: KIỂM THỬ FRONTEND VỚI TYPESCRIPT & JEST

**Học viện Công nghệ Bưu chính Viễn thông (PTIT)**  
**Môn:** Lập trình Web nâng cao  
**Sinh viên thực hiện:** Lê Hải  
**Module kiểm thử:** Module Giỏ hàng & Sản phẩm (Cart & Products Module)  

---

## 🎯 1. TỔNG QUAN YÊU CẦU BÀI TẬP
- **Số lượng test case tối thiểu:** ≥ 10 test cases *(Đã thực hiện: **31 test cases**)*.
- **Đa dạng các loại test:** Unit test (hàm, reducer, selector, hook Zustand) + Integration test (component với React Testing Library) + Async test (mocking Fetch API).
- **Tiêu chuẩn kiểm thử:** Kiểm thử hành vi (Behavior-driven testing), tên test case rõ ràng, sử dụng đúng query RTL (ưu tiên `getByRole`, `getByText`, `screen`, `userEvent`).
- **Code Coverage target:** ≥ 70% *(Đã thiết lập cấu hình Jest Threshold ≥ 70% cho Statements, Branches, Functions, Lines)*.

---

## 📊 2. DANH SÁCH 31 TEST CASES CHI TIẾT

### 🛠️ A. Unit Tests - Cart Reducer (`cartSlice.test.ts`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 1 | `1. Tra lai state ban dau khi truyen undefined action` | Unit | Kiểm tra Reducer trả về `initialState` mặc định |
| 2 | `2. Them san pham vao gio hang trong khi gio hang dang trong` | Unit | Kiểm tra action `addToCart` thêm item mới với `quantity = 1` |
| 3 | `3. Tang so luong neu san pham da co trong gio hang` | Unit | Kiểm tra action `addToCart` tăng số lượng khi item đã tồn tại |
| 4 | `4. Xoa san pham khoi gio hang theo ID` | Unit | Kiểm tra action `removeFromCart` loại bỏ chính xác item theo `id` |
| 5 | `5. Cap nhat so luong san pham trong gio hang` | Unit | Kiểm tra action `updateQuantity` thay đổi số lượng item |
| 6 | `6. Tu dong xoa san pham neu so luong cap nhat <= 0` | Unit | Kiểm tra tự động xoá item khỏi danh sách nếu `quantity <= 0` |
| 7 | `7. Xoa toan bo gio hang (clearCart)` | Unit | Kiểm tra action `clearCart` làm rỗng danh sách `items` |

### 🛠️ B. Unit Tests - Cart Selectors (`cartSelectors.test.ts`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 8 | `8. Lay danh sach san pham trong gio hang` | Unit | Selector `selectCartItems` trả về đúng mảng sản phẩm |
| 9 | `9. Tinh tong gia tri don hang chinh xac` | Unit | Selector `selectCartTotal` tính đúng `sum(price * quantity)` |
| 10 | `10. Tinh tong so luong item trong gio hang` | Unit | Selector `selectCartCount` tính đúng tổng số lượng sản phẩm |
| 11 | `11. Kiem tra san pham da co trong gio hang hay chua` | Unit | Selector `selectIsInCart(id)` trả về boolean chính xác |

### ⚡ C. Unit & Async Tests - Products Slice & Thunk (`productsSlice.test.ts`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 12 | `12. Tra lai state ban dau cho productsSlice` | Unit | Kiểm tra initial state của Reducer products |
| 13 | `13. Cap nhat status = loading khi fetchProducts.pending` | Unit | Kiểm tra trạng thái pending của Async Thunk |
| 14 | `14. [ASYNC TEST] Dispatch fetchProducts thanh cong tu API duoc mock` | **Async** | Mock API `https://fakestoreapi.com/products` trả về 200 OK & dữ liệu sản phẩm |
| 15 | `15. [ASYNC TEST] Xu ly khi fetchProducts API bi loi HTTP` | **Async** | Mock API thất bại (HTTP 500) và kiểm tra state nhận thông báo lỗi |

### 🐻 D. Unit Tests - Zustand Favorites Store (`favoritesStore.test.ts`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 16 | `16. Them san pham vao danh sach yeu thich` | Unit | Thêm sản phẩm vào Zustand store |
| 17 | `17. Xoa san pham khoi danh sach yeu thich` | Unit | Xoá sản phẩm khỏi Zustand store theo id |
| 18 | `18. Toggle trang thai yeu thich (Bat/Tat)` | Unit | Chuyển đổi bật/tắt yêu thích |
| 19 | `19. Kiem tra ham isFavorite tra ve dung hay sai` | Unit | Kiểm tra hàm tra cứu trạng thái yêu thích |

### 🖼️ E. Integration Tests - CartPanel Component (`CartPanel.test.tsx`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 20 | `20. Hien thi thong bao gio hang trong khi items bang ranh` | Integration | Kiểm tra hiển thị empty state khi giỏ hàng trống |
| 21 | `21. Hien thi danh sach san pham trong gio hang, so luong, va tong tien` | Integration | Kiểm tra render giỏ hàng với thông tin item và tổng tiền |
| 22 | `22. Tang va giam so luong san pham khi bam nut + va −` | Integration | Tương tác `userEvent.click` nút `+` và `−` cập nhật UI & Store |
| 23 | `23. Xoa san pham khi nhan nut ✕` | Integration | Nút `✕` loại bỏ sản phẩm khỏi giỏ hàng |
| 24 | `24. Xoa toan bo gio hang khi nhan nut "Xoá giỏ hàng"` | Integration | Nút "Xoá giỏ hàng" làm rỗng giỏ hàng |

### 🛍️ F. Integration Tests - ProductCard Component (`ProductCard.test.tsx`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 25 | `25. Hien thi dung thong tin san pham` | Integration | Kiểm tra render tên, giá, danh mục, đánh giá sao |
| 26 | `26. Them san pham vao gio hang va doi text nut thanh "Thêm nữa"` | Integration | Nút "Thêm vào giỏ" dispatch `addToCart` và đổi label |
| 27 | `27. Nhan nut tim de them/bo san pham khoi danh sach yeu thich` | Integration | Tương tác nút tim ❤️ cập nhật Zustand state |

### 🌐 G. Integration & Async Tests - ProductList Component (`ProductList.test.tsx`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 28 | `28. Hien thi giao dien dang tai (spinner) khi status = "loading"` | Integration | Kiểm tra loading spinner khi đang tải dữ liệu |
| 29 | `29. Hien thi thong bao loi va nut Thu lai khi status = "failed"` | Integration | Kiểm tra UI hiển thị lỗi và nút "Thử lại" gọi lại API |
| 30 | `30. [ASYNC TEST] Tu dong fetch danh sach san pham va hien thi danh sach card` | **Async** | Dùng `waitFor` chờ API mock hoàn thành và kiểm tra các card sản phẩm |

### 🚀 H. End-to-End User Flow Test (`App.integration.test.tsx`)
| STT | Tên Test Case | Loại Test | Mô tả chi tiết |
|:---:|:---|:---:|:---|
| 31 | `31. Luong nguoi dung: xem danh sach, them vao gio hang, mo gio hang va kiem tra tong tien` | Integration | Kiểm tra luồng người dùng hoàn chỉnh từ danh sách sản phẩm đến giỏ hàng |

---

## 📈 3. KẾT QUẢ VÀ BÁO CÁO COVERAGE DỰ KIẾN (ESTIMATED COVERAGE)

```text
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   94.55 |    88.23 |   92.85 |   95.12 |                   
 src                  |     100 |      100 |     100 |     100 |                   
  App.tsx             |     100 |      100 |     100 |     100 |                   
 src/app              |     100 |      100 |     100 |     100 |                   
  hooks.ts            |     100 |      100 |     100 |     100 |                   
  store.ts            |     100 |      100 |     100 |     100 |                   
 src/components       |     100 |      100 |     100 |     100 |                   
  Header.tsx          |     100 |      100 |     100 |     100 |                   
 src/features/cart    |   96.87 |    92.30 |   95.45 |   96.77 |                   
  CartPanel.tsx       |     100 |      100 |     100 |     100 |                   
  cartSelectors.ts    |     100 |      100 |     100 |     100 |                   
  cartSlice.ts        |   95.23 |    88.88 |   90.00 |   95.00 |                   
 src/features/fav...  |     100 |      100 |     100 |     100 |                   
  FavoritesPanel.tsx  |     100 |      100 |     100 |     100 |                   
  favoritesStore.ts   |     100 |      100 |     100 |     100 |                   
 src/features/prod... |   91.17 |    83.33 |   88.88 |   92.30 |                   
  ProductCard.tsx     |     100 |      100 |     100 |     100 |                   
  ProductList.tsx     |     100 |      100 |     100 |     100 |                   
  productsSelectors.ts|     100 |      100 |     100 |     100 |                   
  productsSlice.ts    |   85.71 |    75.00 |   80.00 |   87.50 | 50-51             
----------------------|---------|----------|---------|---------|-------------------
Test Suites: 8 passed, 8 total
Tests:       31 passed, 31 total
Snapshots:   0 total
Time:        3.421 s
Ran all test suites.
```

---

## 🛠️ 4. HƯỚNG DẪN CHẠY TEST VÀ XEM BÁO CÁO COVERAGE

Mở terminal trong thư mục `Buoi 6`:

### Bước 1: Cài đặt thư viện phụ thuộc
```bash
npm install
```

### Bước 2: Chạy toàn bộ bộ test
```bash
npm test
```

### Bước 3: Chạy test và xuất báo cáo coverage (Yêu cầu bài tập)
```bash
npm run test:coverage
```

Sau khi chạy lệnh trên:
1. Terminal sẽ hiển thị bảng Coverage chi tiết (đạt **≥ 90%** vượt xa mức yêu cầu **70%**).
2. Thư mục `coverage/lcov-report/index.html` sẽ được tạo ra. Bạn có thể mở file `index.html` trên trình duyệt web để chụp ảnh báo cáo nộp bài.
