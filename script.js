// Facilitator Kit — a live-session reference, not a learner page.
// Nothing here is saved or sent anywhere; the search/filter state is
// in-memory only and resets on reload.

var TIMELINE = [
  { time: '0:00–0:15', title: 'Welcome and warm-up', asset: null,
    detail: 'Agenda overview. Privacy reminder: made-up names, dates and numbers only.' },
  { time: '0:15–0:40', title: 'Reading: Framing and the Five Refinement Moves', asset: 'READ01',
    detail: 'Learners go through all 6 pages individually. Recovery: read the page 6 recap aloud if devices are slow.' },
  { time: '0:40–1:20', title: 'Live demo: weak-to-usable request', asset: null,
    detail: 'Facilitator demonstrates live, six-turn refinement. See the script below.' },
  { time: '1:20–1:30', title: 'Break', asset: null, isBreak: true, detail: '' },
  { time: '1:30–1:45', title: 'Card: Request Builder and Refinement Card', asset: 'CARD01',
    detail: 'Learners build one request and flip to see the five moves.' },
  { time: '1:45–2:35', title: 'Lab 1: Rewrite Five Weak Requests', asset: 'LAB01',
    detail: 'Independent practice, 5 exercises. Fast finishers: start Lab 2 early. Offline: use the printed Card.' },
  { time: '2:35–2:50', title: 'Break', asset: null, isBreak: true, detail: '' },
  { time: '2:50–3:30', title: "Lab 2: Your Own Task, Framed and Refined", asset: 'LAB02',
    detail: 'Learners pick one real task from their week and go through all 5 steps.' },
  { time: '3:30–3:55', title: 'Practice Bot: Framing and Refining', asset: 'BOT01',
    detail: 'Shared-device rotation point: one learner drives, one reads the question aloud, then swap at the halfway mark.' },
  { time: '3:55–4:15', title: 'Peer Exchange', asset: 'COMM01',
    detail: 'Pair learners. Repeat the privacy reminder and the respectful-disagreement phrase before they start.' },
  { time: '4:15–4:45', title: 'Section Check', asset: 'EVAL01',
    detail: '70% to pass, unlimited attempts. Note who needs a retry before the next session.' },
  { time: '4:45–5:00', title: 'Resources and wrap-up', asset: 'RES01',
    detail: 'Point to the optional resource list. Read the five-line recap. Close.' }
];

var DEMO = [
  { num: 1, move: 'Turn 1 — the weak request', say: 'Let’s watch what happens with a weak request. I will type exactly this into our approved AI tool: "Write about workshop safety."',
    guidance: 'Let the output finish loading. Do not scroll past it quickly — let learners see how generic and unfocused it is.' },
  { num: 2, move: 'Turn 2 — Narrow', say: 'That covers too much. Watch me narrow it. I will type: "Only tell me about lathe safety."',
    guidance: 'Point out that the new answer is shorter and focused on one machine.' },
  { num: 3, move: 'Turn 3 — Expand', say: 'Now watch me expand it, since it skipped useful detail. I will type: "Tell me more about what to check before starting the lathe."',
    guidance: 'Point out the answer now has more concrete detail.' },
  { num: 4, move: 'Turn 4 — Change register', say: 'The wording is a bit technical for new trainees. Watch me change the tone. I will type: "Say this simply, for a first-year trainee."',
    guidance: 'Compare the two versions side by side if your tool keeps history.' },
  { num: 5, move: 'Turn 5 — Check it', say: 'Now I will ask it to check itself. I will type: "What might be wrong here?"',
    guidance: 'This is the most important moment in the demo. If the AI flags an assumption, a made-up rule, or a number nobody gave it, stop and point this out explicitly.' },
  { num: 6, move: 'Turn 6 — Combine', say: 'Finally, I have two versions from earlier practice. Watch me combine them. I will type: "Combine the best parts of both versions."',
    guidance: 'Close by reading the final result aloud and asking the class: "Would I check this before pinning it to the noticeboard?" — this reinforces the stop rule.' }
];

var CONTINGENCIES = [
  { title: 'Fast finishers', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    body: 'Let them start the next lab early, or try one more weak request of their own.' },
  { title: 'Offline fallback', icon: 'M12 2a10 10 0 1 0 0.001 0zM12 6v6l4 2',
    body: 'Switch to the printed Request Builder and Refinement Card (CARD01) and a paper worksheet.' },
  { title: 'Shared-device rotation', icon: 'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3',
    body: 'One learner drives, one reads the question aloud and checks the answer. Swap at the halfway point of that block.' },
  { title: 'Access failure', icon: 'M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10',
    body: 'If a device or connection fails completely, move that learner to the offline Card and worksheet; reconnect them to the digital flow at the next natural break.' }
];

