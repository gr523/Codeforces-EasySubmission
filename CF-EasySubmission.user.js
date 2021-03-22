// ==UserScript==
// @name         CF-EasySubmission
// @author       Manush
// @version      0.01
// @description  Easy Codeforces Submission For Lazy guys
// @match        https://codeforces.com/*
// @match        http://codeforces.com/*
// @match        https://calendar.google.com/calendar/embed*
// @match        https://www.facebook.com/v2.8/plugins/like.php*
// @resource     desertCSS  desert.css
// @resource     monokaiEditorTheme https://raw.githubusercontent.com/ajaxorg/ace/master/lib/ace/theme/monokai.css
// @resource     darkthemecss darktheme.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// @require      codeforces-darktheme.user.js
// @run-at       document-start
// ==/UserScript==

// If you dont want the dark theme remove line 17

let problemPageFontSize="1.8em";
let submitKey='s';
let solutionPageKey='g';
let friendsolutionPageKey='f';

let arr=location.pathname.replace('problemset/problem','contest').split('/') , n=arr.length;

(function (){
    window.addEventListener('load',function(){
        if(arr[n-1]=="submit"){
            submitPage();
        } else {
            problemStatementPage();
        }
    });
})();





function submitPage(){
    document.addEventListener('keydown', function (event) {
        if (event.key === submitKey) {
            document.querySelector('input[value="Submit"]').click();
        }
    });
    document.querySelector('select[name="submittedProblemIndex"]').value=GM_getValue('pid','A');
    window.scroll(0,172);
    navigator.clipboard.readText().then(clipText =>
        document.getElementById("sourceCodeTextarea").value=clipText);
}



function problemStatementPage(){
    document.querySelector('.problem-statement').style.fontSize=problemPageFontSize;
    let url=`/${arr[1]}/${arr[2]}`;
    GM_setValue('pid',arr[n-1]);
    window.scroll(0,172);
    document.addEventListener('keydown', function (event) {
        if (event.key === submitKey) {
            window.open(`${url}/submit`);
        } else if (event.key === solutionPageKey){
            window.open(`${url}/status/${arr[n-1]}`);
        } else if (event.key === friendsolutionPageKey){
            window.open(`${url}/status/${arr[n-1]}/?friends=on`);
        }
    });
}

