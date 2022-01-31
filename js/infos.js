const usersinfo = [];
const postsinfo = [];
const main = document.querySelector('main')
const userList = document.querySelector(".accounts-list");
const searchUsersList = document.querySelector(".users-names-list");
const usersPostList = document.querySelector(".list-posts");
const addUserBtn = document.querySelector(".add-account-btn");
const addUserBlock = document.querySelector(".add-user");
const btnAddUser = document.getElementById("add-btn-user");
const addPostBtn = document.querySelector(".add-post-btn");
const textarea = document.querySelector(".user-post-text-block");
const deletePost = document.querySelector(".delete-post");
const addNewPostBlock = document.querySelector(".add-post");
const addNewPostBtn = document.getElementById("add-btn");
const removeParentBlockBtns = document.querySelectorAll('.remove-btn')
const overlay = document.querySelector('.overlay')
let infoNewUser = { name: "", email: "" };
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((el) => {
      usersinfo.push({
        name: el.name,
        surname: el.username,
        email: el.email,
        id: el.id,
      });
    });
    addElemsHTML(usersinfo);
    fetchPosts();
  });
function addElemsHTML(usersinfo) {
  usersinfo.forEach((el) => {
    const li = document.createElement("li");
    li.classList.add("accounts-list__person");
    li.setAttribute("data-index", el.id);
    li.setAttribute("id", "user_" + el.id);
    li.insertAdjacentHTML(
      "beforeend",
      `<b></b><b></b>
    <h2 maxlength='30'>${el.name}</h2>
    <h3><span>${el.email}</span></h3>`
    );
    userList.append(li);
    let titlePostEl = document.createElement('textarea')
    titlePostEl.classList.add('name-of-user')
    titlePostEl.innerHTML = el.name
    const postNewBlock = document.createElement('div')
    postNewBlock.setAttribute('id', `user_screen_${el.id}`)
    postNewBlock.classList.add('accounts-post-bar__content')
    postNewBlock.setAttribute('data-user-index',el.id)
    usersPostList.append(postNewBlock)
    postNewBlock.append(titlePostEl)
    // usersPostList.insertAdjacentHTML(
    //   "beforeend",
    //   ` <div class="accounts-post-bar__content" data-user-index="${el.id}" id="user_screen_${el.id}"></div>`
    // );
    titlePostEl.addEventListener('blur', function(){
      let undefinedEl = document.getElementById(`user_${this.parentElement.dataset.userIndex}`)
      if(this.value.length >= 25){
        let words = ''
        let wordsArr = this.value.split('')
        for(let index = 0;index <= 25;index++){
          words +=wordsArr[index]
        }
        this.value = words
        undefinedEl.children[2].innerHTML = words
        msg.classList.add('activeMessage')
        setTimeout(() =>{msg.classList.remove('activeMessage')},2000)
      }else{
        undefinedEl.children[2].innerHTML = this.value
      }
    })
    let userItem = document.createElement("li");
    searchUsersList.append(userItem);
    userItem.classList.add("users-name");
    userItem.setAttribute("id", el.id);
    userItem.innerHTML = el.name;
    userItem.addEventListener("click", () => {
      const userNewPostPad = document.getElementById("user-new-post");
      const userNamesList = document.querySelector(".search-users");
      userNamesList.classList.remove("active-posts");
      userNewPostPad.value = userItem.innerHTML;
      userNewPostPad.setAttribute("data-index", userItem.id);
    });
    li.addEventListener("click", addActive);
    search("#elastic", ".accounts-list__person h2");
  });
}

function addActive() {
  document.getElementById("searchpost").classList.remove("anactive");
  document.getElementById("searchpost").value = ''
  let linksRemoveAll = document.querySelectorAll('.link-user-post-textarea')
  linksRemoveAll.forEach(links => links.classList.remove('anactive'))
  textarea.classList.remove("activeflex");
  usersPostList.classList.remove("anactive");
  addPostBtn.classList.remove("anactive");
  const likns = document.querySelectorAll(".accounts-list__person");
  likns.forEach((link) => {
    link.classList.remove("active");
  });
  this.classList.add("active");
  const blocks = document.querySelectorAll(".accounts-post-bar__content");
  blocks.forEach((el) => {
    el.classList.remove("active-posts");
  });
  usersPostList.parentElement.children[0].classList.add("anactive");
  document
    .getElementById(`user_screen_${this.dataset.index}`)
    .classList.add("active-posts");
    delteUser.classList.remove('anactive')
}

function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((el) => {
        postsinfo.push(el);
      });
      addElementPost(postsinfo);
    });
}

function addElementPost(postsinfo) {
  const postBlocks = document.getElementsByClassName(
    "accounts-post-bar__content"
  );
  postsinfo.forEach((info, i) => {
    const postlink = document.createElement("a");
    postlink.classList.add("link-user-post-textarea");
    document
      .getElementById(`user_screen_${info.userId}`)
      .insertAdjacentElement("beforeend", postlink);
    postlink.innerHTML = info.title;
    postlink.setAttribute("id", `post_link_${info.id}`);
    postlink.innerHTML += `<p class="link-user-post-text">${info.body}</p>`;
    postlink.addEventListener("click", linkPost);
    const linksAll = document.querySelectorAll(".link-user-post-textarea");
    document.getElementById("searchpost").addEventListener("click", () => {
      searchThird("#searchpost", linksAll);
    });
  });
}