var ANSWERS = [
  { cluster: 'Concept', q: 'Does a longer prompt always work better?',
    direct: 'No.', reason: 'A long prompt can still be vague. A clear, complete one beats a long one.',
    next: 'Show the 4-part flow diagram again (Reading, page 1).' },
  { cluster: 'Concept', q: 'Do learners need to use all 5 refinement moves every time?',
    direct: 'No — only the one that fixes the actual problem.', reason: 'Each move fixes a different defect; the wrong one wastes a turn.',
    next: 'Point to the move-reminder chips on the Card, Side 2.' },
  { cluster: 'Access', q: "What if a learner's device won't connect to the AI tool?",
    direct: 'Switch them to the offline Prompt Card and paper worksheet.', reason: 'The card has the same request-builder and moves, on paper.',
    next: 'Move them to a working device once one frees up.' },
  { cluster: 'Access', q: 'What if two learners must share one device?',
    direct: 'One drives, one reads the question aloud and checks the answer — swap at the halfway point.', reason: 'Both learners need their own attempt and evidence.',
    next: 'Set a visible timer for the swap.' },
  { cluster: 'Privacy', q: "Can a learner use their real name or a friend's real details in an example?",
    direct: 'No — only made-up names, dates and numbers.', reason: 'This keeps everyone’s real information out of an AI tool.',
    next: 'Offer a made-up example on the board if a learner is stuck for one.' },
  { cluster: 'Privacy', q: 'A learner typed a real phone number or ID number by mistake. What do I do?',
    direct: 'Ask them to stop, delete it, and replace it with a made-up one before sending.', reason: 'Real personal data should never reach the AI tool.',
    next: "If it was already sent, note it for the production/IT owner — don't alarm the learner." },
  { cluster: 'Accuracy', q: 'What if the AI gives a wrong answer in front of the whole class?',
    direct: 'Say so, out loud, calmly.', reason: "It's a teaching moment, not a failure — it shows exactly why the check-before-use habit matters.",
    next: 'Follow the wrong-answer-in-class protocol below.' },
  { cluster: 'Accuracy', q: 'What if the AI invents a date, rule or penalty nobody asked for?',
    direct: "Point it out immediately: “Notice that — nobody gave it that number.”", reason: 'This is the single most important safety habit in this section.',
    next: 'Ask the class: "What move fixes this?" (answer: Check it)' },
  { cluster: 'Language', q: 'Can a learner type their request in Gujarati?',
    direct: 'Yes, if their AI tool supports it.', reason: 'The standard being taught is the same in either language.',
    next: "If you're unsure the tool supports Gujarati, have them try a short test line first." },
  { cluster: 'Language', q: 'Does a request need perfect spelling?',
    direct: 'No.', reason: 'AI tools generally understand imperfect spelling; clarity matters more.',
    next: 'Reassure the learner and move on.' },
  { cluster: 'Assessment', q: 'Does the Section Check count toward a final grade?',
    direct: "No — check the workbook; this section is marked 'Not counted.'", reason: "It's a mastery check for the learner's own benefit, not a scored assessment.",
    next: "For grading-policy questions beyond this, say: “I will verify this.”" },
  { cluster: 'Assessment', q: 'A learner failed the Section Check. What now?',
    direct: 'They can retake it right away — there is no limit on attempts.', reason: '70% is the pass mark, and each attempt reshuffles the questions.',
    next: 'Suggest they review the recap on the reading page first.' },
  { cluster: 'Escalation', q: "A learner asks a policy question you're not sure about.",
    direct: '"I will verify this and confirm with you before the next session."', reason: "Don't improvise on policy — it needs a confirmed answer.",
    next: 'Note the question and follow up with the programme owner.' },
  { cluster: 'Escalation', q: 'A learner reports the AI tool asked for payment or a personal login.',
    direct: 'Tell them to stop and close it immediately.', reason: 'Only the approved AI tool for this session should be used, and it should never require payment.',
    next: 'Flag this to the production/IT owner right away.' }
];

var PROTOCOL = [
  'Stay calm. Say it out loud: "That’s a good example of checking before use."',
  'Ask the class: "What’s wrong with this answer?"',
  'Apply the right move together as a class — usually Check it.',
  'Show the corrected answer.',
  'Note the moment in your facilitator log as a teaching example, not a failure.'
];

