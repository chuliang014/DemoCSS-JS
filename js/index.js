// get element

var getElem = function (selector) {
    return document.querySelector(selector);
}

var getAllElem = function (selector) {
    return document.querySelectorAll(selector);
}

//get class attribute
var getCls = function (element) {
    return element.getAttribute('class');
}

//set class attribute
var setCls = function (element, cls) {
    return element.setAttribute('class', cls);
}

// add css for element
var addCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + ' ' + cls);
    }
}

// delete css for element
var delCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
}

//1. init
var screenAnimateElements = {
    '.screen-1': [
        '.screen-1__heading',
        '.screen-1__phone',
        '.screen-1__shadow',
    ],
    '.screen-2': [
        '.screen-2__heading',
        '.screen-2__phone',
        '.screen-2__subheading',
        '.screen-2__point_i_1',
        '.screen-2__point_i_2',
        '.screen-2__point_i_3',
    ],
    '.screen-3': [
        '.screen-3__heading',
        '.screen-3__phone',
        '.screen-3__subheading',
        '.screen-3__features',
    ],
    '.screen-4': [
        '.screen-4__heading',
        '.screen-4__subheading',
        '.screen-4__type__item_i_1',
        '.screen-4__type__item_i_2',
        '.screen-4__type__item_i_3',
        '.screen-4__type__item_i_4',
    ],
    '.screen-5': [
        '.screen-5__heading',
        '.screen-5__bg',
        '.screen-5__subheading',
    ]
};

function setScreenAnimateInit(screenCls) {
    var screen = document.querySelector(screenCls); // get current element
    var animateElements = screenAnimateElements[screenCls]; // get the elements you want to set animation
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');

        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '_animate_init');
    }
}

function playScreenAnimateDone(screenCls) {
    var screen = document.querySelector(screenCls); // get current element
    var animateElements = screenAnimateElements[screenCls]; // get the elements you want to set animation
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');

        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
    }
}

window.onload = function () {
    for (k in screenAnimateElements) {
        if (k === '.screen-1') {
            continue;
        }
        setScreenAnimateInit(k);
    }
}

// 2.
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');

var navTip = getElem('.header__nav-tip');
var setNavTipPos = function (idx) {
    if (idx == 0) {
        navTip.style.left = '0px';
    }
    if (idx == 1) {
        navTip.style.left = '80px';
    }
    if (idx == 2) {
        navTip.style.left = '182px';
    }
    if (idx == 3) {
        navTip.style.left = '282px';
    }
    if (idx == 4) {
        navTip.style.left = '375px';
    }
}

var switchNavItemsActive = function (idx) {
    for (var i = 0; i < navItems.length; i++) {
        delCls(navItems[i], 'header__nav-item_status_active');
        setNavTipPos(idx);
    }
    addCls(navItems[idx], 'header__nav-item_status_active');
    setNavTipPos(idx);

    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i], 'outline__item_status_active');
    }
    addCls(outLineItems[idx], 'outline__item_status_active');
}

switchNavItemsActive(0); // default status for home 

window.onscroll = function () {
    var top = document.documentElement.scrollTop;
    if (top > 80) {
        addCls(getElem('.header'), 'header_status_back');
        addCls(getElem('.outline'), 'outline_status_in');
    } else {
        delCls(getElem('.header'), 'header_status_back');
        delCls(getElem('.outline'), 'outline_status_in');
        switchNavItemsActive(0);
    }
    if (top > 1) {
        playScreenAnimateDone('.screen-1');

    }
    if (top > 800 * 1 - 100) {
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
    }
    if (top > 800 * 2 - 100) {
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
    }
    if (top > 800 * 3 - 100) {
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
    }
    if (top > 800 * 4 - 100) {
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
    }
}

//binding navigator and aside menu

var setNavJump = function (i, lib) {
    var item = lib[i];
    item.onclick = function () {
        console.log(i);
        document.documentElement.scrollTop = i * 800;
    }
}

for (var i = 0; i < navItems.length; i++) {
    setNavJump(i, navItems);
}

for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i, outLineItems);
}

//4. nav slide effect

var setTip = function (idx, lib) {
    lib[idx].onmouseover = function () {
        // console.log(this,idx);
        setNavTipPos(idx);
    }

    var activeIdx = 0;

    lib[idx].onmouseout = function () {
        for (var i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                activeIdx = i;
                break;
            }
        }
        setNavTipPos(activeIdx);
    }
}

for (var i = 0; i < navItems.length; i++) {
    setTip(i, navItems);
}

setTimeout(function () {
    playScreenAnimateDone('.screen-1')
}, 200);