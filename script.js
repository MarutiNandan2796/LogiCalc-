// Core app JS for calculator, unit conversion, age calc, and date/day finder

// --- Helpers ---
function toast(msg, ms=2000){
  const c = document.getElementById('toast');
  const el = document.createElement('div');
  el.className = 'toast-msg toast-enter';
  el.textContent = msg;
  c.appendChild(el);
  // show
  requestAnimationFrame(()=> el.classList.add('toast-show'));
  const close = setTimeout(()=>{ el.remove(); }, ms);
  // allow click to dismiss
  el.addEventListener('click', ()=>{ clearTimeout(close); el.remove(); });
}

function copyText(text){
  if(!navigator.clipboard) return false;
  navigator.clipboard.writeText(text).then(()=>toast('Copied to clipboard'), ()=>toast('Copy failed'));
}

// --- Calculator ---
const display = document.getElementById('calc-display');
const calcButtons = document.querySelectorAll('.calc-btn');
let expr = '';

function safeEval(input){
  if(!/^[0-9+\-*/().\s]+$/.test(input)) throw new Error('Invalid characters');
  return Function('return ('+input+')')();
}

calcButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const v = btn.dataset.val || btn.textContent.trim();
    if(btn.id === 'clear'){ expr=''; display.value=''; return; }
    if(btn.id === 'back'){ expr = expr.slice(0,-1); display.value = expr; return; }
    if(btn.id === 'equals'){
      if(!expr) return;
      try{ const res = safeEval(expr); display.value = res; expr = String(res); }catch(e){ display.value = 'Error'; expr=''; }
      return;
    }
    // numeric/operator button
    expr += v;
    display.value = expr;
  });
});

// add ripple effect on buttons and keyboard-focus visual
document.querySelectorAll('.calc-btn, #equals, #clear, #back, button').forEach(btn=>{
  btn.addEventListener('click', function(e){
    // ripple
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(()=> ripple.remove(), 650);
  });
});

// keyboard support
document.addEventListener('keydown', (e)=>{
  const allowed = '0123456789+-*/().';
  if(allowed.includes(e.key)){
    expr += e.key; display.value = expr;
  } else if(e.key === 'Enter'){
    document.getElementById('equals').click();
  } else if(e.key === 'Backspace'){
    expr = expr.slice(0,-1); display.value = expr;
  } else if(e.key === 'Escape'){
    expr=''; display.value='';
  }
});

// --- Unit Converter ---
const categories = {
  length: ['m','km','cm','mm','in','ft'],
  weight: ['kg','g','lb','oz'],
  temperature: ['C','F','K']
};

const ucCategory = document.getElementById('uc-category');
const ucFrom = document.getElementById('uc-from');
const ucTo = document.getElementById('uc-to');
const ucInput = document.getElementById('uc-input');
const ucResult = document.getElementById('uc-result');
const ucCopy = document.getElementById('uc-copy');

function populateUnits(cat){
  const list = categories[cat];
  ucFrom.innerHTML = '';
  ucTo.innerHTML = '';
  list.forEach(u=>{ ucFrom.appendChild(new Option(u,u)); ucTo.appendChild(new Option(u,u)); });
}

ucCategory.addEventListener('change', ()=>{ populateUnits(ucCategory.value); doConvert(); });
ucFrom.addEventListener('change', doConvert);
ucTo.addEventListener('change', doConvert);
ucInput.addEventListener('input', doConvert);
populateUnits(ucCategory.value);

function convertUnits(cat, val, from, to){
  if(isNaN(val)) return NaN;
  if(cat === 'length'){
    const toMeters = { m:1, km:1000, cm:0.01, mm:0.001, in:0.0254, ft:0.3048 };
    return val * toMeters[from] / toMeters[to];
  }
  if(cat === 'weight'){
    const toKg = {kg:1,g:0.001,lb:0.45359237,oz:0.028349523125};
    return val * toKg[from] / toKg[to];
  }
  if(cat === 'temperature'){
    let c;
    if(from==='C') c = val;
    if(from==='F') c = (val - 32) * 5/9;
    if(from==='K') c = val - 273.15;
    let out;
    if(to==='C') out = c;
    if(to==='F') out = c * 9/5 + 32;
    if(to==='K') out = c + 273.15;
    return out;
  }
  return NaN;
}

function doConvert(){
  const cat = ucCategory.value; const from = ucFrom.value; const to = ucTo.value; const raw = ucInput.value;
  if(raw === ''){ ucResult.textContent = ''; return; }
  const val = parseFloat(raw);
  const out = convertUnits(cat, val, from, to);
  if(isNaN(out)) ucResult.textContent = 'Conversion error'; else ucResult.textContent = `${val} ${from} = ${Number(out.toPrecision(12))} ${to}`;
}

document.getElementById('uc-convert').addEventListener('click', doConvert);
ucCopy.addEventListener('click', ()=>{ if(ucResult.textContent) copyText(ucResult.textContent); });

// --- History handling ---
const historyKey = 'calc_history_v1';
let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
const historyList = document.getElementById('history-list');