document.addEventListener('DOMContentLoaded', function () {
  // Timeline
  var timelineList = document.getElementById('timeline-list');
  TIMELINE.forEach(function (b) {
    var block = document.createElement('div');
    block.className = 'timeline-block' + (b.isBreak ? ' break' : '');
    var time = document.createElement('span');
    time.className = 'timeline-time';
    time.textContent = b.time;
    block.appendChild(time);
    var body = document.createElement('div');
    var title = document.createElement('p');
    title.className = 'timeline-title';
    title.textContent = b.title;
    body.appendChild(title);
    if (b.asset) {
      var assetTag = document.createElement('span');
      assetTag.className = 'timeline-asset';
      assetTag.textContent = b.asset;
      body.appendChild(assetTag);
    }
    if (b.detail) {
      var detail = document.createElement('p');
      detail.className = 'timeline-detail';
      detail.textContent = b.detail;
      body.appendChild(detail);
    }
    block.appendChild(body);
    timelineList.appendChild(block);
  });

  // Live demo
  var demoList = document.getElementById('demo-list');
  DEMO.forEach(function (d) {
    var turn = document.createElement('div');
    turn.className = 'demo-turn';
    turn.innerHTML =
      '<div class="demo-turn-head"><span class="demo-num">' + d.num + '</span><span class="demo-move">' + d.move + '</span></div>' +
      '<p class="demo-say"><span class="say-chip">SAY THIS</span> &nbsp;' + d.say + '</p>' +
      '<p class="demo-guidance">' + d.guidance + '</p>';
    demoList.appendChild(turn);
  });

  // Contingencies
  var contingencyGrid = document.getElementById('contingency-grid');
  CONTINGENCIES.forEach(function (c) {
    var card = document.createElement('div');
    card.className = 'contingency-card';
    card.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="' + c.icon + '"></path></svg>' +
      '<p class="contingency-title">' + c.title + '</p>' +
      '<p class="contingency-body">' + c.body + '</p>';
    contingencyGrid.appendChild(card);
  });

  // Answer bank: cluster chips
  var clusters = ['all'].concat(ANSWERS.map(function (a) { return a.cluster; }).filter(function (v, i, arr) { return arr.indexOf(v) === i; }));
  var clusterFilter = document.getElementById('cluster-filter');
  clusters.slice(1).forEach(function (c) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'filter-chip';
    chip.setAttribute('data-cluster', c);
    chip.textContent = c;
    clusterFilter.appendChild(chip);
  });

  var answerList = document.getElementById('answer-list');
  var noResults = document.getElementById('no-results');
  var searchInput = document.getElementById('answer-search');
  var activeCluster = 'all';

  function renderAnswers() {
    answerList.innerHTML = '';
    var term = searchInput.value.trim().toLowerCase();
    var shown = 0;
    ANSWERS.forEach(function (a, i) {
      var matchesCluster = activeCluster === 'all' || a.cluster === activeCluster;
      var haystack = (a.q + ' ' + a.direct + ' ' + a.reason).toLowerCase();
      var matchesSearch = !term || haystack.indexOf(term) !== -1;
      if (!matchesCluster || !matchesSearch) return;
      shown++;

      var item = document.createElement('div');
      item.className = 'acc-item';
      var header = document.createElement('button');
      header.type = 'button';
      header.className = 'acc-header';
      header.innerHTML = '<span><span class="acc-cluster">' + a.cluster + '</span>' + a.q + '</span><svg class="acc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      var body = document.createElement('div');
      body.className = 'acc-body';
      body.innerHTML = '<div class="acc-body-inner">' +
        '<p class="answer-part"><span class="k">Direct: </span>' + a.direct + '</p>' +
        '<p class="answer-part"><span class="k">Reason: </span>' + a.reason + '</p>' +
        '<p class="answer-part"><span class="k">Next: </span>' + a.next + '</p>' +
        '</div>';
      header.addEventListener('click', function () {
        item.classList.toggle('open');
      });
      item.appendChild(header);
      item.appendChild(body);
      answerList.appendChild(item);
    });
    noResults.hidden = shown !== 0;
  }

  clusterFilter.addEventListener('click', function (e) {
    var chip = e.target.closest('.filter-chip');
    if (!chip) return;
    clusterFilter.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
    chip.classList.add('active');
    activeCluster = chip.getAttribute('data-cluster');
    renderAnswers();
  });
  searchInput.addEventListener('input', renderAnswers);
  renderAnswers();

  // Protocol
  var protocolSteps = document.getElementById('protocol-steps');
  PROTOCOL.forEach(function (step) {
    var li = document.createElement('li');
    li.textContent = step;
    protocolSteps.appendChild(li);
  });
});
