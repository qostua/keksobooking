const adForm=document.querySelector(".ad-form"),mapForm=document.querySelector(".map__filters"),disableAdForm=()=>{adForm.classList.add("ad-form--disabled");const e=mapForm.querySelectorAll("fieldset");for(const a of e)a.disabled=!0},disableMapForm=()=>{mapForm.classList.add("map__filters--disabled");const e=mapForm.querySelectorAll("select, fieldset");for(const a of e)a.disabled=!0},disableForm=()=>{disableAdForm(),disableMapForm()},activateDiabledElements=e=>{const a=e.querySelectorAll("*[disabled]");for(const e of a)e.disabled=!1},activateAdForm=()=>{activateDiabledElements(adForm),adForm.classList.remove("ad-form--disabled")},activateMapForm=()=>{activateDiabledElements(mapForm),mapForm.classList.remove("map__filters--disabled")};export{disableForm,activateAdForm,activateMapForm};