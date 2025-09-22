// Simple SPA router + page initializers
(function(){
  const App = {
    initializeTheme(){
      const root = document.documentElement;
      const saved = localStorage.getItem('theme');
      if(saved === 'dark') root.classList.add('dark');
      document.addEventListener('click', (e)=>{
        const target = e.target;
        if(!(target instanceof Element)) return;
        if(target.id === 'modeToggle' || target.id === 'modeToggleTop' || target.id === 'sidebarToggle'){
          root.classList.toggle('dark');
          localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
        }
      });
    },

    bindRouter(){
      document.addEventListener('click', (e)=>{
        const el = e.target;
        if(!(el instanceof Element)) return;
        const link = el.closest('[data-link]');
        if(link){
          e.preventDefault();
          const route = link.getAttribute('data-route');
          if(route){
            this.loadRoute(route, true);
          }
        }
      });
      window.addEventListener('popstate', ()=>{
        this.loadRoute(location.pathname.replace(/^\//,''), false);
      });
    },

    async loadRoute(route, push){
      try{
        const res = await fetch(route, {cache:'no-cache'});
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newBody = doc.body;
        document.body.replaceWith(newBody);
        if(push) history.pushState({}, '', route);
        this.initPerPage();
        window.scrollTo({top:0,behavior:'smooth'});
      }catch(err){
        console.error('Navigation error:', err);
        window.location.href = route; // fallback
      }
    },

    initLanding(){
      if(document.body.dataset.page !== 'landing') return;
      const yearEl = document.getElementById('year');
      if(yearEl) yearEl.textContent = new Date().getFullYear();
    },

    initDashboard(){
      if(document.body.dataset.page !== 'dashboard') return;
      const ctx = document.getElementById('weeklyChart');
      if(!ctx) return;
      const isDark = document.documentElement.classList.contains('dark');
      const gridColor = isDark ? 'rgba(226,232,240,0.1)' : 'rgba(45,55,72,0.1)';
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
      new Chart(ctx,{
        type:'line',
        data:{
          labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          datasets:[{
            label:'Accuracy %',
            data:[78,81,80,83,85,86,84],
            borderColor:'#5A67D8',
            backgroundColor:'rgba(90,103,216,0.2)',
            tension:.35,
            fill:true,
            pointRadius:3
          }]
        },
        options:{
          responsive:true,
          plugins:{legend:{display:false}},
          scales:{
            x:{grid:{color:gridColor},ticks:{color:textColor}},
            y:{grid:{color:gridColor},ticks:{color:textColor,min:0,max:100}}
          }
        }
      });
    },

    initTest(){
      if(document.body.dataset.page !== 'test') return;
      const startBtn = document.getElementById('startTestBtn');
      const cancelBtn = document.getElementById('cancelTestBtn');
      const testArea = document.getElementById('testArea');
      const form = document.getElementById('testForm');
      const questionsWrap = document.getElementById('questions');
      const resultsArea = document.getElementById('resultsArea');
      const scoreLine = document.getElementById('scoreLine');

      const mockQuestions = [
        {q:'If f(x)=2x+3, what is f(4)?', options:['9','10','11','12'], a:2},
        {q:'P(A)=0.6, P(B)=0.5, if independent, P(A∩B)=?', options:['0.1','0.2','0.3','0.6'], a:2},
        {q:'Solve: 2x^2 - 8 = 0', options:['x=±2','x=±√2','x=±4','x=±√8'], a:0},
        {q:'Mean of 2,4,6,8', options:['4.5','5','5.5','6'], a:1},
        {q:'Mode of [3,3,4,5,6,6,6,7]', options:['3','4','6','7'], a:2}
      ];

      function renderQuestions(){
        questionsWrap.innerHTML = '';
        mockQuestions.forEach((m,idx)=>{
          const block = document.createElement('div');
          block.className = 'question card';
          block.innerHTML = `
            <div style="font-weight:600;margin-bottom:6px">Q${idx+1}. ${m.q}</div>
            <div class="options">
              ${m.options.map((opt,i)=>`<label class="option"><input type="radio" name="q${idx}" value="${i}" required> ${opt}</label>`).join('')}
            </div>`;
          questionsWrap.appendChild(block);
        });
      }

      function start(){
        renderQuestions();
        testArea.style.display = '';
        resultsArea.style.display = 'none';
        window.scrollTo({top:0,behavior:'smooth'});
      }

      function cancel(){
        testArea.style.display = 'none';
      }

      function score(){
        const data = new FormData(form);
        let correct = 0;
        mockQuestions.forEach((m,idx)=>{
          const val = data.get(`q${idx}`);
          if(val !== null && Number(val) === m.a) correct++;
        });
        const total = mockQuestions.length;
        const accuracy = Math.round((correct/total)*100);
        scoreLine.textContent = `Score: ${correct}/${total} • Accuracy: ${accuracy}%`;
        testArea.style.display = 'none';
        resultsArea.style.display = '';

        const ctx = document.getElementById('resultChart');
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
        new Chart(ctx,{
          type:'doughnut',
          data:{
            labels:['Correct','Incorrect'],
            datasets:[{data:[correct,total-correct],backgroundColor:['#38B2AC','#F6AD55']}]
          },
          options:{plugins:{legend:{labels:{color:textColor}}}}
        });
      }

      if(startBtn) startBtn.addEventListener('click', start);
      if(cancelBtn) cancelBtn.addEventListener('click', cancel);
      if(form) form.addEventListener('submit', (e)=>{e.preventDefault(); score();});
    },

    initProgress(){
      if(document.body.dataset.page !== 'progress') return;
      const acc = document.getElementById('accuracyChart');
      const prac = document.getElementById('practiceChart');
      if(!acc || !prac) return;
      const isDark = document.documentElement.classList.contains('dark');
      const gridColor = isDark ? 'rgba(226,232,240,0.1)' : 'rgba(45,55,72,0.1)';
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();

      new Chart(acc,{
        type:'line',
        data:{labels:['W1','W2','W3','W4','W5','W6'],datasets:[{label:'Accuracy',data:[70,74,76,80,83,85],borderColor:'#5A67D8',backgroundColor:'rgba(90,103,216,0.2)',tension:.35,fill:true}]},
        options:{plugins:{legend:{display:false}},scales:{x:{grid:{color:gridColor},ticks:{color:textColor}},y:{grid:{color:gridColor},ticks:{color:textColor,min:0,max:100}}}}
      });
      new Chart(prac,{
        type:'bar',
        data:{labels:['W1','W2','W3','W4','W5','W6'],datasets:[{label:'Questions',data:[60,75,90,110,120,140],backgroundColor:'#38B2AC',borderRadius:8}]},
        options:{plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:textColor}},y:{grid:{color:gridColor},ticks:{color:textColor}}}}
      });
    },

    initPerPage(){
      // Rebind router and theme toggles remain on document/head; only per-page init here
      this.initLanding();
      this.initDashboard();
      this.initTest();
      this.initProgress();
    },

    boot(){
      this.initializeTheme();
      this.bindRouter();
      this.initPerPage();
    }
  };

  // Boot once
  App.boot();
})();


