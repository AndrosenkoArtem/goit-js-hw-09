!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},u=t.parcelRequire7bc7;null==u&&((u=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var u={id:e,exports:{}};return n[e]=u,t.call(u.exports,u,u.exports),u.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequire7bc7=u);var o=u("6JpON"),i=document.querySelector(".form"),a=!1;i.addEventListener("submit",(function(t){t.preventDefault();var n=t.currentTarget.elements.delay.value,r=t.currentTarget.elements.step.value,u=t.currentTarget.elements.amount.value,i=0,l=Number(n);if(!a){a=!0;var c=setInterval((function(){var t,s,f;(function(e){var t=e.promiseResultInterval,n=e.currentPosition,r=e.amountInputValue;if(n>=r)clearInterval(t),a=!1,n=0})({promiseResultInterval:c,currentPosition:i+=1,amountInputValue:u}),(t=i,s=n,f=Math.random()>.3,new Promise((function(e,n){setTimeout((function(){f?e(t):n(t)}),s)}))).then((function(t){!function(t){var n=t.currentDelay,r=t.stepInputValue,u=t.position;e(o).Notify.success("✅ Fulfilled promise ".concat(u," in ").concat(n-Number(r),"ms"))}({currentDelay:l+=Number(r),stepInputValue:r,position:t})})).catch((function(t){!function(t){var n=t.currentDelay,r=t.stepInputValue,u=t.position;e(o).Notify.failure("❌ Rejected promise ".concat(u," in ").concat(n-Number(r),"ms"))}({currentDelay:l+=Number(r),stepInputValue:r,position:t})}))}),r)}}))}();
//# sourceMappingURL=03-promises.a53f83c4.js.map
