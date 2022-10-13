import{getMap,renderPopups,setMainMarkerMove}from"./map.js";import{activateAdForm,activateMapForm}from"./activation-page.js";import{getData}from"./api.js";import{generatePopupList}from"./generate-ad-popup.js";import{setMapFormChange,setMapFormReset,resetMapForm}from"./map-form.js";import{setAddressValue,setAdFormSubmit,activateSubmit,setResetBtnClick,resetAdForm}from"./ad-form.js";import{showAlert,debounce}from"./utils.js";const RENDER_DELAY=500;getMap((()=>{activateAdForm(),getData((e=>{renderPopups(generatePopupList(e)),activateMapForm(),setMapFormChange(debounce((()=>renderPopups(generatePopupList(e)))),500),setMapFormReset(debounce((()=>renderPopups(generatePopupList(e)))))})),setMainMarkerMove((e=>setAddressValue(e)))}));const resetForm=()=>{resetAdForm(),resetMapForm()};setAdFormSubmit((()=>{resetForm(),showAlert("success"),activateSubmit()})),setResetBtnClick((()=>{resetForm()}));