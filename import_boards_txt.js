var fs = require('fs');

///Applications/Arduino.app/Contents/Resources/Java/hardware/arduino/boards.txt
var txtfile = process.argv[2];
console.log("reading",txtfile);
var txt = fs.readFileSync(txtfile).toString();
console.log(txt);

var boards = {};

txt.split('\n').forEach(function(line){
    if(line.indexOf("#") == 0) return;
    if(line.length == 0) return;
    var parts = line.split('=');
    var ref = parts[0];
    var value = parts[1];
    var refs = ref.split('.');

    var root = boards;
    for(var i=0; i<refs.length; i++) {
        var sec = refs[i];
        if(!root[sec]) {
            root[sec] = {};
        }
        if(i == refs.length-1) {
            root[sec] = value;
        }
        root = root[sec];
    }


})

for(var id in boards) {
    var board = boards[id];
    board.id = id;
    console.log("board = ",id);
    var path = 'boards/'+id+'.json';
    console.log('writing to',path);
    fs.writeFileSync(path,JSON.stringify(board,null,'    '));
}
