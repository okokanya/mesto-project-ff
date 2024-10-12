(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r,c){var i=e.querySelector(".card").cloneNode(!0);i.querySelector(".card__title").textContent=t.name;var a=i.querySelector(".card__image"),u=i.querySelector(".card__likes");i.setAttribute("id",t._id),i.setAttribute("owner_id",t.owner._id),a.src=t.link,a.alt=t.name,u.textContent=t.likes.length;var s=i.querySelector(".card__delete-button"),l=i.querySelector(".card__like-button");return s.addEventListener("click",o),n!==t.owner._id&&s.remove(),t.likes.forEach((function(e){e._id===n&&l.classList.add("card__like-button_is-active")})),a.addEventListener("click",(function(){c(t)})),l.addEventListener("click",r),i}function n(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r)}function o(e){e.classList.add("popup_closed"),setTimeout((function(){return e.classList.remove("popup_opened")}),300),setTimeout((function(){return e.classList.remove("popup_closed")}),300),document.removeEventListener("keydown",r)}function r(e){var t=document.querySelector(".popup_opened");"Escape"===e.key&&o(t)}var c=document.forms.editProfile,i=document.querySelector(".profile__title"),a=document.querySelector(".profile__description");c.name.value=i.textContent,c.description.value=a.textContent;document.querySelector(".places__list");var u=document.forms.editProfile,s=u.querySelector(".button"),l="https://nomoreparties.co/v1/cohort-magistr-2",d="db2f39af-180e-4eb9-8615-3688481eaf22",p=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},m=document.querySelector(".profile__title"),f=document.querySelector(".profile__description"),_=function(e){return fetch("".concat(l,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:d,"Content-Type":"application/json"}}).then((function(e){return p(e)}))};u.addEventListener("submit",(function(e){var t,n;e.preventDefault(),s.textContent="Сохранение...",(t=u.name.value,n=u.description.value,fetch("".concat(l,"/users/me"),{method:"PATCH",headers:{authorization:d,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:n})}).then((function(e){return e.json()}))).then((function(){console.log("ok"),m.textContent=u.name.value,f.textContent=u.description.value,closePopup(popupEditProfile)})).catch((function(e){console.log(e)})).finally((function(){s.textContent="Сохранить"}))}));var v,y,h,S,q,C,g,b=document.querySelector(".popup_type_image"),k=document.querySelector(".popup__image"),L=document.querySelector(".popup__caption"),E=document.forms.newPlace,x=document.forms.newPlace,w=x.querySelector(".popup__button"),P=document.querySelector(".profile__image"),T=document.querySelector(".profile__title"),j=document.querySelector(".places__list"),A=document.querySelector(".profile__description"),z=E.elements.placeName,D=E.elements.imageSrc,N="",B="";function O(e){n(b),k.src=e.link,k.alt=e.name,L.textContent=e.name}function J(e){var t;e.preventDefault(),(t=e.target.closest(".card").id,fetch("".concat(l,"/cards/").concat(t),{method:"DELETE",headers:{authorization:d,"Content-Type":"application/json"},body:JSON.stringify({_id:t})}).then((function(e){return p(e)}))).then((function(){e.target.closest(".card").remove()})).catch((function(e){console.log(e)}))}c.addEventListener("submit",(function(e){e.preventDefault(),i.textContent=c.name.value,a.textContent=c.description.value,o(document.querySelector(".popup_opened"))})),document.addEventListener("click",(function(e){e.target.classList.contains("profile__edit-button")&&n(document.querySelector(".popup_type_edit")),e.target.classList.contains("profile__add-button")&&n(document.querySelector(".popup_type_new-card")),e.target.classList.contains("popup__close")&&o(document.querySelector(".popup_opened")),e.target.classList.contains("popup_opened")&&o(e.target)})),x.addEventListener("submit",(function(e){e.preventDefault(),w.textContent="Сохранение...";var n={name:z.value,link:D.value,likes:[]};n.owner={_id:N},function(e){return fetch("".concat(l,"/cards"),{method:"POST",headers:{authorization:d,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return p(e)}))}(n).then((function(n){j.prepend(t(n,N,J,addLike,O)),E.reset(),o(e.target.closest(".popup"))})).catch((function(e){console.log(e)})).finally((function(){w.textContent="Сохранить"}))})),y=(v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-no-active",inputErrorClass:"popup__input-error",errorClass:"popup__text-error-active"}).formSelector,h=v.inputSelector,S=v.submitButtonSelector,q=v.inactiveButtonClass,C=v.inputErrorClass,g=v.errorClass,Array.from(document.querySelectorAll(y)).forEach((function(e){!function(e,t,n,o,r,c){var i=Array.from(e.querySelectorAll(t)),a=e.querySelector(n);i.forEach((function(t){t.addEventListener("input",(function(){(function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""}(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)})(e,t,r,c),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}(i,a,o)}))}))}(e,h,S,q,C,g)})),Promise.all([fetch("".concat(l,"/users/me"),{headers:{authorization:d}}).then((function(e){return p(e)})),fetch("".concat(l,"/cards"),{headers:{authorization:d,"Content-Type":"application/json"}}).then((function(e){return p(e)}))]).then((function(e){console.log(e),T.textContent=e[0].name,A.textContent=e[0].about,N=e[0]._id,B=e[0].avatar,P.setAttribute("style","background-image:url(".concat(B,")")),e[1].forEach((function(e){var n={name:e.name,link:e.link,likes:e.likes,_id:e._id,owner:{_id:e.owner._id}};j.append(t(n,N,J,_,O))}))})).catch((function(e){console.log("Ошибка: "+e)}))})();