function renderHistory(){
  historyList.innerHTML = '';
  history.slice().reverse().forEach((item, idx)=>{
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `<div class="flex justify-between"><div class="truncate">${item.expr} = <strong>${item.result}</strong></div><div class="text-xs text-slate-400 ml-2">${new Date(item.t).toLocaleTimeString()}</div></div>`;
    li.addEventListener('click', ()=>{ expr = item.expr; display.value = expr; toast('Loaded expression'); });
    historyList.appendChild(li);
  });
}

function pushHistory(exprVal, result){
  history.push({expr: exprVal, result: String(result), t: Date.now()});
  localStorage.setItem(historyKey, JSON.stringify(history));
  renderHistory();
}

document.getElementById('history-clear').addEventListener('click', ()=>{ history = []; localStorage.removeItem(historyKey); renderHistory(); toast('History cleared'); });

// update equals behavior to push history when success
const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', ()=>{
  if(!expr) return;
  try{
    const res = safeEval(expr);
    display.value = res; pushHistory(expr, res); expr = String(res);
  }catch(e){ display.value = 'Error'; expr=''; }
});

// render stored history on load
renderHistory();

// --- Age Calculator ---
function calcAge(birth, asof){
  const b = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
  const a = new Date(asof.getFullYear(), asof.getMonth(), asof.getDate());
  if(a < b) return null;
  let years = a.getFullYear() - b.getFullYear();
  let months = a.getMonth() - b.getMonth();
  let days = a.getDate() - b.getDate();
  if(days < 0){ months -= 1; const prevMonth = new Date(a.getFullYear(), a.getMonth(), 0); days += prevMonth.getDate(); }
  if(months < 0){ months += 12; years -= 1; }
  const totalDays = Math.floor((a - b) / (1000*60*60*24));
  return {years, months, days, totalDays};
}

document.getElementById('age-calc').addEventListener('click', ()=>{
  const birthVal = document.getElementById('age-birth').value;
  if(!birthVal){ document.getElementById('age-result').textContent = 'Choose a birthdate'; return; }
  const asofVal = document.getElementById('age-asof').value;
  const birth = new Date(birthVal + 'T00:00:00');
  const asof = asofVal ? new Date(asofVal + 'T00:00:00') : new Date();
  const res = calcAge(birth, asof);
  if(!res){ document.getElementById('age-result').textContent = 'As-of date is before birthdate'; return; }
  const txt = `${res.years} years, ${res.months} months, ${res.days} days (≈ ${res.totalDays} days)`;
  document.getElementById('age-result').textContent = txt;
});

document.getElementById('age-copy').addEventListener('click', ()=>{
  const t = document.getElementById('age-result').textContent; if(t) copyText(t);
});

function stripTime(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

function dayOfYear(d){
  const start = new Date(d.getFullYear(),0,0);
  const diff = d - start + ((start.getTimezoneOffset() - d.getTimezoneOffset())*60*1000);
  return Math.floor(diff / (1000*60*60*24));
}

function getISOWeekNumber(d){
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date - yearStart) / 86400000) + 1)/7);
}

const ddDetails = document.getElementById('dd-details');

function populateScroll(items){
  // now render as a static vertical list in dd-details
  ddDetails.innerHTML = '';
  items.forEach(it=>{
    const li = document.createElement('li');
    li.className = 'px-2 py-1 rounded-md bg-white/60';
    li.textContent = it;
    ddDetails.appendChild(li);
  });
}

// --- Date & Day Finder: Simple mode - pick a date, find weekday ---
const ddDate = document.getElementById('dd-date');
const ddOffset = document.getElementById('dd-offset');
const ddRun = document.getElementById('dd-run');
const ddResult = document.getElementById('dd-result');
const ddCopy = document.getElementById('dd-copy');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Set today as default
ddDate.valueAsDate = new Date();

ddRun.addEventListener('click', () => {
  const dateVal = ddDate.value;
  if (!dateVal) { toast('Please pick a valid date', 2000); return; }
  const selected = new Date(dateVal + 'T00:00:00');
  if (isNaN(selected.getTime())) { toast('Please pick a valid date', 2000); return; }

  const offset = parseInt(ddOffset.value, 10) || 0;

  // compute result date after offset days
  const result = new Date(selected);
  result.setDate(selected.getDate() + offset);

  const weekday = days[result.getDay()];
  const selStr = selected.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const resStr = result.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Show result: weekday for the date after offset
  ddResult.textContent = `${weekday}`;

  // Show details
  const details = [
    `Start Date: ${selStr}`,
    `Offset days: ${offset}`,
    `Result Date: ${resStr}`,
    `Weekday: ${weekday}`,
    `Day of Year: ${dayOfYear(result)}`,
    `ISO Week: ${getISOWeekNumber(result)}`,
    `Weekend: ${result.getDay() === 0 || result.getDay() === 6 ? 'Yes' : 'No'}`
  ];
  populateScroll(details);

  toast('Done!', 1400);
});

// Enter key support
ddDate.addEventListener('keydown', e => { if (e.key === 'Enter') ddRun.click(); });
if (ddOffset) ddOffset.addEventListener('keydown', e => { if (e.key === 'Enter') ddRun.click(); });

document.getElementById('dd-copy').addEventListener('click', ()=>{ const t = ddResult.textContent; if(t) copyText(t); });

// small helper: leave as-of empty by default
(function setDefaults(){ if(!document.getElementById('age-asof').value) document.getElementById('age-asof').value = ''; })();

