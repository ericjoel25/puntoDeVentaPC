import {Router} from './resource/router/router.js';
import { PATHS } from './resource/router/routes.js';
import { handleForm } from './resource/page/registrar/renderRegister/handleFrom.js';
import {showRegisterData} from './resource/page/registrar/renderRegister/showRegisterData.js';
import { updateRegister } from './resource/page/registrar/update/updateRegister.js';
import showDashboardInfo from './resource/page/Dashboard/showDashboardInfo.js';
import showRecordInfo from './resource/page/record/renderRecord/showRecordInfo.js';
import { DeleteRegister } from './resource/page/registrar/delete/deleteRegister.js';
import { DeleteRecord } from './resource/page/record/deleteRecord/deleteRecord.js';
import { updateRecord } from './resource/page/record/update/updateRecord.js';
import { searchRecord } from './resource/page/record/seach/searchRecord.js';



const ROUTER = new Router(PATHS);

const appWindow = window.__TAURI__.window.appWindow
const buttons = document.querySelectorAll('#button')

const d = document

const {getRegisterData} =showRegisterData(d);
const {getRecordData}=showRecordInfo(d)


//console.log(window.localStorage)

document
  .getElementById("titlebar-minimize")
  .addEventListener("click", () => appWindow.minimize());
document
  .getElementById("titlebar-maximize")
  .addEventListener("click", () => appWindow.toggleMaximize());
document
  .getElementById("titlebar-close")
  .addEventListener("click", () => appWindow.close());

 function navigation(){
   
   //showDashboardInfo(d); 
   
  
   const {hash} = window.location; 

      if(hash ==='#Tablero'){

         showDashboardInfo(d)

      }

      if(hash ===' #Registrar'){

         handleForm(d)
         getRegisterData().then(()=> {
            DeleteRegister(d)
            updateRegister(d)
         })


      }

      if(location ==='#Registro'){
     
         getRecordData().then(()=>{
            DeleteRecord(d)
            updateRecord(d)
            searchRecord()
         })
          btnColor(index)
       }

   function btnColor(index){

      // const btnName =btn.textContent
   
       if(index === 0){
         buttons[0].style.backgroundColor='#042D55';
         buttons[1].style.backgroundColor='#678998';
         buttons[2].style.backgroundColor='#678998';
 
       }

       if(index ===1){
         buttons[1].style.backgroundColor='#042D55';
         buttons[0].style.backgroundColor='#678998';
         buttons[2].style.backgroundColor='#678998';
       }

       if(index ===2){
         buttons[2].style.backgroundColor='#042D55';
         buttons[1].style.backgroundColor='#678998';
         buttons[0].style.backgroundColor='#678998';
       }
        //console.log(btnName, index)      
  
 }

 buttons.forEach((button, index) => {
   const {hash} = window.location; 

   button.addEventListener('click', (e)=>{
     
      const location =button.getAttribute(`data-${e.target.className}`)
      
      ROUTER.load(location); 

    if(location ==='Tablero'){
       showDashboardInfo(d)
       btnColor(index)
      // button.style.backgroundColor='blue';
    }

    if(location ==='Registrar'){
       handleForm(d)
     
       getRegisterData().then((data)=> {
          DeleteRegister(d)
          updateRegister(d)
       
       })

       btnColor(index)
    }

    if(location ==='Registro'){
     
      getRecordData().then(()=>{
         DeleteRecord(d)
         updateRecord(d)
         searchRecord(d)
      })
       btnColor(index)
    }
    
   })
 });
 

}

navigation()