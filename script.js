
'use strict';
const classes = [
 {id:'gentle',title:'Gentle Yoga',description:'Slow, mindful movement and breathwork. A welcoming place to start.',best:'Beginners and anyone wanting a softer pace'},
 {id:'vinyasa',title:'Vinyasa Flow',description:'Movement linked with breathing, with modifications offered.',best:'Students who enjoy an active flow'},
 {id:'restorative',title:'Restorative Yoga',description:'Relaxing, supported poses for rest and recovery.',best:'Anyone looking for deep relaxation'}
];
const settings = {storageKey:'riverbendPreferredClass',defaultClass:'gentle'};
function getSavedClass(){try{return localStorage.getItem(settings.storageKey)}catch{return null}}
function saveClass(id){try{localStorage.setItem(settings.storageKey,id)}catch{/* Page still works when storage is blocked. */}}
function selectClass(id,shouldSave=true){
 const item=classes.find(c=>c.id===id);if(!item)return;
 document.querySelectorAll('input[name="class-choice"]').forEach(r=>r.checked=r.value===id);
 const output=document.getElementById('class-result');
 if(output){output.innerHTML='';const heading=document.createElement('strong');heading.textContent=item.title+' — your selected class';const detail=document.createElement('p');detail.textContent=item.description+' Best for: '+item.best+'.';output.append(heading,detail)}
 const interest=document.getElementById('interest');if(interest){interest.value=id;interest.dispatchEvent(new Event('change'))}
 if(shouldSave)saveClass(id);
}
function setupClassSelector(){const radios=document.querySelectorAll('input[name="class-choice"]');if(!radios.length)return;radios.forEach(r=>r.addEventListener('change',()=>selectClass(r.value)));const saved=getSavedClass();if(saved&&classes.some(c=>c.id===saved))selectClass(saved,false);}
function setError(field,message){const target=document.getElementById(field.id+'-error');if(target)target.textContent=message;field.classList.toggle('invalid',!!message);field.setAttribute('aria-invalid',String(!!message));}
function validateField(field){let error='';const value=field.value.trim();if(field.id==='name'){if(!value)error='Please enter your full name.';else if(value.length<2)error='Your name must have at least 2 characters.'}if(field.id==='email'){if(!value)error='Please enter your email address.';else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))error='Please enter a valid email address.'}if(field.id==='interest'&&!value)error='Please choose a class or event.';setError(field,error);return !error;}
function setupForm(){const form=document.getElementById('interest-form');if(!form)return;const fields=['name','email','interest'].map(id=>document.getElementById(id));fields.forEach(field=>{field.addEventListener('input',()=>validateField(field));field.addEventListener('change',()=>validateField(field))});const saved=getSavedClass();if(saved&&classes.some(c=>c.id===saved))document.getElementById('interest').value=saved;form.addEventListener('submit',e=>{e.preventDefault();let valid=true;fields.forEach(field=>{if(!validateField(field))valid=false});const status=document.getElementById('form-status');if(!valid){status.textContent='Please correct the highlighted fields before continuing.';status.className='error';fields.find(f=>f.classList.contains('invalid'))?.focus();return;}status.className='success';status.textContent='Your request is ready. This demonstration does not send information to the studio.';});}
document.addEventListener('DOMContentLoaded',()=>{setupClassSelector();setupForm()});
