import Swal from 'sweetalert2';
import * as moment from 'moment';

const { JSDOM } = require('jsdom');
const { window } = new JSDOM();
const { document } = new JSDOM('').window;
global.document = document;

const $ = require('jquery')(window);
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

$(() => {
    initLocalStorage();
    printShopList();

    // 매장 등록 버튼 이벤트 리스너
    $("#regShopBtn").on('click', () => {
        regidateShop();
        initInputShop();
    });

    // 매장 선택 셀렉트 이벤트 리스너
    $('#shopSelect').on('change', function () {
        printStockList(Number($(this).val()));
    });

    // 재고 등록 버튼 이벤트 리스너
    $("#regStockBtn").on('click', () => {
        regidateStock(Number($("#shopSelect").val()));
        initInputStock();
    });

});

// 매장, 재고 저장소 초기화
function initLocalStorage(): void {
    if (typeof window !== undefined) {
        if (!localStorage.getItem('shopSeq')) {
            localStorage.setItem("shopSeq", "0");
        }
        if (!localStorage.getItem('stockSeq')) {
            localStorage.setItem("stockSeq", "0");
        }
        if (!localStorage.getItem('shopList')) {
            localStorage.setItem("shopList", "[]");
        }
        if (!localStorage.getItem('stockList')) {
            localStorage.setItem("stockList", "[]");
        }
    }
};

// 매장 목록 리스트 반환
function getShopList(): Shop[] {
    return JSON.parse(localStorage.getItem("shopList") || "[]");
}

// 매장 목록 리스트 설정
function setShopList(shopList: Shop[]): void {
    localStorage.setItem("shopList", JSON.stringify(shopList));
}

// 매장 번호 등록 및 반환
function getShopSeq(seq: number): number {
    const shopSeq = Number(localStorage.getItem("shopSeq")) + seq;
    localStorage.setItem("shopSeq", `${shopSeq}`);
    return shopSeq;
}

// 매장 목록 출력
function printShopList(): void {
    $("#shoptable").empty();
    $("#shopSelect").empty();
    $("#shopSelect").append('<option selected>매장</option>');
    getShopList().forEach(shop => {
        $("#shoptable").append(`
        <tr>
            <th scope="row">${shop.shno}</th>
            <th scope="row">${shop.shname}</th>
            <th scope="row">${shop.shtotst}</th>
            <th scope="row"><button id=editShopBtn${shop.shno} class="editShopBtn">수정</button></th>
            <th scope="row"><button id=delShopBtn${shop.shno} class="delShopBtn">삭제</button></th>
        </tr>
        `);

        $("#shopSelect").append(`
            <option value=${shop.shno}>${shop.shname}</option>
        `);

        // 매장 수정 버튼 이벤트 리스너
        $('#' + 'editShopBtn' + shop.shno).on('click', () => {
            showEditShopAlert(shop);
        });
        // 매장 삭제 버튼 이벤트 리스너
        $('#' + 'delShopBtn' + shop.shno).on('click', () => {
            showRemoveAlert(shop, 'shop');
        });
    });
}

// 매장 입력, 선택 알림창
function showRequiredAlert(content: string): void {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "warning",
        title: content
    });
}

