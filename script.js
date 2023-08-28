let state_theme = 1;
let list_theme = document.querySelectorAll('.theme_bx ul li');
let changer = document.querySelector('.changer');
let circle = document.querySelector('.circle');
list_theme.forEach(element => {
    element.addEventListener('click',_ => {
        state_theme = +element.textContent;
        ChangeState(state_theme);
    })
})
function SetClassLocal(value) {
    window.localStorage.setItem('theme',value);
}
function GetLocalStorage() {
    return window.localStorage.getItem('theme');
}
ChangeState(+GetLocalStorage())
changer.addEventListener('click', _ => {
    state_theme++;
    AddState(state_theme);
    if(state_theme >= 3) {
        state_theme = 0;
    }
})
document.querySelector('.theme span').addEventListener('click',_ => {
    state_theme++;
    AddState(state_theme);
    if(state_theme >= 3) {
        state_theme = 0;
    }
})
function ChangeTheme(name_class) {
    document.body.classList.remove(...document.body.classList);
    document.body.classList.add(name_class);
}
function ChangeState(state) {
    if(state == 1) {
        circle.style.left = '5px'
        circle.style.transform = 'translateY(-50%) translateX(0%) '
        ChangeTheme('default')
        SetClassLocal(1)
    }else if(state == 2) {
        circle.style.left = '50%'
        ChangeTheme('white_theme');
        circle.style.transform = 'translateY(-50%) translateX(-50%) '
        SetClassLocal(2)
    }else if(state >= 3) {
        circle.style.left = 'calc(100% - 19px)'
        ChangeTheme('yellow_theme');
        circle.style.transform = 'translateY(-50%) translateX(0%) ';
        SetClassLocal(3) 
    }
}
function AddState(state_1) {
    ChangeState(state_1);
}


// Start Function Calculatrice
let sign = ['*','-','+','/','+'];
function MultiDiv() {
    while(exp.includes('*') || exp.includes('/')) {
        for (let i = 0; i < exp.length; i++) {
            if(exp[i] === '*') {
                let a = GetNumber(i-1,exp);
                let b = GetNumber(i+1,exp,true);
                let number_delete = (b[0] - a[0]) + 1;
                let result_calc = String(+b[1] * +a[1]).split('');
                exp.splice(a[0],number_delete,...result_calc);
            }
            if(exp[i] === '/'){ 
                let a = GetNumber(i-1,exp);
                let b = GetNumber(i+1,exp,true);
                let number_delete = (b[0] - a[0]) + 1;
                let result_calc = String((+a[1] / +b[1]).toFixed(3)).split('');
                exp.splice(a[0],number_delete,...result_calc);
            }  
        }
    }
    return exp;
}
function CheckDoubleSigne(arr,i) {
    if(arr[i] === "-") {
        if(i === 0) {
            return [true];
        }else if(arr[i-1] === '*' || arr[i-1] === '+') {
            return  [true];
        }else if(arr[i-1] === '-') {
            return [true,'assigne']
        }
    } 
    return false;
}
function GetNumber(start,arr,direction = false) {
    let result_arr = [];
    let result = '';
    if(!direction) {
        for (let i = start; i >= 0; i--) {
            let double_signe = CheckDoubleSigne(arr,i);
            if(double_signe) {
                if(double_signe.length == 1) {
                    result += arr[i];
                    if(i === 0){
                        result = result.split('').reverse().join('');
                        result_arr.push(0,result);
                        break;
                    }
                    continue;
                }
            }
            if(!sign.includes(arr[i])) {
                result += arr[i];
                if(i === 0){
                    result = result.split('').reverse().join('');
                    result_arr.push(0,result);
                    break;
                }
                continue;
            }
            result = result.split('').reverse().join('');
            result_arr.push(i + 1,result);
            break;
        }
    } 

    if(direction) {
        for (let i = start; i < arr.length; i++) {
            let double_signe = CheckDoubleSigne(arr,i);
            if(double_signe) {
                if(double_signe.length == 1) {
                    result += arr[i];
                    if(i == arr.length - 1) {
                        result_arr.push(i + 1,result);
                        break;
                    }
                    continue;
                }
            }
            if(!sign.includes(arr[i])) {
                result += arr[i];
                if(i == arr.length - 1) {
                    result_arr.push(i + 1,result);
                    break;
                }
                continue;
            }
            result_arr.push(i - 1,result);
            break;
        }
    }
    return result_arr;
}
function CheckNegative(num_neg) {
    if(num_neg[0] === '-' && !isNaN(num_neg[num_neg.length - 1])) {
        return true;
    }
    return false;
}

