const t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")},o={colorIntervalId:null,isActive:!1,getRandomHexColor:()=>`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,onChangeColorBody(){this.isActive||(this.isActive=!0,this.colorIntervalId=setInterval((()=>{t.body.style.backgroundColor=this.getRandomHexColor()}),1e3))},onStopChangeColorBody(){this.isActive=!1,clearInterval(this.colorIntervalId)}};t.btnStart.addEventListener("click",o.onChangeColorBody.bind(o)),t.btnStop.addEventListener("click",o.onStopChangeColorBody.bind(o));
//# sourceMappingURL=01-color-switcher.6421a694.js.map