// 매장, 재고 삭제 알림창
function showRemoveAlert(target, targetStr: string): void {
    const name = targetStr === 'shop' ? (target as Shop).shname : (target as Stock).stname;
    const text = targetStr === 'shop' ? '매장' : '재고';
    const returnFunc = targetStr === 'shop' ? removeShop : removeStock;
    target = targetStr === 'shop' ? Shop : Stock;

    Swal.fire({
        title: "정말로 삭제하시겠습니까?",
        text: `삭제할 ${text} : ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "삭제되었습니다!",
                icon: "success"
            });
            returnFunc(target);
        }
    });
}

// 매장, 재고 변경사항 확인 안내창
function showConfirmAlert(test: string): void {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: test
    });
}

// 매장 등록
function regidateShop(): void {
    const shname = $("#shname").val();
    if (!shname) {
        showRequiredAlert("매장을 입력해주세요!");
    } else {
        const shopList = getShopList();
        shopList.push(new Shop(getShopSeq(1), shname, 0));
        setShopList(shopList);
        printShopList();
    }
};

// 매장 입력칸 초기화
function initInputShop(): void {
    $("#shname").val('');
}

// 매장 수정 알림창
function showEditShopAlert(shop: Shop): void {
    (async () => {
        const { value: newshname } = await Swal.fire({
            title: "매장정보 수정",
            input: "text",
            inputLabel: `현재 매장명: ${shop.shname}`,
            inputPlaceholder: "매장명을 입력해주세요.",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
        if (newshname) {
            showConfirmAlert("매장명이 변경되었습니다.");
            editShop(shop, newshname);
        }
    })()
}
// 매장 수정
function editShop(editshop: Shop, newshname: string): void {
    const editShopList = getShopList().map(shop => {
        if (shop.shno === editshop.shno) {
            shop.shname = newshname;
            return shop;
        } else {
            return shop;
        }
    });
    setShopList(editShopList);
    printShopList();
}

// 매장 삭제
function removeShop(editstock: Stock): void {
    const leftShopList = getShopList().filter(shop => shop.shno !== editstock.shno);
    leftShopList.slice(editstock.shno - 1).forEach(shop => {
        shop.shno -= 1;
    });
    setShopList(leftShopList);
    getShopSeq(-1);
    removeAllStock(editstock.shno);
    printShopList();
}

// 재고 목록 리스트 반환
function getStockList(): Stock[] {
    return JSON.parse(localStorage.getItem("stockList") || "[]");
}

// 재고 목록 리스트 설정
function setStockList(stockList: Stock[]): void {
    sortStockList(stockList);
    localStorage.setItem("stockList", JSON.stringify(stockList));
}

// 매장별 재고 정렬
function sortStockList(stockList: Stock[]): void {
    stockList.sort((a, b) => {
        return a.shno - b.shno;
    });
}

// 재고 번호 등록 및 반환
function getStockSeq(seq: number): number {
    const stockSeq = Number(localStorage.getItem("stockSeq")) + seq;
    localStorage.setItem("stockSeq", `${stockSeq}`);
    return stockSeq;
}

// 재고 출력
function printStockList(shno?: number): void {
    $("#stocktable").empty();
    let index = 0;
    const stockList = getStockList().filter(stock => stock.shno === shno);
    stockList.forEach(stock => {
        $("#stocktable").append(`
            <tr>
                <th scope="row">${++index}</th>
                <th scope="row">${stock.stname}</th>
                <th scope="row">${stock.stamt}</th>
                <th scope="row">${stock.stindate}</th>
                <th scope="row">${getDateStr(stock.strgdate)}</th>
                <th scope="row"><button id=editStockBtn${stock.stno} class="editStockBtn">수정</button></th>
                <th scope="row"><button id=delStockBtn${stock.stno} class="delStockBtn">삭제</button></th>
            </tr>
        `);

        // 재고 수정 버튼 이벤트 리스너
        $("#editStockBtn" + stock.stno).on('click', () => {
            showEditStockAlert(stock);
        });

        // 재고 삭제 버튼 이벤트 리스너
        $("#delStockBtn" + stock.stno).on('click', () => {
            // showRemoveStockAlert(stock);
            showRemoveAlert(stock, 'stock');
        });
    });
}

// 메모의 등록 시간 출력형식 지정함수
function getDateStr(time): string {
    return moment(time).format("YYYY/MM/DD HH:mm");
}

// 매장총재고수량 변경
function changeStockQuantity(shno: number): void {
    const stockList = getStockList().filter(stock => stock.shno === shno);
    const sumstamt = stockList.reduce(function (acc, curr) {
        return acc + curr.stamt;
    }, 0);
    const shopList = getShopList().map(shop => {
        if (shop.shno === shno) {
            shop.shtotst = sumstamt;
            return shop;
        } else {
            return shop;
        }
    });
    setShopList(shopList);
    printShopList();
}

// 재고 등록
function regidateStock(shno: number) {
    const stname = $("#stname").val();
    if (!shno) {
        showRequiredAlert("매장을 선택해주세요!");
    } else if (!stname) {
        showRequiredAlert("재고명을 입력해주세요!");
    } else {
        const stockList = getStockList();
        stockList.push(new Stock(getStockSeq(1), stname, Number($("#stamt").val()), $("#stindate").val(), shno));
        setStockList(stockList);
        printStockList(shno);
        changeStockQuantity(shno);
    }
}

// 재고 입력칸 초기화
function initInputStock(): void {
    $("#stname").val('');
    $("#stamt").val('');
}

// 재고 정보 수정 알림창
function showEditStockAlert(stock: Stock): void {
    (async () => {
        const { value: formValues } = await Swal.fire({
            title: "재고 정보 수정",
            html: `
                <input id="editstname" type="text" class="swal2-input" placeholder=${stock.stname}>
                <input id="editstamt" type="number" min=0 class="swal2-input" placeholder=${stock.stamt}>
                <input id="editstindate" type="date" class="swal2-input">
            `,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            preConfirm: () => {
                return [
                    $("editstname").val(),
                    $("editstamt").val(),
                    $("editstindate").val()
                ];
            }
        });
        if (formValues) {
            Swal.fire(JSON.stringify(formValues));
            showConfirmAlert("재고정보가 변경되었습니다.");
            editStock(stock, formValues);
        }
    })()
}

// 재고 수정
function editStock(editstock: Stock, formValues: object): void {
    const stockList = getStockList().filter(stock => stock.shno === editstock.shno);
    const editStockList = stockList.map(stock => {
        if (stock.stno === editstock.stno) {
            stock.stname = formValues[0];
            stock.stamt = Number(formValues[1]);
            stock.stindate = formValues[2];
            return stock;
        } else {
            return stock;
        }
    });
    const localStockList = getStockList().filter(stock => stock.shno !== editstock.shno);
    const updateStockList = [...localStockList, ...editStockList];
    setStockList(updateStockList);
    changeStockQuantity(editstock.shno);
    printStockList(editstock.shno);
}

// 재고 삭제
function removeStock(editstock: Stock): void {
    const stockList = getStockList().filter(stock => stock.stno !== editstock.stno);
    stockList.slice(editstock.stno - 1).forEach(stock => {
        stock.stno -= 1;
    });
    setStockList(stockList);
    changeStockQuantity(editstock.shno);
    getStockSeq(-1);
    printStockList();
}

// 모든 재고 삭제
function removeAllStock(shno: number): void {
    const stockList = getStockList().filter(stock => stock.shno === shno);
    const stockListLeng = stockList.length;
    const keepStockList = getStockList().filter(stock => stock.shno < shno);
    const changeStockList = getStockList().filter(stock => stock.shno > shno);
    changeStockList.slice().forEach(stock => {
        stock.shno -= 1;
        stock.stno -= stockListLeng;
    });
    const updateStockList = [...keepStockList, ...changeStockList];
    getStockSeq(-stockListLeng);
    setStockList(updateStockList);
    printStockList(shno);
}