function InitialzeSomme(arr) {
    let result = [];
    let pass_1 = false;
    let j = 1;
    for (let i = 0; i < arr.length; i++) {
        if(pass_1 && j == 1) {
            j++;
            continue;
        }else {
            j = 1;
            pass_1 = false;
        }

        if(pass_1 && j <= 2) {
            j++
            continue;
        }else {
            j = 1;
            pass_1 = false;
        }

        if(arr[i] === '-' && arr[i - 1] != '+' && i > 0) {
            if(arr[i+1] === '-') {
                result.push('+')
                pass_1 = true;
                continue;
            }else {
                result.push('+');
                result.push('-')
            }
        }else if(arr[i] === '-' && arr[i - 1] === '+') {
            if(arr[i + 1] === '-') {
                result.push('+');
                pass_1 = true;
                continue;
            }
        }else {
            result.push(arr[i]);
        }
    }
    return result;
}
function Somme() {
    exp = InitialzeSomme(exp);
    while(exp.includes('+')) {
        for (let i = 0; i < exp.length; i++) {
            if(exp[i] === '+') {
                let a = GetNumber(i-1,exp);
                let b = GetNumber(i+1,exp,true);
                let number_delete = (b[0] - a[0]) + 1;
                let result_calc = String(+b[1] + +a[1]).split('');
                exp.splice(a[0],number_delete,...result_calc);
            }
        }
    }
    return exp;
}
// 9234 + 213 - 100 / 23 * 34 - 9000
let exp = "-    73 + 23 - 23".replaceAll(' ','');
exp = exp.split('')
function Calculatrice() {
    MultiDiv();
    return Somme(); 
}
// End Function Calculatrice

// Start Functions GUI;
let keep = 3;
let signe_ = ['x','-','+','/','+','.'];
function Start(signe) {
    EmptyError();
    let arr_re = Array.from(input.value);
    if(input.value === '0' && signe.textContent === '-') {
        input.value = '-';
        return;
    }
    if(signe.textContent === '.') {
        if(keep === 3) {
            keep = 0;
        }else {
            return;
        }
    }
    if(signe_.includes(arr_re[arr_re.length - 1])) {
        if(keep == 1) {
            keep += 1
        }
        input.value = input.value.slice(0,-1);
        input.value += signe.textContent;
        return;
    }
    if(keep == 1) {
        keep += 1
    }
     input.value += signe.textContent;
}

function Delete(value) {
    if(value.slice(-1) === '.') {
        keep = 3;
    }
    if(value.length == 1) {
        return 0;
    }
    return value.slice(0,-1)
} 
let signes = document.querySelectorAll('.signe');
let numbers = document.querySelectorAll('.num');
let input = document.querySelector('.inp input');
let delete_btn = document.querySelector('.del');

signes.forEach(signe => {
    signe.addEventListener('click',_ => {
        EmptyError();
        CheckScroll();
        Start(signe);
    })
})

numbers.forEach(num => {
    num.addEventListener('keydown',e => e.preventDefault());
    num.addEventListener('click',_ => {
        CheckScroll();
        EmptyError();
        if(keep === 0 || keep === 2) {
            keep +=1;
        }
        if(input.value === '0') {
            input.value = num.textContent;
        }else {
            input.value += num.textContent; 
        }
    })
})

delete_btn.addEventListener('click',_ => {
    EmptyError();
    input.value = Delete(input.value);
    CheckScroll();
})
let result_show = document.querySelector('.result_show');
    result_show.addEventListener('click', _ => {
        ShowResult();
})
function ShowResult() {
    if(!signe_.includes(input.value.slice(-1))){
    exp = input.value.replaceAll('x','*').split('');
    let result = Calculatrice(exp).join('')
    if(result === 'NaN') {
        input.value = 'Error !';
    }else {
        input.value = +parseFloat(result).toFixed(3);
    }
    CheckScroll();
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
}
}
let reset = document.querySelector('.reset');

reset.addEventListener('click',_ => {
    input.value = '0';
    CheckScroll();
})

document.addEventListener('keydown',e => {
    if(e.code === 'Enter') {
        ShowResult();
    }
})

function EmptyError() {
    if(input.value === 'Error !' || input.value === 'Infinity') {
        input.value = '0';
    }
}

function CheckScroll() {
    if(window.innerWidth < 767) {
        if(input.value.length > 14) {
            input.style.fontSize = '15px';
        }else {
            input.style.fontSize = '30px';
        }
        return;
    }
    if(input.value.length > 15) {
        input.style.fontSize = '16px';
    }else {
        input.style.fontSize = '40px';
    }
}
