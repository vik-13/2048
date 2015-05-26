;(function(){
  var startCount = 2,
    map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    mapMirror = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    count = 16,

    _initialize = function() {
      _setDefaults();
      _attachEvents();
    },
    _setDefaults = function() {
      var i;
      for(i = 0; i < startCount; i++) {
        _addRandom();
      }
    },
    _isFull = function() {
      var i, isFull = true;
      for (i = 0; i < count; i++) {
        if (map[i] == 0) {
          isFull = false;
        }
      }
    },
    _addRandom = function() {
      var rnd, isAdded = false;
      if (!_isFull()) {
        while (!isAdded) {
          rnd = parseInt( Math.random() * count );
          if (map[rnd] == 0) {
            map[rnd] = 2;
            isAdded = true;
            _AddToMirror(rnd);
          }
        }
      } else {
        _endGame();
      }
    },
    _endGame = function(){
      alert('End!!!');
    },
    _AddToMirror = function(index) {
      var x = index - parseInt( index / 4 ) * 4 + 1,
        y = parseInt( index / 4 ) + 1,
        number = document.createElement('div');
      number.setAttribute( 'class', 'number number-' + map[index] + ' number-position-' + y + '-' + x );
      mapMirror[index] = number;
      document.getElementById('numbers').appendChild(number);
    },
    _updateMirror = function(){
      var i, x, y;
      for (i = 0; i < count; i++) {
        if (mapMirror[i] != 0) {
          x = i - parseInt( i / 4 ) * 4 + 1;
          y = parseInt( i / 4 ) + 1;
          mapMirror[i].setAttribute( 'class', 'number number-' + map[i] + ' number-position-' + y + '-' + x );
        }
      }
    },
    _goLeft = function(){
      var r, c = 3, isRowEnded = false;
      for (r = 0; r < 4; r++) {
        while (!isRowEnded) {
          if (map[r * 4 + c] != 0) {
            if (map[r * 4 + c - 1] == 0) {
              _merge(r * 4 + c, r * 4 + c - 1, false);
            } else if (map[r * 4 + c - 1] == map[r * 4 + c]) {
              _merge(r * 4 + c, r * 4 + c - 1, true);
            }
          }
          if (c == -1) {
            isRowEnded = true;
          }
        }
        c = 1;
      }
      console.log(map);
      _updateMirror();
    },
    _merge = function(from, to, merge){
      if (merge) {
        map[to] = map[from] + map[to];
      } else {
        map[to] = map[from];
      }
      map[from] = 0;
      mapMirror[to] = mapMirror[from];
      mapMirror[from] = 0;
    },
    _move = function(x, y) {
      console.log(x, y);
    },
    _keypress = function( event ) {
      if (event.keyCode == 37) {
        _goLeft();
      } else if (event.keyCode == 38) {
        _move(1, 0);
      } else if (event.keyCode == 39) {
        _move(0, 1);
      } else if (event.keyCode == 40) {
        _move(-1, 0);
      }
    },
    _attachEvents = function(){
      window.addEventListener( 'keydown', _keypress )
    };

  _initialize();
})();