var id = document.getElementById("drawflow");
const editor = new Drawflow(id);
editor.reroute = true;
editor.start();

/* DRAG EVENT */

/* Mouse and Touch Actions */

var elements = document.getElementsByClassName('drag-drawflow');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('touchend', drop, false);
  elements[i].addEventListener('touchmove', positionMobile, false);
  elements[i].addEventListener('touchstart', drag, false );
}

var mobile_item_selec = '';
var mobile_last_move = null;
function positionMobile(ev) {
  mobile_last_move = ev;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (ev.type === "touchstart") {
    mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
  } else {
  ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
  }
}

function drop(ev) {
  if (ev.type === "touchend") {
    var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
    if(parentdrawflow != null) {
      addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
    }
    mobile_item_selec = '';
  } else {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("node");
    addNodeToDrawFlow(data, ev.clientX, ev.clientY);
  }
}

function addNodeToDrawFlow(name, pos_x, pos_y) {
  if(editor.editor_mode === 'fixed') {
    return false;
  }
  pos_x = pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
  pos_y = pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));


  switch (name) {

    case 'start-workflow':
    var start_workflow = `
      <div class="element-box element-start-workflow"></div>
      <div class="label-box">Start</div>`;
      editor.addNode('start-workflow', 0,  1, pos_x, pos_y, 'start-workflow', { id: "1234" }, start_workflow );
      break;

    case 'end':
    var end = `
      <div class="element-box element-end"></div>
      <div class="label-box">End</div>
    `;
      editor.addNode('end', 1,  0, pos_x, pos_y, 'end', {}, end );
      break;

    case 'api':
    var api = `
      <div class="element-box element-api"></div>
      <div class="label-box">RestAPI</div>
    `;
      editor.addNode('api', 1,  1, pos_x, pos_y, 'api', { id: "1234abs" }, api );
      break;

    case 'file':
    var file = `
      <div class="element-box element-file"></div>
      <div class="label-box">FileSystem</div>
    `;
      editor.addNode('file', 1,  1, pos_x, pos_y, 'file', {}, file );
      break;

    case 'excel':
    var excel = `
      <div class="element-box element-excel"></div>
      <div class="label-box">Excel</div>`;
      editor.addNode('excel', 1,  1, pos_x, pos_y, 'excel', {}, excel );
      break;
  
    case 'decision':
    var decision = `
      <div class="element-box-decision element-decision"><div></div></div>
      <div class="label-box">Decision</div>`;
      editor.addNode('decision', 1,  1, pos_x, pos_y, 'decision', {}, decision );
      break;

    case 'ftp':
    var ftp = `
      <div class="element-box element-ftp"></div>
      <div class="label-box">FTP</div>`;
      editor.addNode('ftp', 1,  1, pos_x, pos_y, 'ftp', {}, ftp );
      break;

    case 'expression':
    var expression = `
      <div class="element-box element-expression"></div>
      <div class="label-box">Expression</div>`;
      editor.addNode('expression', 1,  1, pos_x, pos_y, 'expression', {}, expression );
      break;

    case 'database':
    var database = `
      <div class="element-box element-database"></div>
      <div class="label-box">DataBase</div>`;
      editor.addNode('database', 1,  1, pos_x, pos_y, 'database', {}, database );
      break;

    case 'mail':
    var mail = `
      <div class="element-box element-mail"></div>
      <div class="label-box">E-mail</div>`;
      editor.addNode('mail', 1,  1, pos_x, pos_y, 'mail', {}, mail );
      break;

    default:
  }
}
