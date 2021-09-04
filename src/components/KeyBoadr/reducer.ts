
export function reducer(state: { value: string }, action): any {
  const { type, payload } = action;
  const { value } = state;
  const setValue = setValueHandle(state);
  switch (type) {
    case 'add':
      let lastChar = value.charAt(value.length - 1);

      if (lastChar === '+' || lastChar === '.') {
        return { ...state };
      }
      if (lastChar === '-') {
        return setValue(value.slice(0, value.length - 1) + '+');
      }
      if (value.includes('+')) {

        let [first, last] = value.split('+');
        let r;
        if (first.includes('.') || last.includes('.')) {
          r = (Number(first) + Number(last)).toFixed(2);
        } else {
          r = (Number(first) + Number(last));
        }
        return setValue(r + '+');
      } else if (value.includes('-')) {
        let [first, last] = value.split('-');
        let r;
        if (first.includes('.') || last.includes('.')) {
          r = (Number(first) - Number(last)).toFixed(2);
        } else {
          r = (Number(first) - Number(last));
        }
        return setValue(r + '+');
      } else {

        return setValue(value + '+');
      }

    case 'mins':
      let a = value.charAt(value.length - 1);

      if (a === '-' || a === '.') {
        return { ...state };
      }

      if (a === '+') {
        return setValue(value.slice(0, value.length - 1) + '-');
      }

      if (value.includes('-') && !value.includes('+')) {
        let [first, last] = value.split('-');
        let r;
        if (value.charAt(0) === '-') {
          let arr = value.slice(1, value.length).split('-');
          first = 0 - Number(arr[0]) + '';
          last = arr[1];
        }
        if (first.includes('.') || last.includes('.')) {
          r = (Number(first) - Number(last)).toFixed(2);
        } else {
          r = (Number(first) - Number(last));
        }
        return setValue(r + '-');
      } else if (value.includes('+')) {
        let [first, last] = value.split('+');
        let r;
        if (first.includes('.') || last.includes('.')) {
          r = (Number(first) + Number(last)).toFixed(2);
        } else {
          r = (Number(first) + Number(last));
        }
        return setValue(r + '-');
      } else {
        return setValue(value + '-');
      }

    case 'dot':
      if (value && hasOpt(value, true)) {
        return { ...state }
      }
      if (value === '0') {
        return setValue('0.');
      }

      if (hasOptration(value)) {
        return setValue(value + '0.')
      }
      return setValue(value + '.');

    case 'back':
      if (payload === '0') return { ...state };
      let bValue = value.slice(0, value.length - 1);
      if (!bValue) return setValue('0');
      return setValue(bValue);

    case 'finish':
      if (value) {
        const lChar = value.charAt(value.length - 1);
        if (['.', '+', '-'].includes(lChar)) {
          return { ...state };
        } else {
          if (value.includes('+')) {
            let [first, last] = value.split('+');
            let r;
            if (first.includes('.') || last.includes('.')) {
              r = (Number(first) + Number(last)).toFixed(2);
            } else {
              r = (Number(first) + Number(last));
            }
            return setValue(r + '');
          } else {
            let [first, last] = value.split('-');
            let r;
            if (value.charAt(0) === '-') {
              let arr = value.slice(1, value.length).split('-');
              first = 0 - Number(arr[0]) + '';
              last = arr[1];
            }
            if (first.includes('.') || last.includes('.')) {
              r = (Number(first) - Number(last)).toFixed(2);
            } else {
              r = (Number(first) - Number(last));
            }
            return setValue(r + '');
          }
        }
      }
    case 'input':
      if (value === '0') {
        return setValue(payload);
      }
      const res = value + payload;
      if (value && hasOpt(value)) {
        return { ...state };
      }
      return setValue(res);

    default:
      break;
  }
}

function setValueHandle(state) {
  return function (payload) {
    return { ...state, value: payload }
  }
}

function hasOpt(value: string, isDot = false) {

  let split;

  if (value.includes('+')) {
    split = '+';
  } else if (value.includes('-')) {
    split = '-';
  }

  if (split) {
    const [, last] = value.split(split);
    const [, dotChar = []] = last.split('.');
    if (isDot && last.includes('.')) {
      return true;
    }
    return dotChar.length === 2 ? true : false;
  } else {
    const [, dotChar = []] = value.split('.');
    if (isDot && value.includes('.') || dotChar.length === 2) {
      return true;
    }
    return dotChar.length === 2 ? true : false;
  }
}

function hasOptration(value) {
  const lastChar = value.charAt(value.length - 1);
  return lastChar === '+' || lastChar === '-'
}

function optionration(type: string, state) {
  const sideType = type === '+' ? '-' : '+';
  const { value } = state;
  let lastChar = value.charAt(value.length - 1);

  if (lastChar === type || lastChar === '.') {
    return { ...state };
  }
  if (lastChar === sideType) {
    return value.slice(0, value.length - 1) + type;
  }
  if (value.includes(type)) {
    let r = calcValue(type, value);
    return r + type;
  } else if (value.includes(sideType)) {
    let r = calcValue(sideType, value);
    return r + sideType;
  } else {
    return value + type;
  }
}

const calcValue = (type: string, value) => {
  let [first, last] = value.split(type);
  let result;
  const r = type === '+'
    ? (Number(first) + Number(last))
    : (Number(first) - Number(last))

  if (first.includes('.') || last.includes('.')) {
    result = r.toFixed(2);
  } else {
    result = r;
  }
  return result;
}