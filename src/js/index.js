const $ = (selector) => document.querySelector(selector)

const addMenuName = () => {
  if ($("#espresso-menu-name").value === "") {
    alert("값을 입력해주세요")
    return
  }
  const espressoMenuName = $("#espresso-menu-name").value
  const menuItemTemplate = (espressoMenuName) => {
    return `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
  }
  $("#espresso-menu-list").insertAdjacentHTML("beforeEnd", menuItemTemplate(espressoMenuName))
  updateMenuCount()
  $("#espresso-menu-name").value = ""
}
const updateMenuCount = () => {
  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length
  $(".menu-count").innerText = `총 ${menuCount}개`
}
const updateMenuName = (e) => {
  //기존 값 가져오기
  const $menuName = e.target.closest("li").querySelector(".menu-name")
  //변경된 값 넣기
  const updatedMenuName = prompt("변경할 값을 입력해주세요", $menuName.innerText)
  $menuName.innerText = updatedMenuName
}

$("#espresso-menu-list").addEventListener("click", (e) => {
  //수정기능
  if (e.target.classList.contains("menu-edit-button")) {
    updateMenuName(e)
  }
  //삭제기능
  if (e.target.classList.contains("menu-remove-button")) {
    if (confirm("삭제?")) {
      e.target.closest("li").remove()
      updateMenuCount()
    }
  }
})

//form태그 전송 방지
$("#espresso-menu-form").addEventListener("submit", (e) => {
  e.preventDefault()
})

//메뉴 이름 받기 (click)
$("#espresso-menu-submit-button").addEventListener("click", () => {
  addMenuName()
})

//메뉴 이름 받기(enter)
$("#espresso-menu-name").addEventListener("keypress", (e) => {
  if (e.key !== "Enter") {
    return
  }
  addMenuName()
})