addUserBtn.addEventListener("click", () => {
  addUserBlock.classList.add("activeflex");
  main.style.filter ='blur(3px)'
  addActiveClass(overlay)  
});
overlayControl(overlay,addUserBlock,'activeflex',main)
btnAddUser.addEventListener("click", function () {
  this.parentElement.classList.remove("activeflex");
  const nameUser = document.getElementById("name-new-user");
  const emailUser = document.getElementById("email-new-user");
  let num = usersinfo.length;
  const newUser = {
    name: nameUser.value,
    email: emailUser.value,
    id: ++num,
  };
  usersinfo.push(newUser);
  addElemsHTML([newUser]);
  overlay.classList.remove('activeflex')
  main.style = `display:flex`
});
let id = "";
function linkPost() {
  document.getElementById("searchpost").classList.add("anactive");
  id = this.attributes[1].value;
  let title = this.innerHTML.split("<");
  addPostBtn.classList.add("anactive");
  this.parentElement.parentElement.classList.add("anactive");
  textarea.classList.add("activeflex");
  textarea.children[0].value = title[0];
  textarea.children[1].value = this.children[0].innerHTML;
  deleteBtn(this);
  delteUser.classList.add('anactive')
}
const newPostTitle = document.getElementById("titleUser");
const newPostBody = document.getElementById("bodyPost");
newPostTitle.addEventListener("blur", function () {
  addServe(this, false, newPostBody);
});
newPostBody.addEventListener("blur", function () {
  addServe(false, this, newPostTitle);
});
function addServe(titlePost, bodyPost, value) {
  let objNewPost = {
    title: "",
    body: "",
    id: "",
  };
  if (titlePost) {
    objNewPost.title = titlePost.value;
    objNewPost.body = value.value;
    objNewPost.id = id;
  } else if (bodyPost) {
    objNewPost.body = bodyPost.value;
    objNewPost.title = value.value;
    objNewPost.id = id;
  }
  const allLinksPost = document.getElementById(objNewPost.id);
  allLinksPost.innerHTML = objNewPost.title;
  allLinksPost.innerHTML += `<p class="link-user-post-text">${objNewPost.body}</p>`;
}

function deleteBtn(link) {
  deletePost.addEventListener("click", () => {
    link.innerHTML = "";
    deletePost.parentElement.classList.remove("activeflex");
    usersPostList.classList.remove("anactive");
    addPostBtn.classList.remove("anactive");
    document.getElementById("searchpost").classList.remove("anactive");
  });
}

addPostBtn.addEventListener("click", () => {
  addNewPostBlock.classList.add("activeflex");
  addNewPostBlock.children[2].value = "";
  addNewPostBlock.children[4].value = "";
  addNewPostBlock.children[6].value = "";
  main.style.filter ='blur(3px)'
  addActiveClass(overlay)
  
});
overlayControl(overlay,addNewPostBlock,'activeflex',main)

addNewPostBtn.addEventListener("click", () => {
  let num = postsinfo.length;
  const titleNewPost = document.getElementById("new-post-title");
  const bodyNewPost = document.getElementById("text-new-post");
  const userNewPost = document.getElementById("user-new-post");
  const newPost = {
    title: titleNewPost.value,
    body: bodyNewPost.value,
    userId: userNewPost.attributes[6].value,
    id: ++num,
  };
  if(userNewPost.value)
  postsinfo.push(newPost);
  addElementPost([newPost]);
  addNewPostBtn.parentElement.classList.remove("activeflex");
  overlay.classList.remove('activeflex')
  main.style = `display:flex`
});

const userNewPostPad = document.getElementById("user-new-post");
const userNamesList = document.querySelector(".search-users");
userNewPostPad.addEventListener("click", (e) => {
  userNamesList.classList.add("active-posts");
  secondSearch("#user-new-post", ".users-name");
});

removeParentBlockBtns.forEach(el => {
  btnRemove(el,el.parentElement,'activeflex',overlay,main)  
})

delteUser.addEventListener('click', () => {
    const usersListSearch = document.querySelectorAll('.users-name')
    const blocksContain = document.querySelectorAll('.accounts-post-bar__content')
    const usersProfil = document.querySelectorAll('.accounts-list__person')
    blocksContain.forEach(el => {
      if(el.classList.contains('active-posts')){
        delteUser.classList.add('anactive')
        addPostBtn.classList.add('anactive')
        usersProfil[el.dataset.userIndex - 1].classList.add('anactive')
        usersListSearch[el.dataset.userIndex - 1].classList.add('anactive')
        el.classList.add('anactive')
        title.classList.remove('anactive')
        document.getElementById("searchpost").classList.add("anactive");
      }
    })
})