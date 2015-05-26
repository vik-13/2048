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
      var r, c = 3, isRowEnded = false, isUpdated = false;
      for (r = 0; r < 4; r++) {
        while (!isRowEnded) {
          if (map[r * 4 + c] != 0) {
            if (map[r * 4 + c - 1] == 0) {
              _merge(r * 4 + c, r * 4 + c - 1, false);
              isUpdated = true;
            } else if (map[r * 4 + c - 1] == map[r * 4 + c]) {
              _merge(r * 4 + c, r * 4 + c - 1, true);
              isUpdated = true;
            }
            c--;
          } else {
            c--;
          }
          if (c <= 0) {
            isRowEnded = true;
          }
        }
        isRowEnded = false;
        c = 3;
      }
      return isUpdated;
    },
    _goRight = function(){
      var r, c = 0, isRowEnded = false, isUpdated = false;
      for (r = 0; r < 4; r++) {
        while (!isRowEnded) {
          if (map[r * 4 + c] != 0) {
            if (map[r * 4 + c + 1] == 0) {
              _merge(r * 4 + c, r * 4 + c + 1, false);
              isUpdated = true;
            } else if (map[r * 4 + c + 1] == map[r * 4 + c]) {
              _merge(r * 4 + c, r * 4 + c + 1, true);
              isUpdated = true;
            }
            c++;
          } else {
            c++;
          }
          if (c >= 3) {
            isRowEnded = true;
          }
        }
        isRowEnded = false;
        c = 0;
      }
      return isUpdated;
    },
    _goUp = function(){
      var r = 3, c, isRowEnded = false, isUpdated = false;
      for (c = 0; c < 4; c++) {
        while (!isRowEnded) {
          if (map[r * 4 + c] != 0) {
            if (map[(r - 1) * 4 + c] == 0) {
              _merge(r * 4 + c, (r - 1) * 4 + c, false);
              isUpdated = true;
            } else if (map[(r - 1) * 4 + c] == map[r * 4 + c]) {
              _merge(r * 4 + c, (r - 1) * 4 + c, true);
              isUpdated = true;
            }
            r--;
          } else {
            r--;
          }
          if (r <= 0) {
            isRowEnded = true;
          }
        }
        isRowEnded = false;
        r = 3;
      }
      return isUpdated;
    },
    _goDown = function(){
      var r = 0, c, isRowEnded = false, isUpdated = false;
      for (c = 0; c < 4; c++) {
        while (!isRowEnded) {
          if (map[r * 4 + c] != 0) {
            if (map[(r + 1) * 4 + c] == 0) {
              _merge(r * 4 + c, (r + 1) * 4 + c, false);
              isUpdated = true;
            } else if (map[(r + 1) * 4 + c] == map[r * 4 + c]) {
              _merge(r * 4 + c, (r + 1) * 4 + c, true);
              isUpdated = true;
            }
            r++;
          } else {
            r++;
          }
          if (r >= 3) {
            isRowEnded = true;
          }
        }
        isRowEnded = false;
        r = 0;
      }
      return isUpdated;
    },
    _removeNumber = function(element) {
      element.parentNode.removeChild(element);
    },
    _merge = function(from, to, merge) {
      if (merge) {
        map[to] = map[from] + map[to];
        _removeNumber(mapMirror[to]);
      } else {
        map[to] = map[from];
      }
      map[from] = 0;
      mapMirror[to] = mapMirror[from];
      mapMirror[from] = 0;
    },
    _move = function(x, y) {
      var isUpdated, needsUpdate = true, i = 0;
      while (needsUpdate) {
        if (x == 0 && y == -1) {
          needsUpdate = _goLeft();
          if (i == 0) {
            isUpdated = needsUpdate;
          }
        } else if (x == 0 && y == 1) {
          needsUpdate = _goRight();
          if (i == 0) {
            isUpdated = needsUpdate;
          }
        } else if (x == 1 && y == 0) {
          needsUpdate = _goUp();
          if (i == 0) {
            isUpdated = needsUpdate;
          }
        } else if (x == -1 && y == 0) {
          needsUpdate = _goDown();
          if (i == 0) {
            isUpdated = needsUpdate;
          }
        }
        i++;
      }
      if (isUpdated) {
        _updateMirror();
        _addRandom();
      }
    },
    _keypress = function( event ) {
      if (event.keyCode == 37) {
        _move(0, -1);
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