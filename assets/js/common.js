window.onload = function () {

  //create HTML
  let screen = document.createElement('div');
  screen.className = 'wrap-screen';
  screen.innerHTML = '<textarea class="screen-txt" id="screen" rows="5" autofocus></textarea>';
  document.body.append(screen);
  let wrapRow = document.createElement('div');
  wrapRow.className = 'wrap-keyboard';
  document.body.append(wrapRow);
  let enRu = document.createElement('div');
  enRu.className = 'en-ru';
  enRu.innerHTML = 'Changing keyboard language: press Ctrl Left + Alt Left';
  document.body.append(enRu);

  // information about all buttons
  let keyboard = {
    row0: {
      Backquote: ['`', '~', 'ё', 'Ё'], Digit1: ['1', '!', '1', '!'], Digit2: ['2', '@', '2', '&#34;'], Digit3: ['3', '#', '3', '№'],
      Digit4: ['4', '$', '4', ';'], Digit5: ['5', '%', '5', '%'], Digit6: ['6', '^', '6', ':'], Digit7: ['7', '&', '7', '?'], Digit8: ['8', '*', '8', '*'],
      Digit9: ['9', '(', '9', '('], Digit0: ['0', ')', '0', ')'], Minus: ['-', '_', '-', '_'], Equal: ['=', '+', '=', '+'], Backspace: ['Backspace', 'Backspace', 'Backspace', 'Backspace']
    },
    row1: {
      Tab: ['Tab', 'Tab', 'Tab', 'Tab'], KeyQ: ['q', 'Q', 'й', 'Й'], KeyW: ['w', 'W', 'ц', 'Ц'], KeyE: ['e', 'E', 'у', 'У'],
      KeyR: ['r', 'R', 'к', 'К'], KeyT: ['t', 'T', 'е', 'Е'], KeyY: ['y', 'Y', 'н', 'Н'], KeyU: ['u', 'U', 'г', 'Г'], KeyI: ['i', 'I', 'ш', 'Ш'],
      KeyO: ['o', 'O', 'щ', 'Щ'], KeyP: ['p', 'P', 'З', 'з'], BracketLeft: ['[', '{', 'х', 'Х'], BracketRight: [']', '}', 'ъ', 'Ъ'], Backslash: ['&#92;', '|', '&#92;', '&#47;'], Delete: ['Del', 'Del', 'Del', 'Del']
    },
    row2: {
      CapsLock: ['Caps lock', 'Caps lock', 'Caps lock', 'Caps lock'], KeyA: ['a', 'A', 'ф', 'Ф'], KeyS: ['s', 'S', 'ы', 'Ы'], KeyD: ['d', 'D', 'в', 'В'],
      KeyF: ['f', 'F', 'а', 'А'], KeyG: ['g', 'G', 'п', 'П'], KeyH: ['h', 'H', 'р', 'Р'], KeyJ: ['j', 'J', 'о', 'О'], KeyK: ['k', 'K', 'л', 'Л'],
      KeyL: ['l', 'L', 'д', 'Д'], Semicolon: [';', ':', 'ж', 'Ж'], Quote: ['&#781;', '&#782;', 'э', 'Э'], Enter: ['Enter', 'Enter', 'Enter', 'Enter']
    },
    row3: {
      ShiftLeft: ['Shift', 'Shift', 'Shift', 'Shift'], KeyZ: ['z', 'Z', 'я', 'Я'], KeyX: ['x', 'X', 'ч', 'Ч'], KeyC: ['c', 'C', 'с', 'С'],
      KeyV: ['v', 'V', 'м', 'М'], KeyB: ['b', 'B', 'и', 'И'], KeyN: ['n', 'N', 'т', 'Т'], KeyM: ['m', 'M', 'ь', 'Ь'], Comma: [',', '<', 'б', 'Б'],
      Period: ['.', '>', 'ю', 'Ю'], Slash: ['/', '?', '.', ','], ArrowUp: ['&#8593;', '&#8593;', '&#8593;', '&#8593;'], ShiftRight: ['Shift', 'Shift', 'Shift', 'Shift']
    },
    row4: {
      ControlLeft: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'], MetaLeft: ['Win', 'Win', 'Win', 'Win'], AltLeft: ['Alt', 'Alt', 'Alt', 'Alt'], Space: [' ', ' ', ' ', ' '],
      AltRight: ['Alt', 'Alt', 'Alt', 'Alt'], ArrowLeft: ['&#8592;', '&#8592;', '&#8592;', '&#8592;'], ArrowDown: ['&#8595;', '&#8595;', '&#8595;', '&#8595;'],
      ArrowRight: ['&#8594;', '&#8594;', '&#8594;', '&#8594;'], ControlRight: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl']
    }
  }
  let shift = 'shiftOff';

  function getCookie(name) {
    let langCookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return langCookie ? langCookie[2] : null;
  }

  let lang = getCookie('lang') ? getCookie('lang') : 'en';

  function createKeyboard(keyboard, langKey, shift) {
    let changeBtn;
    for (let row in keyboard) {
      let rowBtns = document.createElement('div');
      rowBtns.className = 'row-key ' + row;
      document.querySelector('.wrap-keyboard').append(rowBtns);
      if (langKey == 'en' && shift == 'shiftOff') {
        changeBtn = 0;
      } else if (langKey == 'en' && shift == 'shiftOn') {
        changeBtn = 1;
      } else if (langKey == 'ru' && shift == 'shiftOff') {
        changeBtn = 2;
      } else {
        changeBtn = 3;
      }
      for (let key in keyboard[row]) {
        document.querySelector('.' + row).innerHTML += '<div class="key" id=' + key + '><div class="key-symb">' + keyboard[row][key][changeBtn] + '</div></div>';
      }
    }
  }

  // onload generate keyboard 
  createKeyboard(keyboard, lang, 'shiftOff');

  // function -- write letters with virtual keyboard
  function writeMouse() {
    const getKey = document.querySelectorAll('.key');
    getKey.forEach(function (btn) {
      btn.addEventListener('mousedown', function () {
        let idKey = this.id;
        switch (idKey) {
          case 'Tab':
            document.getElementById('screen').value = document.getElementById('screen').value + '    ';
            break;
          case 'Enter':
            document.getElementById('screen').value = document.getElementById('screen').value + '\n';
            break;
          case 'ControlRight':
          case 'ControlLeft':
          case 'AltLeft':
          case 'AltRight':
          case 'MetaLeft':
          case 'Delete':
            break;
          case 'Backspace':
            document.getElementById('screen').value = document.getElementById('screen').value.substr(0, document.getElementById('screen').value.length - 1);
            break;
          case 'CapsLock':
            if (shift == 'shiftOff') {
              document.querySelector('.wrap-keyboard').innerHTML = '';
              createKeyboard(keyboard, lang, 'shiftOn');
              shift = 'shiftOn';
            } else {
              document.querySelector('.wrap-keyboard').innerHTML = '';
              createKeyboard(keyboard, lang, 'shiftOff');
              shift = 'shiftOff';
            }
            writeMouse();
            break;
          case 'ShiftLeft':
          case 'ShiftRight':
            keyboardShift();
            writeMouse();
            break;
          default:
            document.getElementById('screen').value = document.getElementById('screen').value + document.getElementById(idKey).children[0].textContent;
            break;
        }
        document.getElementById(idKey).classList.add("key-active");
      });
      btn.addEventListener('mouseup', function () {
        let idKey = this.id;
        document.getElementById(idKey).classList.remove('key-active');
        switch (idKey) {
          case 'ShiftLeft':
          case 'ShiftRight':
            document.querySelector('.wrap-keyboard').innerHTML = '';
            createKeyboard(keyboard, lang, 'shiftOff');
            writeMouse();
            break;
          default:
            break;
        }
      });
    });
  }

  writeMouse();

  // CapsLock press
  function keyboardCaps() {
    if (event.code == 'CapsLock' && (shift == 'shiftOff')) {
      document.querySelector('.wrap-keyboard').innerHTML = '';
      createKeyboard(keyboard, lang, 'shiftOn');
      shift = 'shiftOn';
    } else {
      document.querySelector('.wrap-keyboard').innerHTML = '';
      createKeyboard(keyboard, lang, 'shiftOff');
      shift = 'shiftOff';
    }
    writeMouse();
  }

  //Shift Left or Shift Right press
  function keyboardShift() {
    document.querySelector('.wrap-keyboard').innerHTML = '';
    createKeyboard(keyboard, lang, 'shiftOn');
  }

  document.addEventListener('keydown', function (e) {
    let idKey = event.code;
    switch (event.code) {
      case 'CapsLock':
        keyboardCaps();
        break;
      case 'ControlRight':
      case 'ControlLeft':
      case 'AltLeft':
      case 'AltRight':
      case 'MetaLeft':
      case 'Delete':
        break;
      case 'ShiftRight':
        keyboardShift();
        break;
      case 'ShiftLeft':
        keyboardShift();
        break;
      case 'Tab':
        e.preventDefault();
        document.getElementById('screen').value = document.getElementById('screen').value + '    ';
        break;
      case 'Enter':
        e.preventDefault();
        document.getElementById('screen').value = document.getElementById('screen').value + '\n';
        break;
      case 'Backspace':
        e.preventDefault();
        document.getElementById('screen').value = document.getElementById('screen').value.substr(0, document.getElementById('screen').value.length - 1);
        break;
      default:
        e.preventDefault();
        document.getElementById('screen').value = document.getElementById('screen').value + document.getElementById(idKey).children[0].textContent;
        break;
    }
  });

  document.addEventListener('keyup', function () {
    switch (event.code) {
      case 'ShiftRight':
        document.querySelector('.wrap-keyboard').innerHTML = '';
        createKeyboard(keyboard, lang, 'shiftOff');
        break;
      case 'ShiftLeft':
        document.querySelector('.wrap-keyboard').innerHTML = '';
        createKeyboard(keyboard, lang, 'shiftOff');
        break;
      default:
    }
  });

  // function -- change language
  function changeLang() {
    if (lang == 'en') {
      lang = 'ru';
      document.cookie = "lang = ru";
    } else {
      lang = 'en';
      document.cookie = "lang = en";
    }
    document.querySelector('.wrap-keyboard').innerHTML = '';
    createKeyboard(keyboard, lang, 'shiftOff');
    writeMouse();
  }

  function runOnKeys(...codes) {
    let pressed = new Set();
    document.addEventListener('keydown', function (event) {
      pressed.add(event.code);
      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();
      setTimeout(changeLang, 400);
    });
    document.addEventListener('keyup', function (event) {
      pressed.delete(event.code);
    });
  }

  // change language: Shift Left + Ctrl Left 
  runOnKeys(
    'ControlLeft',
    'AltLeft'
  );

  // function -- highlight press buttons
  document.addEventListener('keydown', function (event) {
    document.getElementById('screen').focus();
    let pressKey = event.code;
    let element = document.getElementById(pressKey);
    element.classList.add("key-active");
  });
  document.addEventListener('keyup', function (event) {
    let pressKey = event.code;
    let element = document.getElementById(pressKey);
    element.classList.remove('key-active');
  });

}
