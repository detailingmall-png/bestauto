/**
 * Lightweight replacement for tilda-slds-1.4.min.js (39KB → ~1.5KB).
 *
 * Defines the same global function signatures that the page-specific
 * Tilda blocks JS calls internally for slider/carousel initialization.
 * Auto-initializes all sliders on DOMContentLoaded.
 * Supports arrow nav, bullet dots, touch swipe, lazy image loading.
 */

export const SLIDER_SHIM = `<script>
function t_slds_initSliderControls(recid){
var rec=document.getElementById('rec'+recid);if(!rec)return;
if(rec.getAttribute('data-slds-init'))return;rec.setAttribute('data-slds-init','1');
var wrap=rec.querySelector('.t-slds__items-wrapper');if(!wrap)return;
var items=wrap.querySelectorAll('.t-slds__item');
var bullets=rec.querySelectorAll('.t-slds__bullet');
var cur=0,total=items.length;if(!total)return;
var slds=rec.querySelector('.t-slds');if(slds)slds.style.visibility='visible';
function go(n){
cur=((n%total)+total)%total;
items.forEach(function(el,i){
var active=i===cur;
el.classList.toggle('t-slds__item_active',active);
el.setAttribute('aria-hidden',active?'false':'true');
});
bullets.forEach(function(el,i){el.classList.toggle('t-slds__bullet_active',i===cur)});
var imgs=items[cur].querySelectorAll('[data-original]');
imgs.forEach(function(img){
if(!img.style.backgroundImage||img.style.backgroundImage==='none'){
img.style.backgroundImage='url('+img.getAttribute('data-original')+')'}
})}
rec.addEventListener('click',function(e){
var li=e.target.closest('[data-slide-direction]');
if(!li)return;
var dir=li.getAttribute('data-slide-direction');
go(cur+(dir==='left'?-1:1))});
bullets.forEach(function(b,i){b.addEventListener('click',function(){go(i)})});
var tx=0;
wrap.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
wrap.addEventListener('touchend',function(e){
var dx=e.changedTouches[0].clientX-tx;
if(Math.abs(dx)>40)go(cur+(dx<0?1:-1))},{passive:true});
go(0)}
function t_slds__autoInit(){
document.querySelectorAll('.t-slds__items-wrapper').forEach(function(w){
var rec=w.closest('[id^="rec"]');
if(rec)t_slds_initSliderControls(rec.id.replace('rec',''))
})}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',t_slds__autoInit)}
else{t_slds__autoInit()}
function t_slds_ActiveSlide(){}
function t_slds_ActiveBullet(){}
function t_slds_UpdateImages(){}
function t_slds_SliderWidth(){return 0}
function t_slds_SliderHeight(){return 0}
function t_slds_UpdateSliderHeight(){}
function t_slds_ActiveCaption(){}
function t_slds_animate(){}
function t_slds_scrollImages(){}
function t_slds_updateSlider(){}
function t_slds_updateOnDisplayChange(){}
function t_slds_setItemsInRow(){}
function t_slds_SliderArrowsHeight(){}
</script>`;
