/**
 * Lightweight replacement for tilda-popup-1.0.min.js (3.4KB → ~900 bytes).
 *
 * Defines the same global function signatures that the page-specific
 * Tilda blocks JS (t746_initPopup, t702_initPopup) calls internally.
 * Injected inline in <head> to be available before blocks JS executes.
 */

export const POPUP_SHIM = `<style>.t-popup .t-slds__item{width:100%!important;float:none!important}.t-popup .t-slds__item:not(.t-slds__item_active){display:none}.t746__imgwrapper{position:relative;overflow:hidden}.t746__separator{padding-bottom:65.12%}.t-popup .t-slds__bgimg{background-size:contain!important;background-repeat:no-repeat;background-position:center!important;background-color:#000}</style>
<script>
function t_popup__showPopup(t){if(!t)return;t.style.display='block';setTimeout(function(){t.focus();var c=t.querySelector('.t-popup__container');if(c)c.classList.add('t-popup__container-animated');t.classList.add('t-popup_show');document.body.classList.add('t-body_popupshowed');t_popup__trapFocus(t)},50)}
function t_popup__closePopup(t){document.body.classList.remove('t-body_popupshowed');t.classList.remove('t-popup_show');var c=t.querySelector('.t-popup__container');if(c){c.style.removeProperty('transition');c.classList.remove('t-popup__container_no-transform')}setTimeout(function(){document.querySelectorAll('.t-popup:not(.t-popup_show)').forEach(function(p){p.style.display='none'})},300)}
function t_popup__trapFocus(t){var els=t.querySelectorAll('a,button,input:not([type="hidden"]),select,textarea,[tabindex="0"]');if(!els.length)return;var first=els[0],last=els[els.length-1];t.addEventListener('keydown',function(e){if(e.key==='Tab'){if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}if(e.key==='Escape')t_popup__closePopup(t)})}
function t_popup__resizePopup(){}
function t_popup__addAttributesForAccessibility(h){document.querySelectorAll('a[href="'+h+'"]').forEach(function(a){a.setAttribute('role','button');a.setAttribute('aria-haspopup','dialog')})}
function t_popup__addClassOnTriggerButton(){}
function t_popup__addFocusOnTriggerButton(){}
function t_popup__openByHook(hook){
var popup=document.querySelector('.t-popup[data-tooltip-hook="'+hook+'"]');

if(popup)t_popup__showPopup(popup);
}
document.addEventListener('click',function(e){
var a=e.target.closest('a[href^="#popup:"]');
if(!a)return;
e.preventDefault();

t_popup__openByHook(a.getAttribute('href'));
});
document.addEventListener('click',function(e){
var cl=e.target.closest('.t-popup__close-wrapper,.t-popup__close-button,.t-popup__block-close-button');
if(cl){var p=cl.closest('.t-popup');if(p)t_popup__closePopup(p);return;}
if(e.target.classList&&e.target.classList.contains('t-popup'))t_popup__closePopup(e.target);
});
window.addEventListener('hashchange',function(){
var h=location.hash;
if(h&&h.indexOf('#popup:')===0)t_popup__openByHook(h);
});
function t_popup__initHash(){
var h=location.hash;

if(h&&h.indexOf('#popup:')===0)t_popup__openByHook(h);
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',t_popup__initHash)}
else{t_popup__initHash()}
</script>`;
