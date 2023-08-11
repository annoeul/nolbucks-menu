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

  const menuCount = $("#espresso-menu-list").querySelectorAll("li").length
  $(".menu-count").innerText = `총 ${menuCount}개`
  $("#espresso-menu-name").value = ""
}

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
