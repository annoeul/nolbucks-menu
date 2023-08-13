import { $ } from "./utils/dom.js"
import store from "./store/index.js"

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  }
  this.currentCategory = "espresso"

  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage()
    }
    render()
    initEventListeners()
  }

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
          <li data-menu-id="${index}" class=" menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""}">${menuItem.name}</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
            >
              품절
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
              삭제
            </button>
          </li>`
      })
      .join("")
    $("#menu-list").innerHTML = template
    updateMenuCount()
  }

  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요")
      return
    }
    const menuName = $("#menu-name").value
    this.menu[this.currentCategory].push({ name: menuName })
    store.setLocalStorage(this.menu)
    render()
    $("#menu-name").value = ""
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length
    $(".menu-count").innerText = `총 ${menuCount}개`
  }

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId
    //기존 값 가져오기
    const $menuName = e.target.closest("li").querySelector(".menu-name")
    //변경된 값 넣기
    const updatedMenuName = prompt("변경할 값을 입력해주세요", $menuName.innerText)
    this.menu[this.currentCategory][menuId].name = updatedMenuName
    store.setLocalStorage(this.menu)
    render()
    // $menuName.innerText = updatedMenuName
  }

  const removeMenuName = (e) => {
    if (confirm("삭제?")) {
      const menuId = e.target.closest("li").dataset.menuId
      this.menu[this.currentCategory].splice(menuId, 1)
      store.setLocalStorage(this.menu)
      render()
      // e.target.closest("li").remove()
    }
  }

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut
    store.setLocalStorage(this.menu)
    render()
  }

  const initEventListeners = () => {
    //수정,삭제 기능
    $("#menu-list").addEventListener("click", (e) => {
      //수정기능
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e)
        return
      }

      //삭제기능
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e)
        return
      }

      //품절기능
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e)
        return
      }
    })

    //form태그 전송 방지
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault()
    })

    //메뉴 이름 받기 (click)
    $("#menu-submit-button").addEventListener("click", addMenuName)

    //메뉴 이름 받기(enter)
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return
      }
      addMenuName()
    })

    $("nav").addEventListener("click", (e) => {
      const isCategoryButton = e.target.classList.contains("cafe-category-name")
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName
        this.currentCategory = categoryName
        $("#category-title").innerText = `${e.target.innerText} 메뉴관리`
        render()
      }
    })
  }
}

const app = new App()
app.init()
