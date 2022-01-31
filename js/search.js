function search(searchInput,item) {
    const elasticSearch = document.querySelector(searchInput);
    let items = document.querySelectorAll(item)
    elasticSearch.addEventListener('input', function(){
      let val = elasticSearch.value.trim();
      if (val != "") {
        items.forEach((element) => {
          if (!element.innerText.toLowerCase().includes(val.toLowerCase().trim())) {
            element.parentElement.classList.add("anactive");           
          }
          else {              
            element.parentElement.classList.remove("anactive");
          }
        })
      } else{
        items.forEach((element) => {        
          element.parentElement.classList.remove("anactive");
        });
      }
    })
  }
function secondSearch(searchInput,item) {
  const elasticSearch = document.querySelector(searchInput);
  let items = document.querySelectorAll(item)
  elasticSearch.addEventListener('input', function(){
    let val = elasticSearch.value.trim();
    if (val != "") {
      items.forEach((element) => {
        if (!element.innerText.toLowerCase().includes(val.toLowerCase().trim())) {
          element.classList.add("anactive");
        }else {
          element.classList.remove("anactive");
        }
      })
    } else{
      items.forEach((element) => {
        element.classList.remove("anactive");
      });
    }
  })
}
function searchThird(searchInput,item) {
  const elasticSearch = document.querySelector(searchInput);
  elasticSearch.addEventListener('input', function(){
    let val = elasticSearch.value.trim();
    if (val != "") {
      item.forEach((element) => {
        if (!element.innerText.toLowerCase().includes(val.toLowerCase().trim())) {
          element.classList.add("anactive");
        }else {
          element.classList.remove("anactive");
        }
      })
    } else{
      item.forEach((element) => {
        element.classList.remove("anactive");
      });
    }
  })
}

function overlayControl(overlay,block,blockclass, main) {
  window.addEventListener('click', (e) => {
    if(e.target.classList.contains('overlay')){
      overlay.classList.remove('activeflex')
      block.classList.remove(blockclass)
      main.style = `display:flex;`
    }
  })
}

function addActiveClass(el) {
  el.classList.add('activeflex')
}

function btnRemove(btn,removeBlock,classBlock,overlay,main) {
  btn.addEventListener('click', () => {
    removeBlock.classList.remove(classBlock)
    overlay.classList.remove('activeflex')
    main.style = `display:flex;`
  })
}
